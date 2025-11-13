import { useCallback, useEffect, useState } from "react";
import apiClient from "../lib/api";
import type { HealthCheckResponse, DatabaseHealthResponse } from "../api.types";

export function useHealthCheck() {
  const [data, setData] = useState<HealthCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.healthCheck();
      setData(res as HealthCheckResponse);
    } catch (e) {
      setError(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useDatabaseHealth() {
  const [data, setData] = useState<DatabaseHealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.databaseHealth();
      setData(res as DatabaseHealthResponse);
    } catch (e) {
      setError(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export default { useHealthCheck, useDatabaseHealth };
