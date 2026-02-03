import React from "react";
import { Card, StatusPill } from "../../components/UI";
import "../../styles/pages.css";

/**
 * PUBLIC_INTERFACE
 * Customer tracking view (demo steps).
 */
export default function CustomerTracking({ tracking, onSimulate }) {
  return (
    <div className="Stack">
      <Card
        title="Live Tracking"
        subtitle="Real-time tracking will be wired once backend websocket/track endpoints exist. For now, simulate progress."
        actions={
          <button className="Btn BtnPrimary" type="button" onClick={onSimulate} disabled={!tracking}>
            Simulate Next Step
          </button>
        }
      >
        {!tracking ? (
          <div className="Empty">Nothing to track yet. Place an order first.</div>
        ) : (
          <div className="Tracking">
            <div className="TrackingTop">
              <StatusPill tone="ok">{tracking.status}</StatusPill>
              <StatusPill tone="info">ETA ~{tracking.etaMin} min</StatusPill>
            </div>

            <ol className="Steps">
              {tracking.steps.map((s) => (
                <li key={s.label} className={s.done ? "Step done" : "Step"}>
                  <span className="StepDot" aria-hidden="true" />
                  <span>{s.label}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </Card>
    </div>
  );
}
