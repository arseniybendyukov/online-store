import { ADDRESS } from '../../consts/data';
import css from './index.module.css';

export function HowToBuy() {
  return (
    <div className={`container ${css.container}`}>
      <h2 className={`h2 ${css.heading}`}>Delivery Terms</h2>

      <ol className={css.deliveryMethods}>
        <li>
          <h4 className='h4'>Delivery Across Russia</h4>
          <p>
            Our store delivers orders via CDEK, PEK, and Energia courier services to pick-up points or directly to your door. 
            Delivery cost depends on the package size and weight. 
            The exact cost is calculated during checkout according to the courier company's rates. 
            Shipments are made within 1-2 days after placing an order. Same-day shipping is possible.
          </p>
          <p>
            Minimum order amount: 
            CDEK – any amount, 
            PEK and Energia – from 5,000 RUB.
          </p>
        </li>
        <li>
          <h4 className='h4'>Delivery in Novosibirsk</h4>
          <p>
            Delivery within Novosibirsk is carried out by our couriers or via Yandex Delivery on the day the order is placed. 
            Delivery cost is charged separately depending on your location.
          </p>
        </li>
        <li>
          <h4 className='h4'>Pickup</h4>
          <p>
            You can also pick up your order at our store at: {ADDRESS}. 
            Please contact our managers in advance to confirm the availability of the desired items and reserve them. 
            Reservation for unpaid orders: 1 business day.
          </p>
        </li>
      </ol>

      <strong className={css.strong}>
        Shipment via courier services or transport companies is made only after full payment of your order.
      </strong>

      <h2 className={`h2 ${css.heading}`}>Payment Methods</h2>
      <ol className={css.deliveryMethods}>
        <li>Cash or card upon pickup</li>
        <li>Payment via bank transfer</li>
        <li>Payment on the website with a bank card, SberPay, or SBP.</li>
      </ol>
    </div>
  );
}
