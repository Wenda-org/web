import { useCallback, useEffect, useRef, useState } from "react";
import {
  getMlHealth,
  forecastVisitors,
  recommendDestinations,
  getMlSegments,
} from "../api/ml";
import type {
  ForecastRequest,
  ForecastResponse,
  RecommendRequest,
  RecommendResponse,
  SegmentsResponse,
} from "../api/ml";
import type { MlHealthResponse, ModelsResponse } from "../api/ml";
import { getMlModels } from "../api/ml";
import { listMlJobs, createMlJob as apiCreateMlJob } from "../api/ml";
import type { JobItem, JobsResponse } from "../api/ml";

// Generic lightweight hook shape
type HookState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useMlHealth(): HookState<MlHealthResponse> {
  const [data, setData] = useState<MlHealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMlHealth();
      setData(res);
    } catch (err: any) {
      setError(err?.message || "Erro ao verificar health");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    loading,
    error,
    refetch: fetch,
  };
}

export function useModels() {
  const [data, setData] = useState<ModelsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMlModels();
      setData(res);
    } catch (err: any) {
      setError(err?.message || "Erro ao obter modelos");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    loading,
    error,
    refetch: fetch,
  };
}

export function useJobs(pollInterval = 5000) {
  const [data, setData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shouldPollRef = useRef(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listMlJobs();
      setData(res);
      // if we fetched successfully, enable polling
      shouldPollRef.current = true;
    } catch (err: any) {
      setError(err?.message || "Erro ao obter jobs");
      // if 404 (endpoint not present), don't enable polling
      const status = err?.response?.status;
      if (status === 404) {
        shouldPollRef.current = false;
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    const iv = setInterval(() => {
      if (shouldPollRef.current) fetch();
    }, pollInterval);
    return () => clearInterval(iv);
  }, [fetch, pollInterval]);

  const createJob = useCallback(
    async (payload: { type: string; payload?: any }) => {
      setLoading(true);
      try {
        const res = await apiCreateMlJob(payload);
        // after create, refresh list
        await fetch();
        return res;
      } catch (err: any) {
        setError(err?.message || "Erro ao criar job");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetch]
  );

  return {
    data,
    loading,
    error,
    refetch: fetch,
    createJob,
  };
}

export function useForecast(initial?: ForecastRequest) {
  const [data, setData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (payload?: ForecastRequest) => {
      const body = payload || initial;
      if (!body) {
        setError("Nenhum payload fornecido para forecast");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await forecastVisitors(body);
        setData(res);
      } catch (err: any) {
        setError(err?.message || "Erro ao obter forecast");
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [initial]
  );

  return {
    data,
    loading,
    error,
    runForecast: run,
  } as const;
}

export function useRecommend(initial?: RecommendRequest) {
  const [data, setData] = useState<RecommendResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (payload?: RecommendRequest) => {
      const body = payload || initial;
      if (!body) {
        setError("Nenhum payload fornecido para recommend");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await recommendDestinations(body);
        setData(res);
      } catch (err: any) {
        setError(err?.message || "Erro ao obter recomendações");
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [initial]
  );

  return {
    data,
    loading,
    error,
    runRecommend: run,
  } as const;
}

export function useSegments() {
  const [data, setData] = useState<SegmentsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMlSegments();
      setData(res);
    } catch (err: any) {
      setError(err?.message || "Erro ao obter segmentos");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    data,
    loading,
    error,
    refetch: fetch,
  };
}

export default {
  useMlHealth,
  useForecast,
  useRecommend,
  useSegments,
};
