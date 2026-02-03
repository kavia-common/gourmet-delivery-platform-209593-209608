import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHealth } from "../api/health";
import { useAuth } from "../contexts/AuthContext";
import { Card, ErrorBanner, Field, Loading, StatusPill } from "../components/UI";
import "../styles/pages.css";

/**
 * PUBLIC_INTERFACE
 * Entry screen: demo login + API status.
 */
export default function LandingPage() {
  const navigate = useNavigate();
  const { loginDemo, isAuthed, role } = useAuth();

  const [name, setName] = useState("Retro Rider");
  const [selectedRole, setSelectedRole] = useState("customer");

  const [health, setHealth] = useState({ loading: true, ok: false, error: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await getHealth();
        if (!cancelled) setHealth({ loading: false, ok: true, error: null });
      } catch (e) {
        if (!cancelled) setHealth({ loading: false, ok: false, error: e });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isAuthed) return;
    navigate(`/${role}`);
  }, [isAuthed, role, navigate]);

  const onEnter = (e) => {
    e.preventDefault();
    loginDemo(name, selectedRole);
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="Page">
      <div className="Hero">
        <div>
          <div className="Kicker">A neon-powered delivery adventure</div>
          <h1 className="H1">Gourmet Delivery Platform</h1>
          <p className="Lead">
            Browse menus, place orders, and track deliveries — with dedicated portals for restaurants and drivers.
            Retro theme, modern flow.
          </p>

          <div className="ApiStatus">
            {health.loading ? (
              <Loading label="Checking backend connection..." />
            ) : health.ok ? (
              <StatusPill tone="ok">Backend: ONLINE</StatusPill>
            ) : (
              <StatusPill tone="bad">Backend: OFFLINE</StatusPill>
            )}
          </div>

          {!health.loading && !health.ok && (
            <ErrorBanner
              title="Backend not reachable"
              error={health.error}
              onRetry={() => window.location.reload()}
            />
          )}
        </div>

        <Card
          title="Sign in (Demo)"
          subtitle="Backend auth endpoints were not present in OpenAPI yet, so this is a demo login to unlock flows."
        >
          <form className="Form" onSubmit={onEnter}>
            <Field
              label="Display name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Neon Nibbler"
              autoComplete="name"
            />

            <div className="RolePick">
              <label className="RoleOption">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={selectedRole === "customer"}
                  onChange={() => setSelectedRole("customer")}
                />
                <span>Customer</span>
              </label>
              <label className="RoleOption">
                <input
                  type="radio"
                  name="role"
                  value="restaurant"
                  checked={selectedRole === "restaurant"}
                  onChange={() => setSelectedRole("restaurant")}
                />
                <span>Restaurant</span>
              </label>
              <label className="RoleOption">
                <input
                  type="radio"
                  name="role"
                  value="driver"
                  checked={selectedRole === "driver"}
                  onChange={() => setSelectedRole("driver")}
                />
                <span>Driver</span>
              </label>
            </div>

            <button className="Btn BtnPrimary" type="submit">
              Enter Portal
            </button>

            <p className="Hint">
              Tip: Set <code>REACT_APP_API_BASE_URL</code> to point at your FastAPI server.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
