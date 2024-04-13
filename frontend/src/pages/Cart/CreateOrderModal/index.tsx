import { Button } from '../../../components/Button';
import { Information } from '../../../components/Information';
import { Modal } from '../../../components/Modal';
import { toCurrency, toKilos } from '../../../utils/data';
import css from './index.module.css';

const DELIVERY_WEIGHT_COEFFICIENT = 0.5;
const PAYMENT_METHOD = 'наличными или картой при получении';

interface Props {
  overallPrice: number;
  overallWeight: number;
  onCreateOrderClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOrderCreationLoading: boolean;
  isOpened: boolean;
  close: () => void;
}

export function CreateOrderModal({
  overallPrice,
  overallWeight,
  onCreateOrderClick,
  isOrderCreationLoading,
  isOpened,
  close,
}: Props) {
  // @ts-ignore
  new window.CDEKWidget({
    from: 'Новосибирск',
    root: 'cdek-map',
    apiKey: 'a63e0ddc-38ce-43b0-9d4e-d302c296712a',
    servicePath: 'http://proffclean.market/service.php',
    defaultLocation: 'Новосибирск'
  });
  
  const price = overallPrice + overallWeight * DELIVERY_WEIGHT_COEFFICIENT;
  
  const properties: Array<{ label: string, value: string, isBold?: boolean }> = [
    {
      label: 'Товары',
      value: toCurrency(overallPrice),
    },
    {
      label: 'Общий вес',
      value: toKilos(overallWeight),
    },
    {
      label: 'Доставка',
      value: toCurrency(overallWeight * DELIVERY_WEIGHT_COEFFICIENT),
    },
    {
      label: 'Итого',
      value: toCurrency(price),
      isBold: true,
    },
  ];

  return (
    <Modal
      heading='Оформление заказа'
      width={1200}
      isOpened={isOpened}
      close={close}
    >
      <div className={css.wrapper}>
        <div className={css.content}>
          <div id="cdek-map" style={{ width: 600, height: 600 }} />
        </div>
        <div className={css.side}>
          <div className={css.properties}>
            {properties.map(({ label, value, isBold }) => (
              <div key={label} className={`${css.property} ${isBold ? css.bold : ''}`}>
                <span>{label}</span>
                <span className={css.filler} />
                <span>{value}</span>
              </div>
            ))}
          </div>
          <Information text={`Способ оплаты: ${PAYMENT_METHOD}`} />
        </div>
      </div>

      <Button
        isLoading={isOrderCreationLoading}
        state={{ default: { text: `Оформить заказ (${toCurrency(price)})`, icon: undefined } }}
        onClick={onCreateOrderClick}
      />
    </Modal>
  );
}
