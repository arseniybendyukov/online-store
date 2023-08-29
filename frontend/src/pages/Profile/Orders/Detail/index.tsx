import { useParams } from 'react-router-dom';
import css from './index.module.css';
import { useGetOrderDetailQuery } from '../../../../redux/apis/productsApi';
import { getOverallPrice, monthAndDayFromDate } from '../../../../utils/data';
import { OrderStages } from './OrderStages';
import { Label } from '../../../../components/Label';
import { OrderedProductCard } from '../../../../components/OrderedProductCard';
import { SpinnerScreen } from '../../../../components/SpinnerScreen';

export function OrderDetail() {
  const { id = '' } = useParams();
  const { data: order, isLoading } = useGetOrderDetailQuery({ id });

  return <>
    {
      isLoading
      ? <SpinnerScreen />
      : order && (
        <div className={css.container}>
          <div className={css.heading}>
            <h1 className='h1'>
              Заказ от {monthAndDayFromDate(order.created_at)}
            </h1>
            
            {order.approx_delivery_date && (
              <Label label='Примерная дата доставки'>
                {monthAndDayFromDate(order.approx_delivery_date)}
              </Label>
            )}
          </div>

          <OrderStages stages={order.stages} />

          <section className={css.productsSection}>
            <div className={css.heading}>
              <h3 className='h3'>Товары ({order.products.length})</h3>
              <Label label='Стоимость'>
                {getOverallPrice(order)}
              </Label>
            </div>

            <div className={css.products}>
              {order.products.map((orderedProduct) => (
                <OrderedProductCard
                  key={orderedProduct.id}
                  orderedProduct={orderedProduct}
                />
              ))}
            </div>
          </section>
        </div>
      )
    }
  </>;
}
