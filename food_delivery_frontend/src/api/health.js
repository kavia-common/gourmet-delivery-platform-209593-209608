import { apiRequest } from "./client";

/**
 * PUBLIC_INTERFACE
 * Calls backend health check endpoint.
 */
export function getHealth() {
  return apiRequest("/", { method: "GET" });
}
