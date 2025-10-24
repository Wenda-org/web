# Utils

This directory contains utility functions and helpers.

## Purpose

- Helper functions
- Common utilities
- Formatting functions
- Constants

## Example

```typescript
// utils/formatters.ts
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA'
  }).format(value);
};

// utils/constants.ts
export const API_ENDPOINTS = {
  TOURISM: '/api/tourism',
  MAPS: '/api/maps',
};
```
