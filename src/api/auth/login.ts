import api from "../config";

export async function apiLogin(data: { email: String; password: String }) {
  try {
    const response = await api.post<any>("/auth/login", data);
    const resp = response.data || {};
    // backend might return token under different names: token, accessToken, access_token
    const token = resp.token || resp.accessToken || resp.access_token || null;
    const message = resp.message || "Login feito com sucesso";
    const user = resp.user || resp.data?.user || null;

    // Persist token and user info when available. Some backends may return
    // a token even if the `user` object is partial (no role). Store the
    // token unconditionally when present so subsequent requests include it.
    if (token) {
      try {
        localStorage.setItem("authToken", token);
      } catch (e) {
        // ignore storage errors
      }
    }
    if (user?.role) {
      try {
        localStorage.setItem("role", user.role);
      } catch {}
    }

    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch {}
    }

    return {
      message,
      user,
      accessToken: token,
    };
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Erro ao fazer login";
    throw new Error(errorMessage);
  }
}
