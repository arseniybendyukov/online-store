import { Outlet } from 'react-router-dom';
import css from './index.module.css';
import { NavTabs } from '../../../components/NavTabs';
import { OrdersNestedPaths } from '../../../navigation';
import { useGetOrdersQuery } from '../../../redux/api';

export function Orders() {
  const { data = [], isLoading } = useGetOrdersQuery();
  
  const activeOrders = data.filter((order) => order.is_active);
  const notActiveOrders = data.filter((order) => !order.is_active);

  return (
    <div className={css.content}>
      <h1 className='h1'>Заказы</h1>

      <NavTabs
        options={[
          {
            path: OrdersNestedPaths.ACTIVE,
            name: `Активные (${activeOrders.length})`,
          },
          {
            path: OrdersNestedPaths.NOT_ACTIVE,
            name: `Неактивные (${notActiveOrders.length})`,
          },
        ]}
      />

      <Outlet
        context={{
          activeOrders,
          notActiveOrders,
          isLoading,
        }}
      />
    </div>
  );
}
