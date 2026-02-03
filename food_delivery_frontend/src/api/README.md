# Frontend API wiring

This frontend uses `REACT_APP_API_BASE_URL` and a small fetch wrapper in `src/api/client.js`.

## Current backend status

The downloaded OpenAPI spec (`backend-openapi.json`) currently exposes only:

- `GET /` (health check)

So the app currently:
- verifies backend connectivity on the landing page via `GET /`
- uses **demo/local state** for customer/restaurant/driver flows until additional backend endpoints are available.

When backend endpoints for auth/restaurants/menu/orders/tracking are added, implement them under `src/api/` and replace demo state in the portal pages.
