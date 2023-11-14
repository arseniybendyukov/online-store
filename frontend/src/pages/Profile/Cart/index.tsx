import css from './index.module.css';
import { ProfileSubpage } from '../common/ProfileSubpage';
import { useCreateOrderMutation, useGetCartQuery } from '../../../redux/apis/productsApi';
import { CartItemCard } from '../../../components/CartItemCard';
import { Button } from '../../../components/Button';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

export function Cart() {
  const { data=[], isLoading } = useGetCartQuery();
  const [
    createOrder,
    { isLoading: isOrderCreationLoading },
  ] = useCreateOrderMutation();

  const hasNotInStockVariants = useMemo(
    () => data?.some((cartItem) => !cartItem.variant.is_in_stock),
    [data]
  );

  const onOrderButtonClick = useCallback(
    async function(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();
      if (data) {
        if (!hasNotInStockVariants) {
          const result = await createOrder(data.map((cartItem) => ({
            origin_variant: cartItem.variant.id,
            amount: cartItem.amount,
          })));
    
          if ('error' in result) {
            toast('Произошла ошибка при создании заказа', { type: 'error' });
          } else {
            toast('Заказ создан!', { type: 'success' });
          }
        } else {
          toast('В корзине есть товары, которых нет в наличии', { type: 'error' });
        }
      }
    },
    [data],
  );

  const overallPrice = useMemo(
    () => data.reduce((accum, cartItem) => {
      if (cartItem.variant.is_in_stock) {
        const price = cartItem.variant.sale_price || cartItem.variant.actual_price;
        return accum + price * cartItem.amount;
      } else {
        return accum;
      }
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

          {hasNotInStockVariants && (
            <p className={css.notification}>
              В корзине есть товары, которых нет в наличии.
              Их стоимость не учитывается при вычислении общей суммы заказа.
              Удалите эти товары из корзины, чтобы оформить заказ.
            </p>
          )}


          {overallPrice > 0 && (
            <Button
              onClick={onOrderButtonClick}
              isLoading={isOrderCreationLoading}
              state={{ default: { text: `Оформить заказ (${overallPrice} ₽)`, icon: undefined } }}
            />
          )}
        </div>
      )}
    </ProfileSubpage>
  );
}
