import { useEffect, useState, useCallback } from "react";
import apiClient from "../lib/api";
import type { Marker } from "../api.types";

export function useMarkers(params?: {
  bbox?: string;
  category?: string;
  limit?: number;
}) {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchMarkers = useCallback(async (p?: typeof params) => {
    setLoading(true);
    setError(null);
    try {
      const res = (await apiClient.getMarkers(p)) as any;
      // backend may return { data: [...] } or plain array; handle both shapes
      const data = res?.data ?? res;
      setMarkers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarkers(params);
  }, [fetchMarkers, JSON.stringify(params)]);

  const createMarker = useCallback(async (payload: Omit<Marker, "id">) => {
    const created = (await apiClient.createMarker(payload as any)) as any;
    const data = created?.data ?? created;
    setMarkers((prev) => [data, ...prev]);
    return data;
  }, []);

  const updateMarker = useCallback(
    async (id: string, payload: Partial<Marker>) => {
      const updated = (await apiClient.updateMarker(id, payload as any)) as any;
      const data = updated?.data ?? updated;
      setMarkers((prev) => prev.map((m) => (m.id === id ? data : m)));
      return data;
    },
    []
  );

  const deleteMarker = useCallback(async (id: string) => {
    await apiClient.deleteMarker(id);
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return {
    markers,
    loading,
    error,
    refetch: fetchMarkers,
    createMarker,
    updateMarker,
    deleteMarker,
  };
}
