import api from "../api/config";
import { apiLogin } from "../api/auth/login";
import type {
  ApiClientMethods,
  AuthResponse,
  LoginDto,
  RegisterDto,
  User,
  UserWithStats,
  UpdateProfileDto,
  CategoryWithCount,
  CategoryWithDestinations,
  DestinationFilters,
  DestinationSummary,
  Destination,
  PaginatedResponse,
  ReviewFilters,
  Review,
  CreateReviewDto,
  UpdateReviewDto,
  Favorite,
  FavoriteCheckResponse,
  Trip,
  CreateTripDto,
  UpdateTripDto,
  TripDestination,
  HealthCheckResponse,
  DatabaseHealthResponse,
  Marker,
} from "../api.types";

// reuse axios instance from src/api/config which already applies baseURL and interceptors
const instance = api;

// Helper to set/clear auth token used by the app (localStorage/global management)
export function setAuthToken(token?: string | null) {
  if (token) {
    instance.defaults.headers = instance.defaults.headers || {};
    (instance.defaults.headers as any).common =
      (instance.defaults.headers as any).common || {};
    (instance.defaults.headers as any).common.Authorization = `Bearer ${token}`;
    try {
      localStorage.setItem("authToken", token);
    } catch (e) {
      // ignore
    }
  } else {
    if ((instance.defaults.headers as any)?.common) {
      delete (instance.defaults.headers as any).common.Authorization;
    }
    try {
      localStorage.removeItem("authToken");
    } catch (e) {
      // ignore
    }
  }
}

function handleResponse<T>(res: any): T {
  // Response convention: { success, data, message }
  if (res?.data?.success === false) {
    const err = new Error(res?.data?.message || "API error");
    throw err;
  }
  return res?.data?.data ?? res?.data ?? res;
}

function handleError(e: any): never {
  if (e?.response) {
    throw e.response.data || e.response;
  }
  throw e;
}

