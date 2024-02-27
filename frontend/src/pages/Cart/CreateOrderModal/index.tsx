import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import css from './index.module.css';

interface Props {
  overallPrice: number;
  onCreateOrderClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOrderCreationLoading: boolean;
  isOpened: boolean;
  close: () => void;
}

export function CreateOrderModal({
  overallPrice,
  onCreateOrderClick,
  isOrderCreationLoading,
  isOpened,
  close,
}: Props) {
  return (
    <Modal
      heading='Оформление заказа'
      width={1200}
      isOpened={isOpened}
      close={close}
    >
      <Button
        isLoading={isOrderCreationLoading}
        state={{ default: { text: `Оформить заказ (${overallPrice} ₽)`, icon: undefined } }}
        onClick={onCreateOrderClick}
      />
    </Modal>
  );
}
