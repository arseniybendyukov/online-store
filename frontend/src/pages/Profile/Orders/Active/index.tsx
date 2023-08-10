import { useOutletContext } from 'react-router-dom';
import css from '../index.module.css';
import { OrdersOutletContext } from '../types';
import { Order } from '../../../../components/Order';

export function Active() {
  const { activeOrders } = useOutletContext<OrdersOutletContext>();

  return (
    <div className={css.items}>
      {activeOrders.map((order) => <Order key={order.id} order={order} />)}
    </div>
  );
}
