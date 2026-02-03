import React from "react";
import { Card, StatusPill } from "../../components/UI";
import "../../styles/pages.css";

/**
 * PUBLIC_INTERFACE
 * Customer orders list (demo state).
 */
export default function CustomerOrders({ orders, onTrack }) {
  return (
    <div className="Stack">
      <Card title="Your Orders" subtitle="Recent orders appear here (demo state).">
        {orders.length === 0 ? (
          <div className="Empty">No orders yet. Place one from Browse.</div>
        ) : (
          <div className="List">
            {orders.map((o) => (
              <div key={o.id} className="ListRow">
                <div className="ListLeft">
                  <div className="ListTitle">{o.restaurantName}</div>
                  <div className="ListSub">
                    {o.items.length} item(s) • ${o.total.toFixed(2)}
                  </div>
                </div>
                <div className="ListRight">
                  <StatusPill tone="info">{o.status}</StatusPill>
                  <button className="Btn BtnPrimary" type="button" onClick={() => onTrack(o)}>
                    Track
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
