import { Link } from 'react-router-dom';
import { Order as IOrder } from '../../types/data';
import { formatDate, getOrderPrice, toCurrency } from '../../utils/data';
import { Label } from '../Label';
import { OrderedProductCard } from '../OrderedProductCard';
import { Slider } from '../Slider';
import css from './index.module.css';
import { NavPaths, ProfileNestedPaths } from '../../navigation';
import { OrderIsCancelled } from '../OrderIsCancelled';
import { ProductPrice } from '../ProductPrice';
import { OrderPrice } from '../OrderPrice';

interface Props {
  order: IOrder;
}

export function Order({ order }: Props) {
  return (
    <div className={css.order}>
      <div className={css.properties}>
        {order.is_cancelled && <OrderIsCancelled />}

        <Label label='Создан'>
          {formatDate(order.created_at)}
        </Label>

        <OrderPrice order={order} />

        <Label label='Стоимость доставки'>
          {toCurrency(order.delivery_sum)}
        </Label>
      </div>
      <Link to={`${NavPaths.PROFILE}/${ProfileNestedPaths.ORDER_DETAIL}/${order.id}`}>
        <Slider
          breakpoints={{
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            550: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1230: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }}
          items={
            order.products.map((orderedProduct) => (
              <OrderedProductCard
                key={orderedProduct.id}
                orderedProduct={orderedProduct}
                className={css.heightCard}
              />
            ))
          }
        />
      </Link>
    </div>
  );
}
