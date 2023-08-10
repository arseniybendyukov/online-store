import css from './index.module.css';
import { ProfileSubpage } from '../common/ProfileSubpage';
import { useCreateOrderMutation, useGetCartQuery } from '../../../redux/apis/productsApi';
import { CartItemCard } from '../../../components/CartItemCard';
import { Button } from '../../../components/Button';

export function Cart() {
  const { data, isLoading } = useGetCartQuery();
  const [createOrder] = useCreateOrderMutation();

  function onOrderButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (data) {
      createOrder(data.map((cartItem) => ({
        variant: cartItem.variant.pk,
        amount: cartItem.amount,
      })));
    }
  }

  return (
    <ProfileSubpage
      heading='Корзина'
      itemsCount={data?.length}
      isLoading={isLoading}
    >
      {data && <>
        <div className={css.cartItems}>
          {data.map((cartItem) => <CartItemCard key={cartItem.id} {...cartItem} />)}
        </div>

        {data.length > 0 && (
          <Button
            onClick={onOrderButtonClick}
            state={{ default: { text: 'Заказать', icon: undefined } }}
          />
        )}
      </>}
    </ProfileSubpage>
  );
}
