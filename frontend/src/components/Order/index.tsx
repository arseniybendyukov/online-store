import { Link } from 'react-router-dom';
import { Order as IOrder } from '../../types/data';
import { formatDate, getOverallPrice } from '../../utils/data';
import { Label } from '../Label';
import { OrderedProductCard } from '../OrderedProductCard';
import { ProductSlider } from '../ProductSlider';
import css from './index.module.css';
import { NavPaths, ProfileNestedPaths } from '../../navigation';

interface Props {
  order: IOrder;
}

export function Order({ order }: Props) {
  return (
    <div className={css.order}>
      <div className={css.properties}>
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
      <ProductSlider items={order.products.map((orderedProduct) => (
        <OrderedProductCard key={orderedProduct.id} orderedProduct={orderedProduct} />
      ))} />
    </div>
  );
}
