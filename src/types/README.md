# Types

This directory contains TypeScript type definitions and interfaces.

## Purpose

- Shared TypeScript types
- API response types
- Component prop types
- Domain models

## Example

```typescript
// types/tourism.ts
export interface TourismData {
  id: string;
  location: string;
  visitors: number;
  date: Date;
}

export interface Forecast {
  period: string;
  predicted_visitors: number;
  confidence: number;
}

// types/api.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
```
