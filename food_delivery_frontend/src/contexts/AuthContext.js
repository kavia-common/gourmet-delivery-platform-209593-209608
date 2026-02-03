import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "gourmet_delivery_auth_v1";

/**
 * PUBLIC_INTERFACE
 * Hook to access auth state and actions.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/**
 * PUBLIC_INTERFACE
 * Provides basic auth/role state for the app.
 *
 * Note: Backend OpenAPI currently exposes only "/" health endpoint; this context
 * uses localStorage to simulate login and role switching until backend auth APIs exist.
 */
export function AuthProvider({ children }) {
  const initial = (() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  })();

  const [user, setUser] = useState(initial); // { name, role: 'customer'|'restaurant'|'driver' }

  const value = useMemo(() => {
    const persist = (next) => {
      setUser(next);
      try {
        if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        else window.localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        // ignore storage failures
      }
    };

    return {
      user,
      isAuthed: Boolean(user),
      role: user?.role || "customer",

      // PUBLIC_INTERFACE
      loginDemo: (name, role) => {
        persist({ name: name || "Retro Rider", role });
      },

      // PUBLIC_INTERFACE
      logout: () => {
        persist(null);
      }
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
