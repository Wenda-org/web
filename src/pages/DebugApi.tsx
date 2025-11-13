import React, { useState } from "react";
import apiClient from "../lib/api";
import { apiBaseUrl } from "../api/config";
import { Button } from "../components/ui/button";

// Extra debug helpers: show auth token and perform both axios-based and native fetch

export default function DebugApi() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [rawResult, setRawResult] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await apiClient.getUsers();
      setResult(res);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function fetchUsersNative() {
    setLoading(true);
    setError(null);
    setRawResult(null);
    try {
      const t = localStorage.getItem("authToken");
      setToken(t);
      const url = apiBaseUrl.replace(/\/*$/, "") + "/users";
      const res = await fetch(url, {
        headers: t ? { Authorization: `Bearer ${t}` } : {},
      });
      const json = await res.json();
      setRawResult({ status: res.status, body: json });
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Debug API</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        apiBase: {apiBaseUrl}
      </p>
      <div className="flex gap-2 mb-4">
        <Button onClick={fetchUsers} disabled={loading}>
          {loading ? "Fetching..." : "Fetch (axios) /api/users"}
        </Button>
        <Button onClick={fetchUsersNative} disabled={loading}>
          {loading ? "Fetching..." : "Fetch (native) /api/users"}
        </Button>
      </div>
      {error && (
        <pre className="whitespace-pre-wrap text-red-600 bg-red-50 p-3 rounded">
          {error}
        </pre>
      )}
      {token && (
        <pre className="whitespace-pre-wrap text-sm bg-yellow-50 p-3 rounded">
          authToken: {token}
        </pre>
      )}
      {result && (
        <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
          axios result:
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      {rawResult && (
        <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
          native fetch result:
          {JSON.stringify(rawResult, null, 2)}
        </pre>
      )}
    </div>
  );
}
