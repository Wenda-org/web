import { useEffect, useState, useCallback } from "react";
import apiClient, { setAuthToken } from "../lib/api";
import type {
  AuthResponse,
  LoginDto,
  RegisterDto,
  UserWithStats,
  UpdateProfileDto,
} from "../api.types";

export function useAuth() {
  const [user, setUser] = useState<UserWithStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const profile = await apiClient.getProfile();
      setUser(profile as UserWithStats);
    } catch (e) {
      setError(e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only attempt to load the profile if an auth token exists.
    // This prevents an infinite loop where the app redirects to /login
    // and the Login page (which also uses this hook) triggers another
    // /auth/me request that returns 401 and causes another redirect.
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        loadProfile();
      }
    } catch (e) {
      // localStorage may be unavailable in some environments — skip loading
    }
  }, [loadProfile]);

  const login = useCallback(
    async (data: LoginDto) => {
      setLoading(true);
      try {
        const res = await apiClient.login(data);
        // apiClient sets token; refresh profile
        await loadProfile();
        return res as AuthResponse;
      } finally {
        setLoading(false);
      }
    },
    [loadProfile]
  );

  const logout = useCallback(async () => {
    try {
      await apiClient.logout();
    } catch (e) {
      // ignore logout errors but ensure local cleanup
    } finally {
      // Ensure client-side cleanup even if server logout fails
      try {
        setAuthToken(null);
      } catch (err) {
        // ignore
      }
      try {
        localStorage.removeItem("user");
      } catch (err) {}
      try {
        localStorage.removeItem("role");
      } catch (err) {}
      setUser(null);
      // notify the app that logout happened
      try {
        window.dispatchEvent(new CustomEvent("auth:logout"));
      } catch (err) {
        // ignore
      }
    }
  }, []);

  const register = useCallback(
    async (data: RegisterDto) => {
      const res = await apiClient.register(data);
      if ((res as AuthResponse)?.accessToken) {
        await loadProfile();
      }
      return res as AuthResponse;
    },
    [loadProfile]
  );

  const updateProfile = useCallback(async (payload: UpdateProfileDto) => {
    const updated = await apiClient.updateProfile(payload);
    setUser(updated as UserWithStats);
    return updated;
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    loadProfile,
    updateProfile,
  };
}
