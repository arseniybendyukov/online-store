import { Order, OrderDetail } from "../../types/data";
import { getOrderPrice } from "../../utils/data";
import { Label } from "../Label";
import { ProductPrice } from "../ProductPrice";
import css from './index.module.css';

export function OrderPrice({ order }: { order: OrderDetail | Order }) {
  const [actualPrice, promocodePrice] = getOrderPrice(order);

  return (
    <Label label='Стоимость товаров'>
      <div className={css.container}>
        <ProductPrice
          actualPrice={actualPrice}
          salePrice={order.promocode && promocodePrice}
          percentage={order.promocode?.percentage}
        />
        { order.promocode && `(${order.promocode.name})` }
      </div>
    </Label>
  );
}
