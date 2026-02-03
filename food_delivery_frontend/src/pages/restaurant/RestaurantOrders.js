import React from "react";
import { Card, StatusPill } from "../../components/UI";
import "../../styles/pages.css";

/**
 * PUBLIC_INTERFACE
 * Restaurant incoming orders screen (demo state).
 */
export default function RestaurantOrders({ orders, onAdvance }) {
  return (
    <div className="Stack">
      <Card title="Incoming Orders" subtitle="Advance an order through preparation states (demo state).">
        {orders.length === 0 ? (
          <div className="Empty">No incoming orders right now.</div>
        ) : (
          <div className="List">
            {orders.map((o) => (
              <div key={o.id} className="ListRow">
                <div className="ListLeft">
                  <div className="ListTitle">{o.customer}</div>
                  <div className="ListSub">
                    {o.items} item(s) • ${o.total.toFixed(2)}
                  </div>
                </div>
                <div className="ListRight">
                  <StatusPill tone="info">{o.status}</StatusPill>
                  <button className="Btn BtnPrimary" type="button" onClick={() => onAdvance(o.id)}>
                    Next
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
