import mlApi from "./config";

export interface MlHealthResponse {
  status: string;
  module?: string;
  endpoints?: string[];
  trained_models?: number;
  model_status?: string;
  timestamp?: string;
  [key: string]: any;
}

export async function getMlHealth(): Promise<MlHealthResponse> {
  try {
    const resp = await mlApi.get<MlHealthResponse>("/api/ml/health");
    return resp.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Erro ao verificar estado do ML";
    throw new Error(message);
  }
}
