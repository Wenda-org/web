import { useState, useEffect, useCallback } from "react";
import apiClient from "../lib/api";
import type { CategoryWithCount, CategoryWithDestinations } from "../api.types";

export function useCategories() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.getCategories();
      setCategories(res as CategoryWithCount[]);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const getCategory = useCallback(async (id: string) => {
    try {
      const res = await apiClient.getCategory(id);
      return res as CategoryWithDestinations;
    } catch (e) {
      throw e;
    }
  }, []);

  return { categories, loading, error, refetch: fetch, getCategory };
}
