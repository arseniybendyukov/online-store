import { createRef } from 'react';
import css from './index.module.css';
import { EMAIL } from '../../../../../consts/data';
import { useAppSelector } from '../../../../../redux/store';
import { getFullName } from '../../../../../utils/data';

interface Props {
  amount: number;
  orderId: number;
}

export function TBankPayform({ amount, orderId }: Props) {
  const TPFRef = createRef<HTMLFormElement>();
  const user = useAppSelector((state) => state.userState.user);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const TPF = TPFRef.current;

    if (TPF) {
      if (user) {
        TPF.receipt.value = JSON.stringify({
          "EmailCompany": EMAIL,
          "Email": user.email,
          "Taxation": "patent",
          "Items": [
            {
              "Name": TPF.description.value,
              "Price": Math.round(amount * 100),
              "Quantity": 1.00,
              "Amount": Math.round(amount * 100),
              "PaymentMethod": "full_prepayment",
              "PaymentObject": "commodity",
              "Tax": "none",
              "MeasurementUnit": "pc"
            },
          ],
        });
      }

      // @ts-ignore
      window.pay(TPF);
    }
  }

  return user && (
    <form
      className={css.payformTbank}
      name="payform-tbank"
      id="payform-tbank"
      onSubmit={onSubmit}
      ref={TPFRef}
    >
      <input
        className={css.payformTbankRow}
        type="hidden"
        name="terminalkey"
        value={process.env.REACT_APP_TBANK_TERMINAL_KEY}
      />
      <input
        className={css.payformTbankRow}
        type="hidden"
        name="frame"
        value="true"
      />
      <input
        className={css.payformTbankRow}
        type="hidden"
        name="language"
        value="ru"
      />
      <input
        className={css.payformTbankRow}
        type="hidden"
        name="receipt"
        value=""
      />
      <input
        className={css.payformTbankRow}
        type="hidden"
        placeholder="Сумма заказа"
        name="amount"
        value={amount}
        required
      />
      <input
        className={css.payformTbankRow}
        type="hidden"
        placeholder="Номер заказа"
        name="order"
        value={orderId}
      />
      <input
        className={css.payformTbankRow}
        type="hidden"
        placeholder="Описание заказа"
        name="description"
        value={`Оплата Заказа №${orderId}`}
      />
      <input
        className={css.payformTbankRow}
        type="hidden"
        placeholder="ФИО плательщика"
        name="name"
        value={getFullName(user)}
      />
      <input
        className={css.payformTbankRow}
        type="hidden"
        placeholder="E-mail"
        name="email"
        value={user.email}
      />
      <input
        className={css.payformTbankRow}
        type="hidden"
        placeholder="Контактный телефон"
        name="phone"
        value={user.phone_number}
      />
      <input
        className={`${css.payformTbankRow} ${css.payformTbankBtn}`}
        type="submit"
        value="Оплатить"
      />
    </form>
  );
}
