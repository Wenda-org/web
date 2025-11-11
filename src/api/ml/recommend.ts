import mlApi from "./config";

export interface RecommendPreferences {
  categories?: string[];
  budget?: string;
  provinces?: string[];
}

export interface RecommendRequest {
  user_id?: string;
  preferences?: RecommendPreferences;
  limit?: number;
}

export interface RecommendationItem {
  destination_id: string;
  name: string;
  province: string;
  category: string;
  description?: string;
  rating_avg?: number;
  score: number;
  reason?: string;
}

export interface RecommendResponse {
  recommendations: RecommendationItem[];
  model_version: string;
  generated_at: string;
}

export async function recommendDestinations(
  data: RecommendRequest
): Promise<RecommendResponse> {
  // Basic client-side validation to avoid common 422s
  const validate = (payload: RecommendRequest) => {
    if (!payload) return "Payload vazio";
    if (!payload.user_id && !payload.preferences)
      return "user_id ou preferences obrigatório";
    const p = payload.preferences;
    if (p) {
      if (p.categories && !Array.isArray(p.categories))
        return "preferences.categories deve ser um array";
      if (p.categories && p.categories.some((c: any) => typeof c !== "string"))
        return "preferences.categories deve conter strings";
      if (p.provinces && !Array.isArray(p.provinces))
        return "preferences.provinces deve ser um array";
      if (p.budget && typeof p.budget !== "string")
        return "preferences.budget deve ser string";
    }
    if (
      payload.limit &&
      (typeof payload.limit !== "number" ||
        payload.limit < 1 ||
        payload.limit > 50)
    )
      return "limit inválido (1-50)";
    return null;
  };

  const validationError = validate(data);
  if (validationError) {
    throw new Error(`Client validation error: ${validationError}`);
  }
  try {
    const resp = await mlApi.post<RecommendResponse>("/api/ml/recommend", data);
    return resp.data;
  } catch (error: any) {
    // If backend returns validation details (422), build a readable message
    const respData = error?.response?.data;
    if (respData && Array.isArray(respData.detail)) {
      const details = respData.detail
        .map((d: any) => {
          const loc = Array.isArray(d.loc) ? d.loc.join(".") : String(d.loc);
          return `${loc}: ${d.msg}`;
        })
        .join("; ");
      throw new Error(`Validation error: ${details}`);
    }

    const message =
      respData?.message || error?.message || "Erro ao obter recomendações";
    throw new Error(message);
  }
}
