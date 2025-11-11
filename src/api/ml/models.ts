import mlApi from "./config";

export interface ModelItem {
  model_type: string;
  model_name: string;
  version: string;
  algorithm: string;
  metrics?: Record<string, any>;
  status: string;
  trained_on?: string; // ISO date
}

export interface ModelsResponse {
  models: ModelItem[];
  total_models: number;
  by_type?: Record<string, ModelItem[]>;
  generated_at: string;
}

export async function getMlModels(): Promise<ModelsResponse> {
  try {
    const resp = await mlApi.get<ModelsResponse>("/api/ml/models");
    return resp.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Erro ao obter lista de modelos";
    throw new Error(message);
  }
}
