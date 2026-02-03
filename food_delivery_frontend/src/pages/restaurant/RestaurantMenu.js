import React, { useState } from "react";
import { Card, Field, StatusPill } from "../../components/UI";
import "../../styles/pages.css";

/**
 * PUBLIC_INTERFACE
 * Restaurant menu editor (demo state).
 */
export default function RestaurantMenu({ menu, onToggle, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("10.00");

  const submit = (e) => {
    e.preventDefault();
    const p = Number(price);
    if (!name.trim() || Number.isNaN(p) || p <= 0) return;
    onAdd(name.trim(), p);
    setName("");
    setPrice("10.00");
  };

  return (
    <div className="Stack">
      <Card title="Menu Items" subtitle="Toggle visibility or add a new item (demo state).">
        <div className="List">
          {menu.map((m) => (
            <div key={m.id} className="ListRow">
              <div className="ListLeft">
                <div className="ListTitle">{m.name}</div>
                <div className="ListSub">${m.price.toFixed(2)}</div>
              </div>
              <div className="ListRight">
                <StatusPill tone={m.active ? "ok" : "warn"}>{m.active ? "Active" : "Paused"}</StatusPill>
                <button className="Btn BtnPrimary" type="button" onClick={() => onToggle(m.id)}>
                  {m.active ? "Pause" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Add Item" subtitle="Create a new menu item.">
        <form className="Form" onSubmit={submit}>
          <div className="Grid2">
            <Field
              label="Name"
              name="itemName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Turbo Tacos"
            />
            <Field
              label="Price"
              name="itemPrice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="decimal"
            />
          </div>
          <button className="Btn BtnPrimary" type="submit">
            Add to Menu
          </button>
        </form>
      </Card>
    </div>
  );
}
