import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "../../components/AppShell";
import RestaurantMenu from "./RestaurantMenu";
import RestaurantOrders from "./RestaurantOrders";

/**
 * PUBLIC_INTERFACE
 * Restaurant portal with sub-routes.
 */
export default function RestaurantPortal() {
  const tabs = useMemo(
    () => [
      { to: "/restaurant/menu", label: "Menu", icon: "📜" },
      { to: "/restaurant/orders", label: "Orders", icon: "📟" }
    ],
    []
  );

  const [menu, setMenu] = useState([
    { id: "rm1", name: "Laser Lasagna", price: 15.0, active: true },
    { id: "rm2", name: "Synth Salad", price: 9.5, active: true }
  ]);

  const [orders, setOrders] = useState([
    { id: "o1", customer: "Neon Nibbler", items: 3, total: 28.5, status: "Placed" }
  ]);

  const toggleItem = (id) => {
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m)));
  };

  const addItem = (name, price) => {
    setMenu((prev) => [{ id: `rm_${Date.now()}`, name, price, active: true }, ...prev]);
  };

  const advanceOrder = (id) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next =
          o.status === "Placed"
            ? "Preparing"
            : o.status === "Preparing"
              ? "Ready"
              : o.status === "Ready"
                ? "Handed to Driver"
                : o.status;
        return { ...o, status: next };
      })
    );
  };

  return (
    <AppShell title="Restaurant Portal" tabs={tabs}>
      <Routes>
        <Route path="menu" element={<RestaurantMenu menu={menu} onToggle={toggleItem} onAdd={addItem} />} />
        <Route path="orders" element={<RestaurantOrders orders={orders} onAdvance={advanceOrder} />} />
        <Route path="*" element={<Navigate to="menu" replace />} />
      </Routes>
    </AppShell>
  );
}
