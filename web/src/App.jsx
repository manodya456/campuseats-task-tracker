import { useState } from "react";

// Read the API base URL from the environment (set VITE_API_URL on Vercel).
const API = import.meta.env.VITE_API_URL;

const MENU = [
  { id: 1, name: "Chicken Kottu", price: 850 },
  { id: 2, name: "Egg Fried Rice", price: 700 },
  { id: 3, name: "Veggie Sandwich", price: 450 },
];

// Same pricing rule as src/tasks.js in the repo (VIP gets 10% off).
function calculateTotal(price, quantity, customerType) {
  const subtotal = price * quantity;
  return customerType === "vip" ? subtotal * 0.9 : subtotal;
}

export default function App() {
  const [qty, setQty] = useState({});
  const [vip, setVip] = useState(false);

  const total = MENU.reduce(
    (sum, m) =>
      sum + calculateTotal(m.price, qty[m.id] || 0, vip ? "vip" : "regular"),
    0
  );

  return (
    <main className="wrap">
      <h1>CampusEats</h1>
      <p className="muted">
        Backend API: <code>{API || "VITE_API_URL not set"}</code>
      </p>

      <ul className="menu">
        {MENU.map((m) => (
          <li key={m.id}>
            <span>
              {m.name} <small>Rs. {m.price}</small>
            </span>
            <input
              type="number"
              min="0"
              value={qty[m.id] || 0}
              onChange={(e) =>
                setQty({ ...qty, [m.id]: Math.max(0, Number(e.target.value)) })
              }
            />
          </li>
        ))}
      </ul>

      <label className="vip">
        <input
          type="checkbox"
          checked={vip}
          onChange={(e) => setVip(e.target.checked)}
        />
        VIP customer (10% off)
      </label>

      <h2>Total: Rs. {total.toFixed(2)}</h2>
    </main>
  );
}
