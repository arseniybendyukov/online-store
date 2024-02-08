import { ProductPrice } from '../ProductPrice';
import { SavedProductVariant } from '../../types/data';
import { ReactComponent as Cross } from '../../images/cross.svg';
import css from './index.module.css';
import { ToggleCartButton } from '../ToggleCartButton';
import { Link } from 'react-router-dom';
import { NavPaths } from '../../navigation';
import { useRemoveFromSavedMutation } from '../../redux/api';
import { Spinner } from '../Spinner';
import { Label } from '../Label';
import { NotInStock } from '../NotInStock';

interface Props extends SavedProductVariant {}

export function SavedProductVariantCard({
  id,
  name,
  is_in_stock: isInStock,
  image,
  actual_price: actualPrice,
  sale_price: salePrice,
  percentage,
  cart_item_id: cartItemId,
  product: {
    id: productId,
    render_name: renderName,
  },
}: Props) {
  const [removeFromSaved, { isLoading }] = useRemoveFromSavedMutation();

  function onCrossClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    removeFromSaved({ variantId: id });
  }
  
  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${productId}?variant=${id}`}
      className={css.card}
    >
      <img src={image} alt='product' className={`${css.image} ${!isInStock ? 'greyImg' : ''}`} />

      <div className={css.major}>
        <div className={css.productProperties}>
          <h4 className={`h4 ${css.name} ${!isInStock ? css.notInStock : ''}`}>{renderName}</h4>
          <Label label='Вариант' gap={10}>{name}</Label>
        </div>

        <div className={css.minor}>
          <div className={css.stockState}>
            {
              isInStock
              ? (
                <ToggleCartButton
                  cartItemId={cartItemId}
                  variantId={id}
                  isInStock={isInStock}
                />
              )
              : (
                <NotInStock />
              )
            }
          </div>

          <div className={css.priceAndButton}>
            <ProductPrice
              actualPrice={actualPrice}
              salePrice={salePrice}
              isInStock={isInStock}
              oldPriceClassName={css.oldPrice}
              className={css.price}
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
        </div>
      </div>
    </Link>
  );
}
