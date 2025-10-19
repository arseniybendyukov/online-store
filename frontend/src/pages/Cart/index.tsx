import css from './index.module.css';
import { useCreateOrderMutation, useGetCartQuery, useGetLocalCartQuery } from '../../redux/api';
import { CartItemCard } from '../../components/CartItemCard';
import { Button } from '../../components/Button';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../redux/store';
import { CartItem, DeliveryInfo, Promocode } from '../../types/data';
import { SpinnerScreen } from '../../components/SpinnerScreen';
import { Link } from 'react-router-dom';
import { AuthNestedPaths, NavPaths } from '../../navigation';
import { CreateOrderModal } from './CreateOrderModal';
import { Colors } from '../../types/common';
import { CreateOrderPickupModal } from './CreateOrderPickupModal';

export function Cart() {
  const user = useAppSelector((state) => state.userState.user);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isPickupModalOpened, setIsPickupModalOpened] = useState(false);

  const [promocode, setPromocode] = useState<Promocode | null>(null);

  const localCart = useAppSelector((state) => state.localCartState.items);
  const {
    data: localCartData,
    isLoading: isLocalCartLoading,
  } = useGetLocalCartQuery({ items: localCart });

  const {
    data: remoteCartData,
    isLoading: isRemoteCartLoading,
  } = useGetCartQuery();

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);

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
            if (!deliveryInfo) {
              toast('Please select address and delivery method', { type: 'error' });
            } else {
              const result = await createOrder({
                ...deliveryInfo,
                products: remoteCartData.map((cartItem) => ({
                  origin_variant: cartItem.variant.id,
                  amount: cartItem.amount,
                })),
                promocode: promocode ? promocode.id : null,
                is_pickup: false,
              });            
        
              if ('error' in result) {
                toast('An error occurred while creating the order', { type: 'error' });
              } else {
                toast('Order created!', { type: 'success' });
              }
            }            
          } else {
            toast('There are items in your cart that are out of stock', { type: 'error' });
          }
        }
      } else {
        toast('Please log in to make an order', { type: 'error' });
      }
    },
    [user, hasNotInStockVariants, remoteCartData, deliveryInfo, promocode, createOrder],
  );

  const onCreatePickupOrderClick = useCallback(
    async function(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.preventDefault();

      if (user) {
        if (remoteCartData) {
          if (!hasNotInStockVariants) {
            const result = await createOrder({
              products: remoteCartData.map((cartItem) => ({
                origin_variant: cartItem.variant.id,
                amount: cartItem.amount,
              })),
              is_pickup: true,
            });
      
            if ('error' in result) {
              toast('An error occurred while creating the order', { type: 'error' });
            } else {
              toast('Order created!', { type: 'success' });
            }
                     
          } else {
            toast('There are items in your cart that are out of stock', { type: 'error' });
          }
        }
      } else {
        toast('Please log in to make an order', { type: 'error' });
      }
    },
    [user, hasNotInStockVariants, remoteCartData, deliveryInfo, promocode, createOrder],
  );

  const goodsPrice = useMemo(
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

  const goodsWeight = useMemo(
    () => data.reduce((accum, cartItem) => {
      if (cartItem.variant.is_in_stock) {
        return accum + cartItem.variant.weight;
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
                <h1 className='h1'>Cart ({data?.length})</h1>
                {data && (
                  <div className={css.cartItems}>
                    {data.map((cartItem) => <CartItemCard key={cartItem.variant.id} {...cartItem} />)}

                    {hasNotInStockVariants && (
                      <p className={css.notInStockNotification}>
                        There are items in your cart that are out of stock.
                        Their cost is not included in the total order amount.
                        Please remove these items from your cart to proceed with the order.
                      </p>
                    )}

                    {
                      user
                      ? (goodsPrice > 0 && <>
                        <Button
                          state={{ default: { text: 'Place Order for Delivery', icon: undefined } }}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpened(true)
                          }}
                        />

                        <Button
                          state={{ default: { text: 'Place Order for Pickup', icon: undefined } }}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPickupModalOpened(true)
                          }}
                          color={Colors.WHITE}
                          outlineColor={Colors.DARK_BLUE}
                          coloredBorder
                        />

                        <CreateOrderModal
                          goodsPrice={goodsPrice}
                          goodsWeight={goodsWeight}
                          onCreateOrderClick={onCreateOrderClick}
                          isOrderCreationLoading={isOrderCreationLoading}
                          isOpened={isModalOpened}
                          close={() => setIsModalOpened(false)}
                          remoteCartData={remoteCartData}
                          deliveryInfo={deliveryInfo}
                          setDeliveryInfo={setDeliveryInfo}
                          promocode={promocode}
                          setPromocode={setPromocode}
                        />

                        <CreateOrderPickupModal
                          goodsPrice={goodsPrice}
                          onCreateOrderClick={onCreatePickupOrderClick}
                          isOrderCreationLoading={isOrderCreationLoading}
                          isOpened={isPickupModalOpened}
                          close={() => setIsPickupModalOpened(false)}
                        />
                      </>) : (
                        <p className={css.notAuthorizedNotification}>
                          To make an order, please <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.LOGIN}`} className='link'>log in</Link> or <Link to={`${NavPaths.AUTH}/${AuthNestedPaths.REGISTRATION}`} className='link'>register a new account</Link>.
                        </p>
                      )
                    }
                  </div>
                )}
              </div>
              : <div className={`empty ${css.empty}`}>Cart is empty</div>
            }
          </>
        )
      }
    </div>
  );
}
