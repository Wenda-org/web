import { useState, useCallback } from "react";
import apiClient from "../lib/api";
import type {
  Review,
  ReviewFilters,
  CreateReviewDto,
  UpdateReviewDto,
  PaginatedResponse,
} from "../api.types";

export function useReviews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = useCallback(async (filters?: ReviewFilters) => {
    setLoading(true);
    try {
      const res = await apiClient.getReviews(filters);
      return res as PaginatedResponse<Review>;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (payload: CreateReviewDto) => {
    try {
      const r = await apiClient.createReview(payload);
      return r as Review;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const update = useCallback(async (id: string, payload: UpdateReviewDto) => {
    try {
      const r = await apiClient.updateReview(id, payload);
      return r as Review;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await apiClient.deleteReview(id);
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const markHelpful = useCallback(async (id: string) => {
    try {
      await apiClient.markReviewHelpful(id);
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  return { loading, error, fetch, create, update, remove, markHelpful };
}
