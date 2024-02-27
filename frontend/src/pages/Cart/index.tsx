import css from './index.module.css';
import { useCreateOrderMutation, useGetCartQuery, useGetLocalCartQuery } from '../../redux/api';
import { CartItemCard } from '../../components/CartItemCard';
import { Button } from '../../components/Button';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/store';
import { CartItem } from '../../types/data';
import { SpinnerScreen } from '../../components/SpinnerScreen';
import { Link } from 'react-router-dom';
import { AuthNestedPaths, NavPaths } from '../../navigation';
import { CreateOrderModal } from './CreateOrderModal';

export function Cart() {
  const user = useAppSelector((state) => state.userState.user);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const localCart = useAppSelector((state) => state.localCartState.items);
  const {
    data: localCartData,
    isLoading: isLocalCartLoading,
  } = useGetLocalCartQuery({ items: localCart });

  const {
    data: remoteCartData,
    isLoading: isRemoteCartLoading,
  } = useGetCartQuery();

  let data: (CartItem | Omit<CartItem, 'id'>)[];
  if (user) {
    if (remoteCartData) {
      data = remoteCartData;
    } else {
      data = [];
    }
  } else {
    if (localCartData) {
      data = localCart.map(({ variantId, amount }) => ({
        variant: localCartData.find((variant) => variant.id === variantId)!,
        amount,
      }));
    } else {
      data = [];
    }
  }

  let isLoading: boolean;
  if (user) {
    isLoading = isRemoteCartLoading;
  } else {
    isLoading = isLocalCartLoading;
  }

  const [
    createOrder,
    { isLoading: isOrderCreationLoading },
  ] = useCreateOrderMutation();

  const hasNotInStockVariants = useMemo(
    () => data.some((cartItem) => !cartItem.variant.is_in_stock),
    [data]
  );

  const onCreateOrderClick = useCallback(
    async function(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();

      if (user) {
        if (remoteCartData) {
          if (!hasNotInStockVariants) {
            const result = await createOrder(remoteCartData.map((cartItem) => ({
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
      } else {
        toast('Войдите, чтобы сделать заказ', { type: 'error' });
      }
    },
    [remoteCartData],
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
    <div className={`container ${css.container}`}>
      {
        isLoading
        ? <SpinnerScreen height={400} />
        : (
          <>
            {
              data?.length
              ? <div className={css.content}>
                <h1 className='h1'>Корзина ({data?.length})</h1>
                {data && (
                  <div className={css.cartItems}>
                    {data.map((cartItem) => <CartItemCard key={cartItem.variant.id} {...cartItem} />)}

                    {hasNotInStockVariants && (
                      <p className={css.notInStockNotification}>
                        В корзине есть товары, которых нет в наличии.
                        Их стоимость не учитывается при вычислении общей суммы заказа.
                        Удалите эти товары из корзины, чтобы оформить заказ.
                      </p>
                    )}

                    {
                      user
                      ? (overallPrice > 0 && <>
                        <Button
                          state={{ default: { text: 'Оформить заказ', icon: undefined } }}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpened(true)
                          }}
                        />

                        <CreateOrderModal
                          overallPrice={overallPrice}
                          onCreateOrderClick={onCreateOrderClick}
                          isOrderCreationLoading={isOrderCreationLoading}
                          isOpened={isModalOpened}
                          close={() => setIsModalOpened(false)}
                        />
                      </>) : (
                        <p className={css.notAuthorizedNotification}>
                          Чтобы создать заказ, <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`} className='link'>войдите</Link> или <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.REGISTRATION}`} className='link'>зарегистрируйтесь</Link>.
                        </p>
                      )
                    }
                  </div>
                )}
              </div>
              : <div className={`empty ${css.empty}`}>Корзина пуста</div>
            }
          </>
        )
      }
    </div>
  );
}
