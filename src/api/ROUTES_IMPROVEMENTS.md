# API Routes Improvements

Use this file to collect suggestions and changes when the backend routes don't fit the frontend needs.

Format:

- endpoint: `/api/...`
  - issue: short description
  - suggested change: what the API should return or accept
  - impact: which frontend components/hooks are affected

Example:

- endpoint: `/api/favorites/check/:destinationId`
  - issue: endpoint returns { isFavorite } but frontend expects full Favorite object
  - suggested change: add an option query param `?detailed=true` or provide an endpoint `/favorites/:destinationId/status`
  - impact: Favorites button on DestinationCard

<!-- Add items below as you discover mismatches -->

- endpoint: `/api/markers`

  - issue: Backend core returns 404 for GET /api/markers (route may be absent or served by another service).
  - suggested change: Ensure the markers service exposes `/api/markers` on the core backend, or update frontend to call the proper service/base URL (ML or geospatial service) if markers are hosted elsewhere.
  - impact: `src/hooks/useMarkers.ts`, `src/pages/Map.tsx`, and marker-related map features.

- endpoint: `/api/auth/me`
  - issue: Backend core returns 404 for GET /api/auth/me in the current environment.
  - suggested change: Ensure authentication service exposes `/api/auth/me` or update frontend to call the correct auth base URL. Backend should return user profile for valid tokens (200) or 401 for invalid/expired tokens.
  - impact: `src/hooks/useAuth.ts`, `src/lib/api.ts` (getProfile), and any page that relies on user session on load (layout, protected routes).
