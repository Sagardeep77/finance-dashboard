import { MarketPrice, Portfolio } from "@/hooks/useWebsocket";
const url = "ws://localhost:8080";

export default function PortfolioComponent({portfolio, price} : {portfolio : Portfolio | null, price : MarketPrice}) {
  if (!portfolio) return <p>Loading portfolio...</p>;
  // Calculate Unrealized PnL
  const pnl =
    portfolio.holdings > 0
      ? (price! - portfolio.avgPrice) * portfolio.holdings
      : 0;

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-xl font-semibold text-center">Portfolio</h2>

      <div className="mt-2">
        <p>
          💰 <strong>Balance:</strong> ${portfolio.balance.toFixed(2)}
        </p>
        <p>
          📊 <strong>Holdings:</strong> {portfolio.holdings} Units
        </p>
        <p>
          📈 <strong>Avg Price:</strong> ${portfolio.avgPrice?.toFixed(2)}
        </p>
        <p className={pnl >= 0 ? "text-green-400" : "text-red-400"}>
          🔥 <strong>Unrealized PnL:</strong> ${pnl.toFixed(2)}
        </p>
      </div>

    </div>
  );
}
