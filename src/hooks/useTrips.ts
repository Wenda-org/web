import { useState, useCallback } from "react";
import apiClient from "../lib/api";
import type {
  Trip,
  CreateTripDto,
  UpdateTripDto,
  TripDestination,
} from "../api.types";

export function useTrips() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const list = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.getTrips();
      return res as Trip[];
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(async (id: string) => {
    try {
      const res = await apiClient.getTrip(id);
      return res as Trip;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const create = useCallback(async (payload: CreateTripDto) => {
    try {
      const res = await apiClient.createTrip(payload);
      return res as Trip;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const update = useCallback(async (id: string, payload: UpdateTripDto) => {
    try {
      const res = await apiClient.updateTrip(id, payload);
      return res as Trip;
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await apiClient.deleteTrip(id);
    } catch (e) {
      setError(e);
      throw e;
    }
  }, []);

  const addDestination = useCallback(
    async (
      tripId: string,
      data: { destinationId: string; visitDate?: string; notes?: string }
    ) => {
      try {
        const res = await apiClient.addDestinationToTrip(tripId, data);
        return res as TripDestination;
      } catch (e) {
        setError(e);
        throw e;
      }
    },
    []
  );

  const removeDestination = useCallback(
    async (tripId: string, destinationId: string) => {
      try {
        await apiClient.removeDestinationFromTrip(tripId, destinationId);
      } catch (e) {
        setError(e);
        throw e;
      }
    },
    []
  );

  return {
    loading,
    error,
    list,
    get,
    create,
    update,
    remove,
    addDestination,
    removeDestination,
  };
}
