import { useCallback, useEffect, useState, useRef } from "react";
import {
  listUsers,
  getUser as apiGetUser,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "../api/users";
import type { User as ApiUser, PaginatedResponse } from "../api.types";

// Local simplified user type for the users page components
export type LocalUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin?: string;
};

export function useUsers(
  initialQuery?: string,
  initialFilters?: { role?: string; page?: number; perPage?: number }
) {
  // Simple in-memory cache for list responses keyed by params string
  const cacheRef = useRef<Map<string, { items: any[]; meta: any; ts: number }>>(
    new Map()
  );
  const CACHE_TTL = 30 * 1000; // 30s

  const [items, setItems] = useState<LocalUser[]>([]);
  const [meta, setMeta] = useState<any>(null);
  // track last fetch key for quick cache updates after mutations
  const lastFetchKeyRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const [query, setQuery] = useState<string>(initialQuery ?? "");
  // By default list admins in the UI unless caller provided a different initial role.
  // If a search query is present we will omit the role filter so the search covers all users.
  const [role, setRole] = useState<string | undefined>(
    initialFilters?.role
  );
  const [page, setPage] = useState<number>(initialFilters?.page ?? 1);
  const [perPage, setPerPage] = useState<number>(initialFilters?.perPage ?? 25);
  const debounceRef = useRef<any>(null);

  const normalize = (u: any): LocalUser => ({
    id: u.id ?? u._id ?? u.userId ?? String(u.email ?? Math.random()),
    name:
      (u.name ??
        u.fullName ??
        `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()) ||
      u.email ||
      "",
    email: u.email ?? u.emailAddress ?? "",
    role:
      (typeof u.role === "string" && u.role) ||
      (Array.isArray(u.roles) && u.roles[0]) ||
      "viewer",
    status:
      u.isActive !== undefined
        ? u.isActive
          ? "active"
          : "inactive"
        : u.status ?? "active",
    lastLogin: u.lastLogin ?? u.updatedAt ?? u.createdAt,
  });

  const fetch = useCallback(
    async (params?: {
      q?: string;
      role?: string;
      page?: number;
      perPage?: number;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const resolvedQuery = params?.q ?? query ?? initialQuery;
        // If the user is searching (non-empty query), do not force the role filter so the
        // search will span all users. Otherwise use explicit param role > local role default.
        const resolvedRole =
          params?.role !== undefined
            ? params.role
            : resolvedQuery && String(resolvedQuery).trim() !== ""
            ? undefined
            : role;

        const p = {
          q: resolvedQuery,
          role: resolvedRole,
          page: params?.page ?? page,
          perPage: params?.perPage ?? perPage,
        } as any;
        // send only the normalized params (avoid adding duplicate names that some backends reject)
        const reqParams = { ...p };
        // debug: show computed params before pruning/sending
        try {
          // eslint-disable-next-line no-console
          console.debug(
            "useUsers.fetch computed params:",
            p,
            "-> reqParams:",
            reqParams
          );
        } catch (e) {}
        // Remove undefined/null/empty-string values so the backend doesn't receive e.g. role: undefined or q: ""
        Object.keys(reqParams).forEach((k) => {
          const val = (reqParams as any)[k];
          if (val === undefined || val === null) {
            delete (reqParams as any)[k];
            return;
          }
          if (typeof val === "string" && val.trim() === "") {
            // omit empty strings (many backends validate differently when '' is provided)
            delete (reqParams as any)[k];
            return;
          }
        });
        const key = JSON.stringify(reqParams);
        lastFetchKeyRef.current = key;

        // Try cache first
        const cacheItem = cacheRef.current.get(key);
        if (cacheItem && Date.now() - cacheItem.ts < CACHE_TTL) {
          // use cached data
          try {
            // eslint-disable-next-line no-console
            console.debug("useUsers.fetch using cache for", key);
          } catch (e) {}
          setItems(cacheItem.items.map(normalize));
          setMeta(cacheItem.meta ?? null);
          setLoading(false);
          return;
        }

        let res: any;
        let attemptedAlt = false;
        try {
          res = await listUsers(reqParams as any);
        } catch (err: any) {
          // If backend rejects complex params (400), retry with minimal params to be tolerant.
          const status =
            err?.status ?? err?.statusCode ?? (err?.response && err.response.status);
          try {
            // eslint-disable-next-line no-console
            console.debug("getUsers initial error, status:", status, "error:", err);
          } catch (e) {}
          if (status === 400) {
            // Retry with only q and page (drop per-page/limit/role)
            const simpleParams: any = {};
            if (typeof p.q === "string" && p.q.trim() !== "") simpleParams.q = p.q;
            if (p.page) simpleParams.page = p.page;
            try {
              // eslint-disable-next-line no-console
              console.debug("Retrying getUsers with simple params:", simpleParams);
              res = await listUsers(simpleParams as any);
            } catch (err2: any) {
              // rethrow original error if retry also fails
              throw err2;
            }
          } else {
            throw err;
          }
        }

        // If response exists but doesn't contain a list (some backends use 'limit' instead
        // of 'perPage', or expect different param names), retry once mapping perPage->limit
        // when the initial response didn't yield an array.
        const tryAltIfNoList = async () => {
          try {
            const alt = { ...reqParams } as any;
            if (alt.perPage !== undefined) {
              delete alt.perPage;
              alt.limit = (reqParams as any).perPage;
            }
            // eslint-disable-next-line no-console
            console.debug("useUsers: retrying with alt params", alt);
            const r = await listUsers(alt as any);
            return r;
          } catch (e) {
            return null;
          }
        };

        if (!res) {
          // try alternative params once
          if (!attemptedAlt && (reqParams as any).perPage) {
            attemptedAlt = true;
            const altRes = await tryAltIfNoList();
            if (altRes) {
              res = altRes;
            }
          }
          setItems([]);
          setMeta(null);
          return;
        }

        let list: ApiUser[] | undefined;
        let metaObj: any = null;

        if (Array.isArray(res)) {
          list = res as ApiUser[];
        } else if (Array.isArray(res.data)) {
          list = res.data as ApiUser[];
          metaObj = res.meta ?? null;
        } else if (Array.isArray((res as any).users)) {
          list = (res as any).users as ApiUser[];
          metaObj = (res as any).meta ?? null;
        } else if (Array.isArray((res as any).items)) {
          list = (res as any).items as ApiUser[];
          metaObj = (res as any).meta ?? null;
        } else if (res && Array.isArray((res as any).data?.data)) {
          // nested data.data
          list = (res as any).data.data as ApiUser[];
          metaObj = (res as any).meta ?? null;
        } else if (res && Array.isArray((res as any).data?.users)) {
          list = (res as any).data.users as ApiUser[];
          metaObj = (res as any).meta ?? null;
        } else if (res && typeof res === "object") {
          // Try to find a first array value inside the object
          const maybeArray = Object.values(res).find((v) => Array.isArray(v));
          if (Array.isArray(maybeArray)) {
            list = maybeArray as ApiUser[];
            metaObj = (res as any).meta ?? null;
          }
        }

        if (!list) {
          // try alternative params once if list not found
          if (!attemptedAlt && (reqParams as any).perPage) {
            attemptedAlt = true;
            const altRes = await tryAltIfNoList();
            if (altRes) {
              // set res to altRes and continue processing
              res = altRes;
              // attempt to extract list again
              if (Array.isArray(res)) {
                list = res as ApiUser[];
              } else if (Array.isArray(res.data)) {
                list = res.data as ApiUser[];
                metaObj = res.meta ?? null;
              } else if (Array.isArray((res as any).users)) {
                list = (res as any).users as ApiUser[];
                metaObj = (res as any).meta ?? null;
              }
            }
          }
          // Could not find an array — fall back to empty
          setItems([]);
          setMeta(null);
          return;
        }

        const normalized = list.map(normalize);
        setItems(normalized);
        setMeta(metaObj ?? null);

        // store in cache
        try {
          cacheRef.current.set(key, {
            items: list,
            meta: metaObj ?? null,
            ts: Date.now(),
          });
        } catch (e) {}
      } catch (e) {
        setError(e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [initialQuery, query, role, page, perPage]
  );

  // clear cache helper
  const clearCache = () => {
    try {
      cacheRef.current.clear();
    } catch (e) {}
  };

  // Auto-fetch when query/role/page/perPage change; debounce query updates
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch();
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetch, query, role, page, perPage]);

  const get = useCallback(async (id: string) => {
    try {
      const res = await apiGetUser(id);
      // normalize single user to LocalUser shape for UI components
      const u = res?.data ?? res;
      return normalize(u);
    } catch (e) {
      throw e;
    }
  }, []);

  const create = useCallback(async (payload: Partial<ApiUser>) => {
    try {
      const res = await apiCreateUser(payload as any);
      // Invalidate list cache so new user appears on next refetch
      clearCache();
      // Optionally, append to current items if present
      try {
        const created = res?.data ?? res;
        if (created) {
          setItems((prev) => [normalize(created), ...prev]);
        }
      } catch (e) {}
      return res;
    } catch (e) {
      throw e;
    }
  }, []);

  const update = useCallback(async (id: string, payload: Partial<ApiUser>) => {
    try {
      const res = await apiUpdateUser(id, payload as any);
      // optimistic update in current list
      try {
        const updated = res?.data ?? res;
        setItems((prev) =>
          prev.map((it) => (it.id === id ? normalize(updated) : it))
        );
        // update cache entry that was last fetched if present
        const key = lastFetchKeyRef.current;
        if (key) {
          const c = cacheRef.current.get(key);
          if (c) {
            c.items = (c.items as any[]).map((it) =>
              (it.id ?? it._id ?? it.userId) === id ? updated : it
            );
            cacheRef.current.set(key, { ...c, ts: Date.now() });
          }
        }
      } catch (e) {}
      // clear other caches to be safe
      clearCache();
      return res;
    } catch (e) {
      throw e;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    // optimistic delete: remove from UI first, then call API; rollback if fails
    const prev = items;
    try {
      setItems((cur) => cur.filter((it) => it.id !== id));
      clearCache();
      await apiDeleteUser(id);
    } catch (e) {
      // rollback
      setItems(prev);
      throw e;
    }
  }, []);

  // expose internal helpers for testing/debugging
  // ...existing code...

  return {
    items,
    meta,
    loading,
    error,
    refetch: fetch,
    // filter & pagination controls
    query,
    setQuery,
    role,
    setRole,
    page,
    setPage,
    perPage,
    setPerPage,
    get,
    create,
    update,
    remove,
  };
}

export default useUsers;
