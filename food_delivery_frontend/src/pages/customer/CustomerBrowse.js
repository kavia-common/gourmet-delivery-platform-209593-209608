import React, { useMemo, useState } from "react";
import { Card, StatusPill } from "../../components/UI";
import "../../styles/pages.css";

function makeId() {
  return `ord_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

/**
 * PUBLIC_INTERFACE
 * Customer browse screen: list restaurants + menus and place a demo order.
 */
export default function CustomerBrowse({ onCreateOrder }) {
  const restaurants = useMemo(
    () => [
      {
        id: "r1",
        name: "Neon Noodle House",
        vibe: "Synth ramen & glow broth",
        eta: "20–35 min",
        menu: [
          { id: "m1", name: "Cyber Shoyu Ramen", price: 12.5 },
          { id: "m2", name: "Vaporwave Gyoza", price: 7.0 },
          { id: "m3", name: "Pixel Matcha", price: 4.5 }
        ]
      },
      {
        id: "r2",
        name: "Arcade Pizza Parlor",
        vibe: "8-bit slices & cheesy beats",
        eta: "25–40 min",
        menu: [
          { id: "m4", name: "Boss Fight Pepperoni", price: 14.0 },
          { id: "m5", name: "High Score Veggie", price: 13.0 },
          { id: "m6", name: "Coin-Op Cola", price: 3.25 }
        ]
      }
    ],
    []
  );

  const [selected, setSelected] = useState(restaurants[0]);
  const [cart, setCart] = useState([]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const addItem = (item) => setCart((prev) => [...prev, item]);
  const removeItem = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));

  const placeOrder = () => {
    if (!cart.length) return;
    const order = {
      id: makeId(),
      restaurantName: selected.name,
      items: cart,
      total: Number(total.toFixed(2)),
      createdAt: new Date().toISOString(),
      status: "Placed"
    };
    setCart([]);
    onCreateOrder(order);
  };

  return (
    <div className="Stack">
      <Card
        title="Restaurants"
        subtitle="Pick a spot, browse the menu, then place an order."
      >
        <div className="RestaurantGrid">
          {restaurants.map((r) => (
            <button
              key={r.id}
              className={r.id === selected.id ? "RestaurantCard active" : "RestaurantCard"}
              onClick={() => setSelected(r)}
              type="button"
            >
              <div className="RestaurantName">{r.name}</div>
              <div className="RestaurantVibe">{r.vibe}</div>
              <div className="RestaurantMeta">
                <StatusPill tone="info">ETA {r.eta}</StatusPill>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <div className="Grid2">
        <Card title={`Menu — ${selected.name}`} subtitle="Tap to add items to your cart.">
          <div className="MenuList">
            {selected.menu.map((m) => (
              <div key={m.id} className="MenuRow">
                <div className="MenuText">
                  <div className="MenuItem">{m.name}</div>
                  <div className="MenuPrice">${m.price.toFixed(2)}</div>
                </div>
                <button className="Btn BtnPrimary" type="button" onClick={() => addItem(m)}>
                  Add
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Cart"
          subtitle="Review items before placing the order."
          actions={
            <button className="Btn BtnPrimary" type="button" onClick={placeOrder} disabled={!cart.length}>
              Place Order
            </button>
          }
        >
          {cart.length === 0 ? (
            <div className="Empty">Your cart is empty. Add some retro fuel.</div>
          ) : (
            <div className="CartList">
              {cart.map((c, idx) => (
                <div key={`${c.id}_${idx}`} className="CartRow">
                  <div className="CartItem">{c.name}</div>
                  <div className="CartRight">
                    <div className="CartPrice">${c.price.toFixed(2)}</div>
                    <button className="Btn BtnGhost" type="button" onClick={() => removeItem(idx)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="CartTotal">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
