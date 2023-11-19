import { Link } from 'react-router-dom';
import { Order as IOrder } from '../../types/data';
import { formatDate, getOverallPrice } from '../../utils/data';
import { Label } from '../Label';
import { OrderedProductCard } from '../OrderedProductCard';
import { Slider } from '../Slider';
import css from './index.module.css';
import { NavPaths, ProfileNestedPaths } from '../../navigation';
import { OrderIsCancelled } from '../OrderIsCancelled';

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
        <Label label='Стоимость заказа'>
          {getOverallPrice(order)}
        </Label>
        <Link
          className='link'
          to={`${NavPaths.PROFILE}/${ProfileNestedPaths.ORDER_DETAIL}/${order.id}`}
        >
          Перейти к деталям
        </Link>
      </div>
      <Slider items={order.products.map((orderedProduct) => (
        <OrderedProductCard key={orderedProduct.id} orderedProduct={orderedProduct} />
      ))} />
    </div>
  );
}
