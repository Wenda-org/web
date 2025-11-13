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
        // res might be { success, data, meta } or a plain array
        if (!res) return;
        if (Array.isArray(res)) {
          setItems(res.map(normalize));
          setMeta(null);
          return;
        }
        // Paginated response
        const data = (res.data ?? res) as ApiUser[];
        setItems((Array.isArray(data) ? data : []).map(normalize));
        setMeta(res.meta ?? null);
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
