import { Order } from "../types/data";

export function formatDate(date: string) {
  const obj = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return obj.format(new Date(date));
}

export function getOverallPrice(order: Order) {
  const price = order.products.reduce((acc, orderedProduct) => {
    const price = orderedProduct.variant.price.sale_price || orderedProduct.variant.price.actual_price;
    return acc + price * orderedProduct.amount;
  }, 0);

  return `${price} ₽`;
}
