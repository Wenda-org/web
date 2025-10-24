# Pages

This directory contains page components for different routes in the application.

## Structure

Each page represents a distinct view in the application.

## Example

```
pages/
  ├── Dashboard/
  │   ├── Dashboard.tsx
  │   └── index.ts
  ├── Maps/
  │   ├── Maps.tsx
  │   └── index.ts
  └── Reports/
      ├── Reports.tsx
      └── index.ts
```

## Usage with React Router

```typescript
import { Dashboard } from './pages/Dashboard';
import { Maps } from './pages/Maps';

// In your router configuration
const router = createBrowserRouter([
  { path: '/', element: <Dashboard /> },
  { path: '/maps', element: <Maps /> },
]);
```
