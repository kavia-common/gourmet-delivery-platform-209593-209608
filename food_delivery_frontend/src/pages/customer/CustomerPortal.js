import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "../../components/AppShell";
import CustomerBrowse from "./CustomerBrowse";
import CustomerOrders from "./CustomerOrders";
import CustomerTracking from "./CustomerTracking";

/**
 * PUBLIC_INTERFACE
 * Customer portal with sub-routes.
 */
export default function CustomerPortal() {
  const tabs = useMemo(
    () => [
      { to: "/customer/browse", label: "Browse", icon: "🍔" },
      { to: "/customer/orders", label: "Orders", icon: "🧾" },
      { to: "/customer/tracking", label: "Tracking", icon: "🛰️" }
    ],
    []
  );

  // Demo state: orders list and current tracking
  const [orders, setOrders] = useState([]);
  const [activeTracking, setActiveTracking] = useState(null);

  const createOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
    setActiveTracking({
      orderId: order.id,
      status: "Placed",
      etaMin: 28,
      steps: [
        { label: "Placed", done: true },
        { label: "Preparing", done: false },
        { label: "Picked Up", done: false },
        { label: "Delivered", done: false }
      ]
    });
  };

  const simulateProgress = () => {
    setActiveTracking((prev) => {
      if (!prev) return prev;
      const nextSteps = prev.steps.map((s, idx) => {
        if (idx === 0) return s;
        const prevDoneCount = prev.steps.filter((x) => x.done).length;
        if (idx === prevDoneCount) return { ...s, done: true };
        return s;
      });

      const doneCount = nextSteps.filter((x) => x.done).length;
      const status = nextSteps[Math.min(doneCount - 1, nextSteps.length - 1)].label;
      const etaMin = Math.max(4, prev.etaMin - 7);

      return { ...prev, steps: nextSteps, status, etaMin };
    });
  };

  return (
    <AppShell title="Customer Portal" tabs={tabs}>
      <Routes>
        <Route
          path="browse"
          element={<CustomerBrowse onCreateOrder={createOrder} />}
        />
        <Route
          path="orders"
          element={<CustomerOrders orders={orders} onTrack={(o) => setActiveTracking({ ...activeTracking, orderId: o.id })} />}
        />
        <Route
          path="tracking"
          element={<CustomerTracking tracking={activeTracking} onSimulate={simulateProgress} />}
        />
        <Route path="*" element={<Navigate to="browse" replace />} />
      </Routes>
    </AppShell>
  );
}
