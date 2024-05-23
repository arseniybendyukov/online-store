import { Button } from '../Button';
import { useToggleRemoteCart } from '../../redux/api';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';
import { toggleLocalCart } from '../../redux/slices/localCart';

interface Props {
  cartItemId: number | null;
  variantId: number;
  isInStock: boolean;
  amount?: number;
}

export function ToggleCartButton({
  cartItemId,
  variantId,
  isInStock,
  amount=1,
}: Props) {
  const {
    toggleCart,
    isLoading,
  } = useToggleRemoteCart({ cartItemId, variantId, amount });
  const user = useAppSelector((state) => state.userState.user);
  const localCart = useAppSelector((state) => state.localCartState.items);
  const dispatch = useAppDispatch();

  let isInCart: boolean;
  if (user) {
    isInCart = cartItemId !== null;
  } else {
    isInCart = localCart.some((item) => item.variantId === variantId);
  }

  function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!isInCart && !isInStock) {
      toast('Нет в наличии', { type: 'error' });
    } else {
      if (user) {
        toggleCart();
      } else {
        dispatch(toggleLocalCart({ variantId, amount }));
      }
    }
  }

  if (!isInStock) {
    return (
      <span>Невозможно добавить в корзину</span>
    );
  }

  return (
    <Button
      onClick={onClick}
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
  );
}
