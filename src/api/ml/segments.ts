import mlApi from "./config";

export interface SegmentItem {
  segment_id: string;
  name: string;
  description?: string;
  typical_destinations?: string[];
  avg_budget?: string;
  percentage?: number;
  characteristics?: string[];
}

export interface SegmentsResponse {
  segments: SegmentItem[];
  total_segments: number;
  model_version: string;
  generated_at: string;
}

export async function getMlSegments(): Promise<SegmentsResponse> {
  try {
    const resp = await mlApi.get<SegmentsResponse>("/api/ml/segments");
    return resp.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Erro ao obter segmentos";
    throw new Error(message);
  }
}
