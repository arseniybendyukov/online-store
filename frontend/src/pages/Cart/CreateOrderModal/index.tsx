import { useEffect, useMemo, useState } from 'react';
import { Button } from '../../../components/Button';
import { Information } from '../../../components/Information';
import { Modal } from '../../../components/Modal';
import { toCurrency, toKilos } from '../../../utils/data';
import css from './index.module.css';
import { CartItem, DeliveryInfo, Promocode } from '../../../types/data';
import { DeliveryType, Tariff, OfficeAddress, DoorAddress } from '../../../types/cdek';
import { SetState } from '../../../types/common';
import { PDFDocumentsPaths } from '../../../navigation';
import { Checkbox } from '../../../components/Checkbox';
import { PromocodeInput } from './PromocodeInput/input';

const PAYMENT_METHOD = 'наличными или картой при получении';

interface Props {
  goodsPrice: number;
  goodsWeight: number;
  onCreateOrderClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isOrderCreationLoading: boolean;
  isOpened: boolean;
  close: () => void;
  remoteCartData: CartItem[] | undefined;
  deliveryInfo: DeliveryInfo | null;
  setDeliveryInfo: SetState<DeliveryInfo | null>;
  promocode: Promocode | null;
  setPromocode: SetState<Promocode | null>;
}

export function CreateOrderModal({
  goodsPrice,
  goodsWeight,
  onCreateOrderClick,
  isOrderCreationLoading,
  isOpened,
  close,
  remoteCartData,
  deliveryInfo,
  setDeliveryInfo,
  promocode,
  setPromocode,
}: Props) {
  const [agreed, setArgeed] = useState(true);

  const deliverySum = deliveryInfo?.delivery_sum;
  const promocodeGoodsPrice = promocode ? goodsPrice * (100 - promocode.percentage) / 100 : goodsPrice;
  const overallPrice = promocodeGoodsPrice + (deliverySum || 0);
  
  const goods = useMemo(() => (remoteCartData || []).map((parcel) => ({
    width: parcel.variant.width,
    height: parcel.variant.height,
    length: parcel.variant.length,
    weight: parcel.variant.weight,
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
    servicePath: 'https://proffclean.market/service.php',
    goods,
    defaultLocation: 'Новосибирск',
    tariffs: {
      office: [234, 136],
      door: [233, 137],
    },
    forceFilters: {
      type: 'PVZ',
    },
    onChoose<T extends DeliveryType>(
      deliveryType: T,
      tariff: Tariff,
      address: T extends DeliveryType.OFFICE ? OfficeAddress : DoorAddress,
    ) {
      let formattedAddress: string;

      if (deliveryType === 'office') {
        formattedAddress = `${address.city}, ${address.address!}`;
      } else {
        formattedAddress = address.formatted!;
      }

      setDeliveryInfo({
        tariff: tariff.tariff_name,
        delivery_sum: tariff.delivery_sum,
        address: formattedAddress,
      });
    },
  });

  const properties: Array<{ label: string, value: string, isBold?: boolean }> = useMemo(() => [
    {
      label: 'Товары',
      value: (
        promocode
        ? `${toCurrency(promocodeGoodsPrice)} (-${promocode.percentage}%)`
        : toCurrency(goodsPrice)
      ),
    },
    {
      label: 'Общий вес',
      value: toKilos(goodsWeight),
    },
    {
      label: 'Доставка',
      value: deliverySum ? toCurrency(deliverySum) : '-',
    },
    {
      label: 'Итого',
      value: toCurrency(overallPrice),
      isBold: true,
    },
  ], [goodsPrice, goodsWeight, deliverySum, promocode, promocodeGoodsPrice]);

  // Без этого внизу страницы спавнятся виджеты
  useEffect(() => {
    for (let el of document.getElementsByClassName('cdek-map')) {
      el.remove();
    }
  }, []);

  return (
    <Modal
      heading='Оформление заказа'
      width={1200}
      isOpened={isOpened}
      close={close}
    >
      <div className={css.wrapper}>
        <div className={css.content}>
          <div id='cdek-map' className={css.cdek} />
        </div>
        <div className={css.side}>
          <PromocodeInput
            setPromocode={setPromocode}
          />

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
        state={{ default: { text: `Оформить заказ (${toCurrency(overallPrice)})`, icon: undefined } }}
        disabled={!agreed}
        onClick={onCreateOrderClick}
      />
    </Modal>
  );
}
