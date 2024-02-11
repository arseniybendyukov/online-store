import { useParams } from 'react-router-dom';
import css from './index.module.css';
import { useGetOrderDetailQuery } from '../../../../redux/api';
import { getOverallPrice, monthAndDayFromDate } from '../../../../utils/data';
import { OrderStages } from './OrderStages';
import { Label } from '../../../../components/Label';
import { OrderedProductCard } from '../../../../components/OrderedProductCard';
import { SpinnerScreen } from '../../../../components/SpinnerScreen';
import { OrderIsCancelled } from '../../../../components/OrderIsCancelled';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../../../components/Button';
import { CancelOrderButton } from './CancelOrderButton';

export function OrderDetail() {
  const { id = '' } = useParams();
  const { data: order, isLoading } = useGetOrderDetailQuery({ id });

  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);

  const selectedStage = useMemo(() => {
    if (order) {
      return order.stages.find((stage) => stage.stage_type.id === selectedStageId) || null;
    } else {
      return null;
    }
  }, [order, selectedStageId]);

  const currentStage = useMemo(() => {
    if (order) {
      return order.stages.find((stage) => !stage.is_done) || null;
    } else {
      return null;
    }
  }, [order, selectedStageId]);

  useEffect(() => {
    if (order && selectedStageId === null) {
      setSelectedStageId(
        (order.stages.find((stage) => !stage.is_done) || order.stages[0]).stage_type.id
      );
    }
  }, [order, selectedStageId, setSelectedStageId]);


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

          {
            order.is_cancelled
            ? (
              <OrderIsCancelled />
            )
            : (
              <OrderStages
                stages={order.stages}
                selectedStageId={selectedStageId}
                setSelectedStageId={setSelectedStageId}
              />
            )
          }

          {selectedStage && !order.is_cancelled && (
            <div className={css.stageDescription}>
              <h3 className='h3'>Детали этапа</h3>

              <p>{selectedStage.stage_type.description}</p>

              {selectedStage === currentStage && currentStage?.stage_type.is_payment_stage && (
                <div className={css.paymentContainer}>
                  <Button state={{ default: { text: 'Оплатить', icon: undefined } }} />
                </div>
              )}
            </div>
          )}

          <section className={css.productsSection}>
            <div className={css.heading}>
              <h3 className='h3'>Товары ({ order.products.length })</h3>
              <Label label='Стоимость'>
                {getOverallPrice(order)}
              </Label>
            </div>

            <div className={css.products}>
              {order.products.map((orderedProduct) => (
                <OrderedProductCard
                  key={orderedProduct.id}
                  orderedProduct={orderedProduct}
                  showCreateReviewButton
                />
              ))}
            </div>
          </section>
              
          {!order.is_cancelled && (
            <CancelOrderButton orderId={order.id} />
          )}
        </div>
      )
    }
  </>;
}