const apiClient: Partial<ApiClientMethods> & Record<string, any> = {
  // Auth
  async register(data: RegisterDto): Promise<AuthResponse> {
    try {
      const res = await instance.post("/auth/register", data);
      const payload = handleResponse<{ user: User; accessToken: string }>(res);
      return payload as unknown as AuthResponse;
    } catch (e) {
      handleError(e);
    }
  },

  async login(data: LoginDto): Promise<AuthResponse> {
    try {
      // prefer shared helper under src/api when available (keeps behavior consistent)
      const resp = await apiLogin({
        email: data.email,
        password: data.password,
      });
      const user = resp.user as unknown as User;
      const token =
        (resp as any).accessToken ||
        (localStorage.getItem("authToken") as string) ||
        "";
      const result: AuthResponse = {
        user,
        accessToken: token,
        tokenType: "Bearer",
        expiresIn: 0,
      };
      if (token) setAuthToken(token);
      return result;
    } catch (e) {
      handleError(e);
    }
  },

  async getProfile(): Promise<UserWithStats> {
    try {
      const res = await instance.get("/auth/me");
      return handleResponse<UserWithStats>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async logout(): Promise<void> {
    try {
      // attempt server-side logout when available, but don't fail if endpoint is missing
      try {
        await instance.post("/auth/logout");
      } catch (e) {
        // ignore server logout errors
      }
      // clear client-side auth state
      setAuthToken(null);
      try {
        localStorage.removeItem("user");
      } catch (e) {}
      try {
        localStorage.removeItem("role");
      } catch (e) {}
    } catch (e) {
      handleError(e);
    }
  },

  async updateProfile(data: UpdateProfileDto): Promise<User> {
    try {
      const res = await instance.put("/auth/me", data);
      return handleResponse<User>(res);
    } catch (e) {
      handleError(e);
    }
  },

  // Categories
  async getCategories(): Promise<CategoryWithCount[]> {
    try {
      const res = await instance.get("/categories");
      return handleResponse<CategoryWithCount[]>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async getCategory(id: string): Promise<CategoryWithDestinations> {
    try {
      const res = await instance.get(`/categories/${id}`);
      return handleResponse<CategoryWithDestinations>(res);
    } catch (e) {
      handleError(e);
    }
  },

  // Destinations
  async getDestinations(
    filters?: DestinationFilters
  ): Promise<PaginatedResponse<DestinationSummary>> {
    try {
      const res = await instance.get("/destinations", { params: filters });
      return handleResponse<PaginatedResponse<DestinationSummary>>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async getDestination(idOrSlug: string): Promise<Destination> {
    try {
      const res = await instance.get(`/destinations/${idOrSlug}`);
      return handleResponse<Destination>(res);
    } catch (e) {
      handleError(e);
    }
  },

  // Reviews
  async getReviews(
    filters?: ReviewFilters
  ): Promise<PaginatedResponse<Review>> {
    try {
      const res = await instance.get("/reviews", { params: filters });
      return handleResponse<PaginatedResponse<Review>>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async getDestinationReviews(
    destinationId: string,
    filters?: ReviewFilters
  ): Promise<PaginatedResponse<Review>> {
    try {
      const res = await instance.get(`/destinations/${destinationId}/reviews`, {
        params: filters,
      });
      return handleResponse<PaginatedResponse<Review>>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async createReview(data: CreateReviewDto): Promise<Review> {
    try {
      const res = await instance.post("/reviews", data);
      return handleResponse<Review>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async updateReview(id: string, data: UpdateReviewDto): Promise<Review> {
    try {
      const res = await instance.put(`/reviews/${id}`, data);
      return handleResponse<Review>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async deleteReview(id: string): Promise<void> {
    try {
      const res = await instance.delete(`/reviews/${id}`);
      handleResponse<void>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async markReviewHelpful(id: string): Promise<void> {
    try {
      const res = await instance.post(`/reviews/${id}/helpful`);
      handleResponse<void>(res);
    } catch (e) {
      handleError(e);
    }
  },

  // Favorites
  async getFavorites(): Promise<Favorite[]> {
    try {
      const res = await instance.get("/favorites");
      return handleResponse<Favorite[]>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async addFavorite(destinationId: string): Promise<Favorite> {
    try {
      const res = await instance.post("/favorites", { destinationId });
      return handleResponse<Favorite>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async removeFavorite(id: string): Promise<void> {
    try {
      const res = await instance.delete(`/favorites/${id}`);
      handleResponse<void>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async checkFavorite(destinationId: string): Promise<FavoriteCheckResponse> {
    try {
      const res = await instance.get(`/favorites/check/${destinationId}`);
      return handleResponse<FavoriteCheckResponse>(res);
    } catch (e) {
      handleError(e);
    }
  },

  // Trips
  async getTrips(): Promise<Trip[]> {
    try {
      const res = await instance.get("/trips");
      return handleResponse<Trip[]>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async getTrip(id: string): Promise<Trip> {
    try {
      const res = await instance.get(`/trips/${id}`);
      return handleResponse<Trip>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async createTrip(data: CreateTripDto): Promise<Trip> {
    try {
      const res = await instance.post("/trips", data);
      return handleResponse<Trip>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async updateTrip(id: string, data: UpdateTripDto): Promise<Trip> {
    try {
      const res = await instance.put(`/trips/${id}`, data);
      return handleResponse<Trip>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async deleteTrip(id: string): Promise<void> {
    try {
      const res = await instance.delete(`/trips/${id}`);
      handleResponse<void>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async addDestinationToTrip(
    tripId: string,
    data: { destinationId: string; visitDate?: string; notes?: string }
  ): Promise<TripDestination> {
    try {
      const res = await instance.post(`/trips/${tripId}/destinations`, data);
      return handleResponse<TripDestination>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async removeDestinationFromTrip(
    tripId: string,
    destinationId: string
  ): Promise<void> {
    try {
      const res = await instance.delete(
        `/trips/${tripId}/destinations/${destinationId}`
      );
      handleResponse<void>(res);
    } catch (e) {
      handleError(e);
    }
  },

  // Health
  async healthCheck(): Promise<HealthCheckResponse> {
    try {
      const res = await instance.get("/health");
      return handleResponse<HealthCheckResponse>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async databaseHealth(): Promise<DatabaseHealthResponse> {
    try {
      const res = await instance.get("/monitoring/database");
      return handleResponse<DatabaseHealthResponse>(res);
    } catch (e) {
      handleError(e);
    }
  },

  // Users
  async getUsers(params?: { q?: string; page?: number; perPage?: number }) {
    try {
      // Debug: log request params to help diagnose missing users
      try {
        // eslint-disable-next-line no-console
        console.debug("apiClient.getUsers params:", params);
      } catch (e) {}
      const res = await instance.get("/users", { params });
      try {
        // eslint-disable-next-line no-console
        console.debug(
          "apiClient.getUsers raw response:",
          res && res.data ? res.data : res
        );
      } catch (e) {}
      return handleResponse<any>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async getUser(id: string) {
    try {
      const res = await instance.get(`/users/${id}`);
      return handleResponse<any>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async createUser(payload: any) {
    try {
      const res = await instance.post(`/users`, payload);
      return handleResponse<any>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async updateUser(id: string, payload: any) {
    try {
      const res = await instance.put(`/users/${id}`, payload);
      return handleResponse<any>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async updateUserPassword(id: string, payload: { password: string }) {
    try {
      const res = await instance.patch(`/users/${id}/password`, payload);
      return handleResponse<any>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async deleteUser(id: string) {
    try {
      const res = await instance.delete(`/users/${id}`);
      handleResponse<void>(res);
    } catch (e) {
      handleError(e);
    }
  },

  // Markers (Map)
  async getMarkers(params?: {
    bbox?: string;
    category?: string;
    limit?: number;
  }): Promise<Marker[]> {
    try {
      const res = await instance.get("/markers", { params });
      return handleResponse<Marker[]>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async createMarker(data: {
    title: string;
    lat: number;
    lng: number;
    category?: string;
    meta?: any;
  }): Promise<Marker> {
    try {
      const res = await instance.post("/markers", data);
      return handleResponse<Marker>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async updateMarker(
    id: string,
    data: {
      title?: string;
      lat?: number;
      lng?: number;
      category?: string;
      meta?: any;
    }
  ): Promise<Marker> {
    try {
      const res = await instance.put(`/markers/${id}`, data);
      return handleResponse<Marker>(res);
    } catch (e) {
      handleError(e);
    }
  },

  async deleteMarker(id: string) {
    try {
      const res = await instance.delete(`/markers/${id}`);
      handleResponse<void>(res);
    } catch (e) {
      handleError(e);
    }
  },
};

export default apiClient as ApiClientMethods & {
  getMarkers: (params?: {
    bbox?: string;
    category?: string;
    limit?: number;
  }) => Promise<Marker[]>;
  createMarker: (data: {
    title: string;
    lat: number;
    lng: number;
    category?: string;
    meta?: any;
  }) => Promise<Marker>;
  updateMarker: (
    id: string,
    data: {
      title?: string;
      lat?: number;
      lng?: number;
      category?: string;
      meta?: any;
    }
  ) => Promise<Marker>;
  deleteMarker: (id: string) => Promise<void>;
};
