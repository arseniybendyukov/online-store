import { Button } from '../Button';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import { ReactComponent as Check } from '../../images/check.svg';
import css from './index.module.css';
import { useToggleCart } from '../../redux/apis/productsApi';
import { useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';

interface Props {
  productId: number;
  productVariantId: number;
  isInCart: boolean;
  amount?: number;
}

export function AddToCartButton({
  productId,
  productVariantId,
  isInCart,
  amount=1,
}: Props) {
  const {
    toggleCart,
    isLoading,
  } = useToggleCart({ productId, productVariantId, isInCart, amount });
  const user = useAppSelector((state) => state.userState.user);

  function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (user) {
      toggleCart();
    } else {
      toast('Войдите, чтобы пользоваться корзиной', { type: 'error' })
    }
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
