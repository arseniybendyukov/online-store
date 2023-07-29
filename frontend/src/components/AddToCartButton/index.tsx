import { Button } from '../Button';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import { ReactComponent as Check } from '../../images/check.svg';
import css from './index.module.css';
import { useToggleCart } from '../../redux/apis/productsApi';

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
  const toggleCart = useToggleCart({ productId, productVariantId, isInCart, amount });

  function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    toggleCart();
  }

  return (
    <Button onClick={onClick} isActive={isInCart} state={{
      default: {
        text: 'В корзину',
        icon: <ShoppingCart className={css.shoppingCartSVG} />,
      },
      active: {
        text: 'Добавлено',
        icon: <Check className={css.checkSVG} />,
      },
    }} />
  );
}
