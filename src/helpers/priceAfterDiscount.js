export function getPriceAfterDiscount(item) {
  console.log(item, "item price updated");
  return Number((item.price - item.price * (item.priceDrop / 100)).toFixed(2));
}
