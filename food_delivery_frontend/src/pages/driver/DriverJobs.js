import React from "react";
import { Card, StatusPill } from "../../components/UI";
import "../../styles/pages.css";

/**
 * PUBLIC_INTERFACE
 * Driver job board (demo state).
 */
export default function DriverJobs({ jobs, onAccept }) {
  return (
    <div className="Stack">
      <Card title="Available Jobs" subtitle="Accept a job to start a delivery run (demo state).">
        <div className="List">
          {jobs.map((j) => (
            <div key={j.id} className="ListRow">
              <div className="ListLeft">
                <div className="ListTitle">
                  {j.pickup} → {j.dropoff}
                </div>
                <div className="ListSub">Payout: ${j.pay.toFixed(2)}</div>
              </div>
              <div className="ListRight">
                <StatusPill tone={j.status === "Available" ? "ok" : "warn"}>{j.status}</StatusPill>
                <button
                  className="Btn BtnPrimary"
                  type="button"
                  disabled={j.status !== "Available"}
                  onClick={() => onAccept(j.id)}
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
