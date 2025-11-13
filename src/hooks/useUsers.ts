import { useCallback, useEffect, useState, useRef } from "react";
import apiClient from "../lib/api";
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
  const [items, setItems] = useState<LocalUser[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const [query, setQuery] = useState<string>(initialQuery ?? "");
  const [role, setRole] = useState<string | undefined>(initialFilters?.role);
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
        const p = {
          q: params?.q ?? query ?? initialQuery,
          role: params?.role ?? role,
          page: params?.page ?? page,
          perPage: params?.perPage ?? perPage,
        } as any;
        // send multiple common pagination param names for backend compatibility
        const reqParams = { ...p, limit: p.perPage, per_page: p.perPage };
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
        let res: any;
        try {
          res = await apiClient.getUsers(reqParams);
        } catch (err: any) {
          // If backend rejects complex params (400), retry with minimal params to be tolerant.
          const status =
            err?.status ??
            err?.statusCode ??
            (err?.response && err.response.status);
          try {
            // eslint-disable-next-line no-console
            console.debug(
              "getUsers initial error, status:",
              status,
              "error:",
              err
            );
          } catch (e) {}
          if (status === 400) {
            // Retry with only q and page (drop per-page/limit/role)
            const simpleParams: any = {};
            if (typeof p.q === "string" && p.q.trim() !== "")
              simpleParams.q = p.q;
            if (p.page) simpleParams.page = p.page;
            try {
              // eslint-disable-next-line no-console
              console.debug(
                "Retrying getUsers with simple params:",
                simpleParams
              );
              res = await apiClient.getUsers(simpleParams);
            } catch (err2: any) {
              // rethrow original error if retry also fails
              throw err2;
            }
          } else {
            throw err;
          }
        }
        // Normalize multiple possible response shapes coming from different backends:
        // - Plain array: [{...}, ...]
        // - { data: [...] }
        // - { users: [...] }
        // - { items: [...] }
        // - Paginated: { data: [...], meta: { ... } } or { users: [...], meta: { ... } }
        if (!res) {
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
          // Could not find an array — fall back to empty
          setItems([]);
          setMeta(null);
          return;
        }

        setItems(list.map(normalize));
        setMeta(metaObj ?? null);
      } catch (e) {
        setError(e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [initialQuery, query, role, page, perPage]
  );

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
      const res = await apiClient.getUser(id);
      return res;
    } catch (e) {
      throw e;
    }
  }, []);

  const create = useCallback(async (payload: Partial<ApiUser>) => {
    try {
      const res = await apiClient.createUser(payload);
      return res;
    } catch (e) {
      throw e;
    }
  }, []);

  const update = useCallback(async (id: string, payload: Partial<ApiUser>) => {
    try {
      const res = await apiClient.updateUser(id, payload);
      return res;
    } catch (e) {
      throw e;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await apiClient.deleteUser(id);
    } catch (e) {
      throw e;
    }
  }, []);

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
