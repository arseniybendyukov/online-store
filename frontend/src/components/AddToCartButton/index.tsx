import { Button } from '../Button';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import { ReactComponent as Check } from '../../images/check.svg';
import css from './index.module.css';

interface Props {
  id: number;
  isActive: boolean;
}

export const AddToCartButton = ({ id, isActive }: Props) => (
  <Button onClick={(e) => { e.preventDefault() }} isActive={isActive} state={{
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
