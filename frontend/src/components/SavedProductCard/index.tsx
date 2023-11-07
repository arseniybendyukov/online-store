import { ProductPrice } from '../ProductPrice';
import { SavedProduct } from '../../types/data';
import { ReactComponent as Cross } from '../../images/cross.svg';
import css from './index.module.css';
import { AddToCartButton } from '../AddToCartButton';
import { Link } from 'react-router-dom';
import { NavPaths } from '../../navigation';
import { useRemoveFromSavedMutation } from '../../redux/apis/productsApi';
import { Spinner } from '../Spinner';

interface Props extends SavedProduct {}

export function SavedProductCard({
  id,
  image,
  render_name,
  variants,
  is_in_cart: isInCart,
}: Props) {
  const [removeFromSaved, { isLoading }] = useRemoveFromSavedMutation();

  function onCrossClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    removeFromSaved({ id });
  }
  
  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${id}`}
      className={css.card}
    >
      <div className={css.majorInfo}>
        <img src={image} alt='product' className={css.image} />
        <h4 className='h4'>{render_name}</h4>
      </div>

      <AddToCartButton
        variantId={variants[0].id}
        isInCart={isInCart}
      />

      <div className={css.minorInfo}>
        <ProductPrice
          actualPrice={variants[0].actual_price}
          salePrice={variants[0].sale_price}
        />
        
        {
          isLoading
          ? <Spinner size={20} thickness={2} />
          : (
            <button onClick={onCrossClick}>
              <Cross className={css.crossSVG} />
            </button>
          )
        }
      </div>
    </Link>
  );
}
