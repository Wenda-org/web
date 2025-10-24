# Hooks

This directory contains custom React hooks.

## Purpose

- Reusable stateful logic
- Custom hooks for common patterns
- Data fetching hooks

## Example

```typescript
// hooks/useTourismData.ts
import { useState, useEffect } from 'react';
import { getTourismData } from '../services/tourismService';

export const useTourismData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTourismData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
```
