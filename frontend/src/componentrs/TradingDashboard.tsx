import { useState } from "react";
import useWebSocket, { Order } from "@/hooks/useWebsocket";
import PortfolioComponent from "./Portfolio";
const url = "ws://localhost:8080";
export default function TradingDashboard() {
  const { marketPrice, orders, portfolio, placeOrder } = useWebSocket(url);
  const [size, setSize] = useState(1);
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg w-96">
      <h2 className="text-xl font-semibold text-center">Trading Panel</h2>
      <p className="text-3xl font-bold text-center mt-2">
        {marketPrice !== null ? `$${marketPrice.toFixed(2)}` : "Loading..."}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          className="bg-green-600 px-4 py-2 rounded-lg w-1/2 hover:bg-green-700"
          onClick={() => placeOrder("buy", size)}
        >
          Buy
        </button>
        <button
          className="bg-red-600 px-4 py-2 rounded-lg w-1/2 hover:bg-red-700"
          onClick={() => placeOrder("sell", size)}
        >
          Sell
        </button>
      </div>

      <PortfolioComponent portfolio={portfolio} price={marketPrice}/>


      <div className="mt-4">
        <h3 className="text-lg font-semibold">Execution History</h3>
        <ul className="mt-2 text-sm max-h-32 overflow-y-auto">
          {orders.length === 0 ? (
            <p className="text-gray-400">No trades yet.</p>
          ) : (
            orders.map((order: Order, index) => (
              <li key={index} className="border-b py-1">
                <span
                  className={
                    order.side === "buy" ? "text-green-400" : "text-red-400"
                  }
                >
                  {order.side}
                </span>{" "}
                {order.size} @ ${order.executedPrice.toFixed(2)}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
