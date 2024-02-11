import { useOutletContext } from 'react-router-dom';
import css from '../index.module.css';
import { OrdersOutletContext } from '../types';
import { Order } from '../../../../components/Order';
import { SpinnerScreen } from '../../../../components/SpinnerScreen';

export function NotActive() {
  const { notActiveOrders, isLoading } = useOutletContext<OrdersOutletContext>();

  return <>
    {
      isLoading
      ? <SpinnerScreen />
      : (
        <div className={css.items}>
          {
            notActiveOrders.length > 0
            ? notActiveOrders.map((order) => <Order key={order.id} order={order} />)
            : <div className='empty' style={{ minHeight: 300 }}>Нет неактивных заказов</div>
          }
        </div>
      )
    }
  </>;
}
