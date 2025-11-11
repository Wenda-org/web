import mlApi from "./config";

export interface ForecastRequest {
  province: string;
  month: number;
  year: number;
}

export interface ForecastResponse {
  province: string;
  month: number;
  year: number;
  predicted_visitors: number;
  confidence_interval: { lower: number; upper: number };
  model_version: string;
  generated_at: string;
}

export async function forecastVisitors(
  data: ForecastRequest
): Promise<ForecastResponse> {
  try {
    const resp = await mlApi.post<ForecastResponse>("/api/ml/forecast", data);
    return resp.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Erro ao obter previsão";
    throw new Error(message);
  }
}
