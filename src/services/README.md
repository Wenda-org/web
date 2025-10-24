# Services

This directory contains API service functions and external integrations.

## Purpose

- API calls to backend services
- Data fetching and mutations
- Third-party service integrations

## Example

```typescript
// services/api.ts
export const apiClient = {
  baseURL: import.meta.env.VITE_API_URL,
  // ... configuration
};

// services/tourismService.ts
export const getTourismData = async () => {
  const response = await fetch(`${apiClient.baseURL}/tourism/data`);
  return response.json();
};
```
