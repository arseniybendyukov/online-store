import { Spinner } from '../../../../../components/Spinner';
import { useCancelOrderMutation } from '../../../../../redux/apis/productsApi';
import css from './index.module.css';

interface Props {
  orderId: number;
}

export function CancelOrderButton({ orderId }: Props) {
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();

  function onButtonClick() {
    cancelOrder({ id: orderId });
  }

  return <>
    {
      isLoading
      ? (
        <Spinner color='red' size={40} thickness={3} />
      ) : (
        <button
          className={css.button}
          onClick={onButtonClick}
        >
          Отменить заказ
        </button>
      )
    }
  </>;
}
