import { getPriceAfterDiscount } from "./priceAfterDiscount";

export function getToatalCartPrice(cartItems) {
  return cartItems.reduce(
    (total, item) => getPriceAfterDiscount(item.productID) + total,
    0
  );
}
