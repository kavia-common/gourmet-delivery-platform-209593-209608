import React from "react";
import { Card, StatusPill } from "../../components/UI";
import "../../styles/pages.css";

/**
 * PUBLIC_INTERFACE
 * Driver active delivery view (demo state).
 */
export default function DriverActive({ active, onProgress }) {
  return (
    <div className="Stack">
      <Card
        title="Active Run"
        subtitle="Update your progress (demo state)."
        actions={
          <button className="Btn BtnPrimary" type="button" onClick={onProgress} disabled={!active || active.status === "Delivered"}>
            Update Progress
          </button>
        }
      >
        {!active ? (
          <div className="Empty">No active run. Accept a job from Jobs.</div>
        ) : (
          <div className="ActiveRun">
            <div className="TrackingTop">
              <StatusPill tone="info">{active.status}</StatusPill>
              <StatusPill tone="ok">${active.pay.toFixed(2)}</StatusPill>
            </div>

            <div className="RunLine">
              <strong>Pickup:</strong> {active.pickup}
            </div>
            <div className="RunLine">
              <strong>Dropoff:</strong> {active.dropoff}
            </div>

            <div className="ProgressWrap" aria-label="Delivery progress">
              <div className="ProgressBar" style={{ width: `${active.progress}%` }} />
            </div>
            <div className="ProgressMeta">{active.progress}%</div>
          </div>
        )}
      </Card>
    </div>
  );
}
