import { Button } from '../Button';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import { ReactComponent as Check } from '../../images/check.svg';
import css from './index.module.css';
import { useToggleRemoteCart } from '../../redux/apis/productsApi';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';
import { toggleLocalCart } from '../../redux/slices/localCart';

interface Props {
  variantId: number;
  isInRemoteCart: boolean | null;
  isInStock: boolean;
  amount?: number;
}

export function AddToCartButton({
  variantId,
  isInRemoteCart,
  isInStock,
  amount=1,
}: Props) {
  const {
    toggleCart,
    isLoading,
  } = useToggleRemoteCart({ variantId, isInRemoteCart, amount });
  const user = useAppSelector((state) => state.userState.user);
  const localCart = useAppSelector((state) => state.localCartState.items);
  const dispatch = useAppDispatch();

  let isInCart: boolean;
  if (isInRemoteCart !== null) {
    isInCart = isInRemoteCart;
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
          icon: <ShoppingCart className={css.shoppingCartSVG} />,
        },
        active: {
          text: 'Добавлено',
          icon: <Check className={css.checkSVG} />,
        },
      }}
    />
  );
}
