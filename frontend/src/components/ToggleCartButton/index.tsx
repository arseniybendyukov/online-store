import { Button } from '../Button';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';
import { addToLocalCart, removeFromLocalCart, toggleLocalCart } from '../../redux/slices/localCart';
import { useState } from 'react';
import { AmountModal } from './AmountModal';
import { useAddToCartMutation, useRemoveFromCartMutation } from '../../redux/api';

interface Props {
  cartItemId: number | null;
  variantId: number;
  isInStock: boolean;
}

export function ToggleCartButton({
  cartItemId,
  variantId,
  isInStock,
}: Props) {
  const [addToCart, { isLoading: isAddLoading }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemoveLoading }] = useRemoveFromCartMutation();

  const isLoading = isAddLoading || isRemoveLoading;
  
  const user = useAppSelector((state) => state.userState.user);
  const localCart = useAppSelector((state) => state.localCartState.items);
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState(1);
  const [isModalOpened, setIsModalOpened] = useState(false);

  let isInCart: boolean;
  if (user) {
    isInCart = cartItemId !== null;
  } else {
    isInCart = localCart.some((item) => item.variantId === variantId);
  }

  function onModalOpen(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!isInCart && !isInStock) {
      toast('Нет в наличии', { type: 'error' });
    } else {
      if (!isInCart) {
        setIsModalOpened(true);
      } else {
        if (user) {
          removeFromCart({ id: cartItemId! });
        } else {
          dispatch(removeFromLocalCart({ variantId }));
        }
      }
    }
  }

  function onAdd() {
    if (user) {
      addToCart({ variant: variantId, amount });
    } else {
      dispatch(addToLocalCart({ variantId, amount }));
    }
    setIsModalOpened(false);
  }

  if (!isInStock) {
    return (
      <span>Невозможно добавить в корзину</span>
    );
  }

  return <>
    <Button
      onClick={onModalOpen}
      isLoading={isLoading}
      isActive={isInCart}
      state={{
        default: {
          text: 'В корзину',
          icon: undefined,
        },
        active: {
          text: 'Добавлено',
          icon: undefined,
        },
      }}
    />

    <AmountModal
      isOpened={isModalOpened}
      close={() => setIsModalOpened(false)}
      amount={amount}
      setAmount={setAmount}
      onClick={onAdd}
    />
  </>;
}
