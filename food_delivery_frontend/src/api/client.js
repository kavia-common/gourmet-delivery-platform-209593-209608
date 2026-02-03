/**
 * Minimal fetch wrapper for the app.
 * Uses REACT_APP_API_BASE_URL and provides consistent error handling.
 */

const DEFAULT_BASE_URL = "";

/**
 * PUBLIC_INTERFACE
 * Returns the API base URL from environment variables.
 */
export function getApiBaseUrl() {
  // CRA exposes env vars prefixed with REACT_APP_ at build time.
  return (process.env.REACT_APP_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, "");
}

/**
 * PUBLIC_INTERFACE
 * Perform a JSON request to the backend API.
 * @param {string} path API path starting with "/"
 * @param {object} options fetch options + { token?: string }
 * @returns {Promise<any>} parsed JSON (or null for 204)
 */
export async function apiRequest(path, options = {}) {
  const { token, headers, ...rest } = options;

  const url = `${getApiBaseUrl()}${path}`;
  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(rest.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {})
    }
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    let details = null;
    try {
      details = isJson ? await res.json() : await res.text();
    } catch (e) {
      details = null;
    }
    const error = new Error("API request failed");
    error.status = res.status;
    error.details = details;
    error.url = url;
    throw error;
  }

  if (res.status === 204) return null;
  return isJson ? res.json() : res.text();
}
