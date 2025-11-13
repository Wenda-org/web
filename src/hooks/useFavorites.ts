import { useState, useCallback } from "react";
import apiClient from "../lib/api";
import type { Favorite } from "../api.types";

export function useFavorites() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.getFavorites();
      return res as Favorite[];
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const add = useCallback(async (destinationId: string) => {
    try {
      const res = await apiClient.addFavorite(destinationId);
      return res as Favorite;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await apiClient.removeFavorite(id);
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const check = useCallback(async (destinationId: string) => {
    try {
      const res = await apiClient.checkFavorite(destinationId);
      return res;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  return { loading, error, fetch, add, remove, check };
}
