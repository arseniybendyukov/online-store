import { ProductPrice } from '../ProductPrice';
import { CartItem } from '../../types/data';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { ReactComponent as Heart } from '../../images/heart.svg';
import css from './index.module.css';
import { Link } from 'react-router-dom';
import { NavPaths } from '../../navigation';
import { useRemoveFromCartMutation, useToggleSaved, useUpdateCartAmountMutation } from '../../redux/apis/productsApi';
import { AmountInput } from '../AmountInput';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks';
import { Spinner } from '../Spinner';
import { Label } from '../Label';

interface Props extends CartItem {}

export function CartItemCard(cartItem: Props) {
  const {
    id: cartItemId,
    amount,
    variant: {
      pk: variantId,
      name: variantName,
      price,
      product: {
        id: productId,
        render_name: productName,
        is_saved: isSaved,
        image,
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

  const {
    toggleSaved,
    isLoading: isToggleSaveLoading,
  } = useToggleSaved(productId, isSaved);

  function onHeartClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    toggleSaved();
  }

  function onCrossClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    removeFromCart({ variantId });
  }

  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${productId}`}
      className={css.card}
    >
      <div className={css.majorInfo}>
        <img src={image} alt='product' className={css.image} />
        <div className={css.productProperties}>
          <h4 className='h4'>{productName}</h4>
          <Label label='Вариант' gap={10}>{variantName}</Label>
        </div>
      </div>

      <div onClick={(e) => e.preventDefault()}>
        <AmountInput
          amount={inputAmount}
          setAmount={setInputAmount}
        />
      </div>

      <div className={css.minorInfo}>
        <ProductPrice
          actualPrice={price.actual_price * amount}
          salePrice={price.sale_price ? price.sale_price * amount : null}
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
