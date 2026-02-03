import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import CustomerPortal from "./pages/customer/CustomerPortal";
import RestaurantPortal from "./pages/restaurant/RestaurantPortal";
import DriverPortal from "./pages/driver/DriverPortal";
import "./styles/theme.css";

/**
 * Route guard that ensures a user is logged in and has the required role.
 */
function RoleGate({ role, children }) {
  const { isAuthed, user } = useAuth();
  if (!isAuthed) return <Navigate to="/" replace />;
  if (user?.role !== role) return <Navigate to={`/${user?.role || "customer"}`} replace />;
  return children;
}

/**
 * PUBLIC_INTERFACE
 * App entrypoint: sets up routing and auth provider.
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/customer/*"
            element={
              <RoleGate role="customer">
                <CustomerPortal />
              </RoleGate>
            }
          />
          <Route
            path="/restaurant/*"
            element={
              <RoleGate role="restaurant">
                <RestaurantPortal />
              </RoleGate>
            }
          />
          <Route
            path="/driver/*"
            element={
              <RoleGate role="driver">
                <DriverPortal />
              </RoleGate>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
