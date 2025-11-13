import { useCallback, useEffect, useState } from "react";
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

export function useUsers(initialQuery?: string) {
  const [items, setItems] = useState<LocalUser[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const normalize = (u: ApiUser): LocalUser => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: (u.role as any) || "viewer",
    status: u.isActive ? "active" : "inactive",
    lastLogin: u.updatedAt || u.createdAt,
  });

  const fetch = useCallback(
    async (q?: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.getUsers({ q: q ?? initialQuery });
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
    [initialQuery]
  );

  useEffect(() => {
    fetch(initialQuery);
  }, [fetch, initialQuery]);

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
    get,
    create,
    update,
    remove,
  };
}

export default useUsers;
