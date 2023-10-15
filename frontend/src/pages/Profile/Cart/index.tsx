import css from './index.module.css';
import { ProfileSubpage } from '../common/ProfileSubpage';
import { useCreateOrderMutation, useGetCartQuery } from '../../../redux/apis/productsApi';
import { CartItemCard } from '../../../components/CartItemCard';
import { Button } from '../../../components/Button';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Cart() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCartQuery();
  const [
    createOrder,
    { isLoading: isOrderCreationLoading },
  ] = useCreateOrderMutation();

  async function onOrderButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (data) {
      const result = await createOrder(data.map((cartItem) => ({
        variant: cartItem.variant.pk,
        amount: cartItem.amount,
      })));

      if ('error' in result) {
        toast('Произошла ошибка при создании заказа!', { type: 'error' });
      } else {
        toast('Заказ создан!', { type: 'success' });
      }
    }
  }

  const overallPrice = useMemo(
    () => data?.reduce((accum, cartItem) => {
      const price = cartItem.variant.price.sale_price || cartItem.variant.price.actual_price;
      return accum + price * cartItem.amount;
    }, 0),
    [data]
  );

  return (
    <ProfileSubpage
      heading='Корзина'
      empty='Корзина пуста'
      itemsCount={data?.length}
      isLoading={isLoading}
    >
      {data && (
        <div className={css.cartItems}>
          {data.map((cartItem) => <CartItemCard key={cartItem.id} {...cartItem} />)}

          <Button
            onClick={onOrderButtonClick}
            isLoading={isOrderCreationLoading}
            state={{ default: { text: `Оформить заказ (${overallPrice} ₽)`, icon: undefined } }}
          />
        </div>
      )}
    </ProfileSubpage>
  );
}
