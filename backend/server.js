// Tracks User holdings and PnL real time
// Display open positions(avg. buy sell price)
// Show account balance and transition history

/* 
message types : 

  1. market_update
  2. portfolio_update
  3. order_executed
  4. 
*/

/* 
  1. Maintain user balances
    => {balance, avgPrice, tradeHistory, holdings}
  2. Track position based on executed trades
  3. Send portfolio updates on real time
*/
import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import { placeOrder } from "./utilities.js";
import chalk from "chalk";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running on ws://localhost:${PORT}`);

const clients = new Map();

// Simulated order book and market prices
let marketPrice = 100.0;

// Simulate market price updates
setInterval(() => {
  marketPrice += Math.random() * 2 - 1; // Random walk
  for (const client of clients.keys()) {
    client.send(JSON.stringify({ type: "market_update", price: marketPrice }));
  }
}, 2000);

wss.on("connection", (ws) => {
  console.log(chalk.bgGreen("Client connected"));
  const userId = uuidv4();
  clients.set(ws, {
    balance: 10000, //initial balance
    holdings: 0,
    avgPrice: 0,
    tradeHistory: [],
  });

  // Send initial market price
  ws.send(JSON.stringify({ type: "market_update", price: marketPrice }));
  ws.send(JSON.stringify({ type: "portfolio_update", ...clients.get(ws) }));

  // Handle incoming messages from clients
  ws.on("message", (message) => {
    console.log(chalk.blueBright("message recieved :" + message));
    const data = JSON.parse(message);

    const user = clients.get(ws);

    if (data.type === "place_order") {
      const orderId = uuidv4();
      const { success: isOrderPLaced, executedPrice } = placeOrder.call(user,
        data,
        marketPrice
      );

      if (isOrderPLaced) {
        user.tradeHistory.push({
          orderId,
          executedPrice,
          size: data.size,
          side: data.side,
        });
        console.log(chalk.green(`Order placed: ${JSON.stringify(data)}`));

        ws.send(
          JSON.stringify({
            type: "order_executed",
            orderId,
            size: data.size,
            side: data.side,
            executedPrice: executedPrice,
          })
        );
      }
      ws.send(JSON.stringify({ type: "portfolio_update", ...user }));
    }
  });

  ws.on("close", () => {
    console.log(chalk.bgRed("Client disconnected"));
    clients.delete(ws);
  });
});
