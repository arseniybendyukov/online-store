import { Button } from '../Button';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import { ReactComponent as Check } from '../../images/check.svg';
import css from './index.module.css';
import { useToggleCart } from '../../redux/apis/productsApi';
import { useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';

interface Props {
  variantId: number;
  isInCart: boolean;
  isInStock: boolean;
  amount?: number;
}

export function AddToCartButton({
  variantId,
  isInCart,
  isInStock,
  amount=1,
}: Props) {
  const {
    toggleCart,
    isLoading,
  } = useToggleCart({ variantId, isInCart, amount });
  const user = useAppSelector((state) => state.userState.user);

  function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!isInCart && !isInStock) {
      toast('Нет в наличии', { type: 'error' });
    } else {
      if (user) {
        toggleCart();
      } else {
        toast('Войдите, чтобы пользоваться корзиной', { type: 'error' });
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
