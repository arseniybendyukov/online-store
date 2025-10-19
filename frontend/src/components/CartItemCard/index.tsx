import { ProductPrice } from '../ProductPrice';
import { CartVariant } from '../../types/data';
import { ReactComponent as Cross } from '../../images/cross.svg';
import { ReactComponent as Heart } from '../../images/heart.svg';
import css from './index.module.css';
import { Link } from 'react-router-dom';
import { NavPaths } from '../../navigation';
import { useRemoveFromCartMutation, useToggleSavedMutation, useUpdateCartAmountMutation } from '../../redux/api';
import { AmountInput } from '../AmountInput';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks';
import { Spinner } from '../Spinner';
import { Label } from '../Label';
import { NotInStock } from '../NotInStock';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../redux/store';
import { removeFromLocalCart, updateAmountInLocalCart } from '../../redux/slices/localCart';

interface Props {
  id?: number;
  amount: number;
  variant: CartVariant;
}

export function CartItemCard(props: Props) {
  const {
    id: cartItemId,
    amount,
    variant: {
      id: variantId,
      name: variantName,
      image,
      actual_price: actualPrice,
      sale_price: salePrice,
      is_saved: isSaved,
      is_in_stock: isInStock,
      product: {
        id: productId,
        render_name: productName,
      }
    },
  } = props;

  const [inputAmount, setInputAmount] = useState(amount);
  const debouncedAmount = useDebounce(inputAmount, 500);

  const [updateCartAmount] = useUpdateCartAmountMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cartItemId) {
      if (debouncedAmount !== amount) {
        updateCartAmount({ cartItemId, amount: debouncedAmount });
      }
    } else {
      dispatch(updateAmountInLocalCart({ variantId, amount: debouncedAmount }));
    }
  }, [debouncedAmount, cartItemId, amount, variantId, dispatch]);

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
    if (cartItemId) {
      toggleSaved({ variantId: variantId });
    } else {
      toast('Please log in to save products', { type: 'error' });
    }
  }

  function onCrossClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (cartItemId) {
      removeFromCart({ id: cartItemId });
    } else {
      dispatch(removeFromLocalCart({ variantId }));
    }
  }

  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${productId}`}
      className={css.card}
    >
      <img src={image} alt='product' className={`${css.image} ${!isInStock ? 'greyImg' : ''}`} />

      <div className={css.major}>
        <div className={css.productProperties}>
          <h4 className={`h4 ${css.name} ${!isInStock ? css.notInStock : ''}`}>{productName}</h4>
          <Label label='Option' gap={10}>{variantName}</Label>
        </div>

        <div className={css.minor}>
          <div className={css.stockState}>
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
          </div>


          <div className={css.priceAndButtons}>
            <ProductPrice
              actualPrice={isInStock ? actualPrice * amount : actualPrice}
              salePrice={isInStock ? salePrice ? salePrice * amount : null : salePrice}
              isInStock={isInStock}
              oldPriceClassName={css.oldPrice}
              className={css.price}
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
        </div>
      </div>
    </Link>
  );
}
