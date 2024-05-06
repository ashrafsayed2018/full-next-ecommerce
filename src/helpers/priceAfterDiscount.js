export function getPriceAfterDiscount(item) {
  return Number((item.price - item.price * (item.priceDrop / 100)).toFixed(2));
}
