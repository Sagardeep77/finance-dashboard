import { useEffect, useState } from "react";

type MarketUpdate = {
  type: "market_update";
};

type OrderExecuted = {
  type: "order_executed";
};

type PortfolioUpdated = {
  type: "portfolio_update";
};

export type MarketPrice = number;

export type Order = {
  orderId: string;
  executedPrice: number;
  size: number;
  side: "buy" | "sell";
};
export type Portfolio = {
  balance: number;
  holdings: number;
  avgPrice: number;
  tradeHistory: Order[];
};

type WebsocketMessage = OrderExecuted | MarketUpdate | PortfolioUpdated;
const useWebsocket = (url: string) => {
  const [marketPrice, setMarketPrice] = useState<MarketPrice>(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("Connnected to websocket server");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const type = data.type;
      if (type == "market_update") {
        setMarketPrice(data.price);
      } else if (type === "order_executed") {
        setOrders((prev) => [...prev, {
          orderId : data.orderId,
          side : data.side,
          size : data.size,
          executedPrice : data.executedPrice
        }]);
      } else if (type === "portfolio_update") {
        setPortfolio({
          balance: data.balance,
          holdings: data.holdings,
          avgPrice: data.avgPrice,
          tradeHistory: data.tradeHistory,
        });
      }
    };

    socket.onclose = () => {
      console.log("Websocket disconnected");
      setWs(null);
    };

    return () => ws?.close();
  }, []);

  const placeOrder = (side: "buy" | "sell", size: number) => {
    if (!ws || ws?.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "place_order", side, size }));
  };

  return { marketPrice, orders, portfolio, placeOrder };
};

export default useWebsocket;
