import { ProductPrice } from '../ProductPrice';
import { CartItem } from '../../types/data';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { ReactComponent as Heart } from '../../images/heart.svg';
import css from './index.module.css';
import { Link } from 'react-router-dom';
import { NavPaths } from '../../navigation';
import { useRemoveFromCartMutation, useToggleSavedMutation, useUpdateCartAmountMutation } from '../../redux/apis/productsApi';
import { AmountInput } from '../AmountInput';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks';
import { Spinner } from '../Spinner';
import { Label } from '../Label';
import { NotInStock } from '../NotInStock';

interface Props extends CartItem {}

export function CartItemCard(cartItem: Props) {
  const {
    id: cartItemId,
    amount,
    variant: {
      id: variantId,
      name: variantName,
      image,
      actual_price: actualPrice,
      sale_price: salePrice,
      percentage,
      is_saved: isSaved,
      is_in_stock: isInStock,
      product: {
        id: productId,
        render_name: productName,
      }
    },
  } = cartItem;

  const [inputAmount, setInputAmount] = useState(amount);
  const debouncedAmount = useDebounce(inputAmount, 500);

  const [updateCartAmount] = useUpdateCartAmountMutation();

  useEffect(() => {
    if (inputAmount !== amount) {
      updateCartAmount({ cartItemId, amount: debouncedAmount });
    }
  }, [debouncedAmount]);

  const [
    removeFromCart,
    { isLoading: isRemoveLoading },
  ] = useRemoveFromCartMutation();

  const [
    toggleSaved,
    { isLoading: isToggleSaveLoading},
  ] = useToggleSavedMutation();

  function onHeartClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    toggleSaved({ variant_id: variantId });
  }

  function onCrossClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    removeFromCart({ variant_id: variantId });
  }

  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${productId}`}
      className={css.card}
    >
      <div className={css.majorInfo}>
        <img src={image} alt='product' className={`${css.image} ${!isInStock ? 'greyImg' : ''}`} />
        <div className={css.productProperties}>
          <h4 className={`h4 ${!isInStock ? css.notInStock : ''}`}>{productName}</h4>
          <Label label='Вариант' gap={10}>{variantName}</Label>
        </div>
      </div>

      {
        isInStock
        ? (
          <AmountInput
          amount={inputAmount}
          setAmount={setInputAmount}
        />
        )
        : (
          <NotInStock />
        )
      }

      <div className={css.minorInfo}>
        <ProductPrice
          actualPrice={isInStock ? actualPrice * amount : actualPrice}
          salePrice={isInStock ? salePrice ? salePrice * amount : null : salePrice}
          isInStock={isInStock}
        />

        <div className={css.buttons}>
          {
            isToggleSaveLoading
            ? <Spinner size={40} thickness={3} />
            : (
              <button onClick={onHeartClick}>
                <Heart className={`${css.heartSVG} ${isSaved ? css.active : ''}`} />
              </button>
            )
          }

          {
            isRemoveLoading
            ? <Spinner size={20} thickness={2} />
            : (
              <button onClick={onCrossClick}>
                <Cross className={css.crossSVG} />
              </button>
            )
          }
        </div>
      </div>
    </Link>
  );
}
