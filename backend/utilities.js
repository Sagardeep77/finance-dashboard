export function placeOrder(data, marketPrice) {
  const user = this;
  let success = false;
  const executedPrice = marketPrice + (Math.random() * 2 - 1);
  const cost = executedPrice * data.size;
  if (data.side === "buy" && user.balance > cost) {
    user.balance -= cost;
    user.avgPrice =
      (user.avgPrice * user.holdings + executedPrice * data.size) /
        (user.holdings +
          data.size);
    user.holdings += data.size;
    success = true;
  } else if (data.side === "sell" && user.holdings >= data.size) {
    user.balance += cost;
    user.avgPrice =
      (user.avgPrice * user.holdings - executedPrice * data.size) /
      (user.holdings - data.size);
    user.holdings -= data.size;
    success = true;
  }

  return { success, executedPrice, cost, user };
}
