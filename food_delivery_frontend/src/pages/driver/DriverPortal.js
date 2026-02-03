import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "../../components/AppShell";
import DriverJobs from "./DriverJobs";
import DriverActive from "./DriverActive";

/**
 * PUBLIC_INTERFACE
 * Driver portal with sub-routes.
 */
export default function DriverPortal() {
  const tabs = useMemo(
    () => [
      { to: "/driver/jobs", label: "Jobs", icon: "🛵" },
      { to: "/driver/active", label: "Active", icon: "📡" }
    ],
    []
  );

  const [jobs, setJobs] = useState([
    { id: "j1", pickup: "Arcade Pizza Parlor", dropoff: "12 Neon Ave", pay: 6.75, status: "Available" },
    { id: "j2", pickup: "Neon Noodle House", dropoff: "88 Vapor St", pay: 8.25, status: "Available" }
  ]);

  const [active, setActive] = useState(null);

  const accept = (id) => {
    const job = jobs.find((j) => j.id === id);
    if (!job) return;
    setActive({ ...job, status: "En Route to Pickup", progress: 0 });
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: "Taken" } : j)));
  };

  const progress = () => {
    setActive((prev) => {
      if (!prev) return prev;
      const nextProgress = Math.min(100, prev.progress + 35);
      const status =
        nextProgress < 35
          ? "En Route to Pickup"
          : nextProgress < 70
            ? "Picked Up"
            : nextProgress < 100
              ? "En Route to Dropoff"
              : "Delivered";
      return { ...prev, progress: nextProgress, status };
    });
  };

  return (
    <AppShell title="Driver Portal" tabs={tabs}>
      <Routes>
        <Route path="jobs" element={<DriverJobs jobs={jobs} onAccept={accept} />} />
        <Route path="active" element={<DriverActive active={active} onProgress={progress} />} />
        <Route path="*" element={<Navigate to="jobs" replace />} />
      </Routes>
    </AppShell>
  );
}
