export const getTotals = (cart) => {
  let totalAmount = 0;
  let totalCost = 0;

  Array.from(cart).forEach((item) => {
    const [id, value] = item;

    totalAmount += value.amount;
    const price = +value.price * value.amount;
    totalCost += price;
  });
  return { totalCost: totalCost.toFixed(2), totalAmount };
};
