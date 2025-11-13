import { useState, useEffect, useCallback } from "react";
import apiClient from "../lib/api";
import type {
  DestinationSummary,
  Destination,
  DestinationFilters,
  PaginatedResponse,
} from "../api.types";

export function useDestinations(initialFilters?: DestinationFilters) {
  const [items, setItems] = useState<DestinationSummary[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(
    async (filters?: DestinationFilters) => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiClient.getDestinations(filters || initialFilters);
        // PaginatedResponse shape: { success: true, data: [], meta }
        setItems(res.data ?? res);
        setMeta(res.meta ?? null);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [initialFilters]
  );

  useEffect(() => {
    fetch(initialFilters);
  }, [fetch, initialFilters]);

  const get = useCallback(async (idOrSlug: string) => {
    try {
      const res = await apiClient.getDestination(idOrSlug);
      return res as Destination;
    } catch (e) {
      throw e;
    }
  }, []);

  return { items, meta, loading, error, refetch: fetch, get };
}
