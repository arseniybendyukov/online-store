import { useOutletContext } from 'react-router-dom';
import css from '../index.module.css';
import { OrdersOutletContext } from '../types';
import { Order } from '../../../../components/Order';
import { SpinnerScreen } from '../../../../components/SpinnerScreen';

export function Active() {
  const { activeOrders, isLoading } = useOutletContext<OrdersOutletContext>();

  return <>
    {
      isLoading
      ? <SpinnerScreen />
      : (
        <div className={css.items}>
          {
            activeOrders.length > 0
            ? activeOrders.map((order) => <Order key={order.id} order={order} />)
            : <div className='empty'>Нет активных заказов</div>
          }
        </div>
      )
    }
  </>;
}
