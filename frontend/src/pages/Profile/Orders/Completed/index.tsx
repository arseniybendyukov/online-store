import { useOutletContext } from 'react-router-dom';
import css from '../index.module.css';
import { OrdersOutletContext } from '../types';
import { Order } from '../../../../components/Order';
import { SpinnerScreen } from '../../../../components/SpinnerScreen';

export function Completed() {
  const { completedOrders, isLoading } = useOutletContext<OrdersOutletContext>();

  return <>
    {
      isLoading
      ? <SpinnerScreen />
      : (
        <div className={css.items}>
          {
            completedOrders.length > 0
            ? completedOrders.map((order) => <Order key={order.id} order={order} />)
            : <div className='empty'>Нет выполненных заказов</div>
          }
        </div>
      )
    }
  </>;
}
