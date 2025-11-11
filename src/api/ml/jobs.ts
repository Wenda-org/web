import mlApi from "./config";

export interface JobItem {
  id: string;
  type: string;
  status: "pending" | "running" | "failed" | "finished";
  progress?: number;
  created_at?: string;
  finished_at?: string | null;
  resultUrl?: string | null;
  logs?: string[];
  [key: string]: any;
}

export interface JobsResponse {
  data: JobItem[];
  meta?: Record<string, any>;
}

export async function listMlJobs(): Promise<JobsResponse> {
  try {
    const resp = await mlApi.get<JobsResponse>("/api/ml/jobs");
    return resp.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Erro ao listar jobs";
    throw new Error(message);
  }
}

export async function createMlJob(payload: {
  type: string;
  payload?: any;
}): Promise<{ jobId: string } | any> {
  try {
    const resp = await mlApi.post<any>(`/api/ml/jobs`, payload);
    return resp.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Erro ao criar job";
    throw new Error(message);
  }
}

export async function getMlJob(id: string): Promise<JobItem> {
  try {
    const resp = await mlApi.get<JobItem>(`/api/ml/jobs/${id}`);
    return resp.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Erro ao obter job";
    throw new Error(message);
  }
}

export async function cancelMlJob(id: string): Promise<any> {
  try {
    const resp = await mlApi.post<any>(`/api/ml/jobs/${id}/cancel`);
    return resp.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Erro ao cancelar job";
    throw new Error(message);
  }
}
