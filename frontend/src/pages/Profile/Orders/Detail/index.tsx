import { useParams } from 'react-router-dom';
import css from './index.module.css';
import { useGetOrderDetailQuery } from '../../../../redux/api';
import { getOrderPrice, monthAndDayFromDate, toCurrency } from '../../../../utils/data';
import { OrderStages } from './OrderStages';
import { Label } from '../../../../components/Label';
import { OrderedProductCard } from '../../../../components/OrderedProductCard';
import { SpinnerScreen } from '../../../../components/SpinnerScreen';
import { OrderIsCancelled } from '../../../../components/OrderIsCancelled';
import { useEffect, useMemo, useState } from 'react';
import { CancelOrderButton } from './CancelOrderButton';
import { OrderPrice } from '../../../../components/OrderPrice';
import { PickupDetails } from '../../../../components/PickupDetails';
import { TBankPayform } from './TBankPayform';

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
  }, [order]);

  useEffect(() => {
    if (order && selectedStageId === null) {
      setSelectedStageId(
        (order.stages.find((stage) => !stage.is_done) || order.stages[0]).stage_type.id
      );
    }
  }, [order, selectedStageId, setSelectedStageId]);

  const promocodePrice = getOrderPrice(order)[1];

  return <>
    {
      isLoading
      ? <SpinnerScreen />
      : order && (
        <div className={css.container}>
          <div className={css.heading}>
            <h1 className='h1'>
              Ordered on {monthAndDayFromDate(order.created_at)}
            </h1>
            
            {order.approx_delivery_date && (
              <Label label='Estimated Delivery Date'>
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
                isPickup={order.is_pickup}
              />
            )
          }

          {order.is_pickup && <div>
            <h3 className='h3'>Pickup</h3>
            <PickupDetails />
          </div>}

          {selectedStage && !order.is_cancelled && (
            <div className={css.stageDescription}>
              <h3 className='h3'>Stage Details</h3>

              <p>{selectedStage.stage_type.description}</p>

              {selectedStage === currentStage && currentStage?.stage_type.is_payment_stage && (
                <div className={css.paymentContainer}>
                  <TBankPayform
                    amount={order.delivery_sum ? order.delivery_sum + promocodePrice : promocodePrice}
                    orderId={order.id}
                  />
                </div>
              )}
            </div>
          )}

          <section className={css.productsSection}>
            <div className={css.heading}>
              <h3 className='h3'>Товары ({ order.products.length })</h3>
              <OrderPrice order={order} />
              {order.delivery_sum && (
                <Label label='Delivery cost'>
                  {toCurrency(order.delivery_sum)}
                </Label>
              )}
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
