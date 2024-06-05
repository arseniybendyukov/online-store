import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { toCurrency } from '../../../utils/data';

import { PDFDocumentsPaths } from '../../../navigation';
import { Checkbox } from '../../../components/Checkbox';
import { Label } from '../../../components/Label';
import { ADDRESS, SCHEDULE } from '../../../consts/data';
import { PickupDetails } from '../../../components/PickupDetails';

interface Props {
  goodsPrice: number;
  onCreateOrderClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOrderCreationLoading: boolean;
  isOpened: boolean;
  close: () => void;
}

export function CreateOrderPickupModal({
  goodsPrice,
  onCreateOrderClick,
  isOrderCreationLoading,
  isOpened,
  close,
}: Props) {
  const [agreed, setArgeed] = useState(true);

  return (
    <Modal
      heading='Самовывоз'
      width={600}
      isOpened={isOpened}
      close={close}
    >
      <PickupDetails />
      
      <Checkbox
        label={
          <span>
            Я принимаю условия <a href={PDFDocumentsPaths.OFERTA} className='link'>оферты</a>
          </span>
        }
        checked={agreed}
        onChange={() => setArgeed((prev) => !prev)}
      />

      <Button
        isLoading={isOrderCreationLoading}
        state={{ default: { text: `Оформить заказ (${toCurrency(goodsPrice)})`, icon: undefined } }}
        disabled={!agreed}
        onClick={onCreateOrderClick}
      />
    </Modal>
  );
}
