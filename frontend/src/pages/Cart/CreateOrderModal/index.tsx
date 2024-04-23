import { useEffect, useMemo } from 'react';
import { Button } from '../../../components/Button';
import { Information } from '../../../components/Information';
import { Modal } from '../../../components/Modal';
import { toCurrency, toKilos } from '../../../utils/data';
import css from './index.module.css';
import { CartItem } from '../../../types/data';

const DELIVERY_WEIGHT_COEFFICIENT = 0.5;
const PAYMENT_METHOD = 'наличными или картой при получении';

interface Props {
  overallPrice: number;
  overallWeight: number;
  onCreateOrderClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOrderCreationLoading: boolean;
  isOpened: boolean;
  close: () => void;
  remoteCartData: CartItem[] | undefined;
}

export function CreateOrderModal({
  overallPrice,
  overallWeight,
  onCreateOrderClick,
  isOrderCreationLoading,
  isOpened,
  close,
  remoteCartData,
}: Props) {
  const goods = useMemo(() => (remoteCartData || []).map((parcel) => ({
    width: 10,
    height: 10,
    length: 10,
    weight: parcel.variant.weight || 1500,
  })), [remoteCartData]);

  // @ts-ignore
  const widget = new window.CDEKWidget({
    from: {
      country_code: 'RU',
      city: 'Новосибирск',
      postal_code: 630091,
      code: 270,
      address: 'ул. Советская, д. 36/1',
    },
    root: 'cdek-map',
    apiKey: '428be7b8-9215-449f-bb9c-0e991a87d20e',
    servicePath: 'http://proffclean.market/service.php',
    hideDeliveryOptions: {
      pickup: true,
    },
    goods,
    defaultLocation: 'Новосибирск',
    tariffs: {
      office: [234, 136],
      door: [233],
    },
    onCalculate(...args: any[]) {
      console.log('Расчет стоимости доставки произведен');
      console.log(args);
    },
    onChoose(...args: any[]) {
      console.log('Доставка выбрана');
      console.log(args);
    },
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

  // Без этого внизу страницы спавнятся виджеты
  useEffect(() => {
    for (let el of document.getElementsByClassName('cdek-map')) {
      el.remove();
    }
  }, []);

  useEffect(() => {
    widget.resetParcels();
    widget.addParcel((remoteCartData || []).map((parcel) => ({
      width: 10,
      height: 10,
      length: 10,
      weight: parcel.variant.weight || 1500,
    })));
    console.log('updated!', widget.getParcels())
  }, [widget, remoteCartData]);

  console.log(widget.getParcels())

  return (
    <Modal
      heading='Оформление заказа'
      width={1200}
      isOpened={isOpened}
      close={close}
    >
      <div className={css.wrapper}>
        <div className={css.content}>
          <div id="cdek-map" style={{ height: 500 }} />
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
