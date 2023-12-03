import { Link } from 'react-router-dom';
import { ListProduct, Variant } from '../../types/data';
import { Tag } from '../Tag';
import { RatingStars } from '../RatingStars';
import { ProductPrice } from '../ProductPrice';
import { HeartButton } from './HeartButton';
import css from './index.module.css';
import { NavPaths } from '../../navigation';
import { AddToCartButton } from '../AddToCartButton';
import { useToggleSavedMutation } from '../../redux/apis/productsApi';
import { Spinner } from '../Spinner';
import { useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';
import { getRootCategory } from '../../utils/data';
import { NotInStock } from '../NotInStock';

interface Props {
  product: ListProduct;
}

export function ProductCard({ product }: Props) {
  // todo: сделать слайдер вариантов, чтобы is_saved и is_in_cart показывались не для всего продукта
  const [
    toggleSaved,
    { isLoading: isToggleSaveLoading},
  ] = useToggleSavedMutation();

  const user = useAppSelector((state) => state.userState.user);

  const inStockVariants = product.variants.filter((variant) => variant.is_in_stock);
  const isProductInStock = !!inStockVariants.length;

  let shownVariant: Variant
  if (inStockVariants.length) {
    shownVariant = inStockVariants[0];
  } else {
    shownVariant = product.variants[0];
  }

  function onHeartClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (user) {
      toggleSaved({ variant_id: shownVariant.id });
    } else {
      toast('Войдите, чтобы сохранять товары', { type: 'error' });
    }
  }

  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${product.id}`}
      className={css.product}
    >
      <div className={css.tags}>
        {product.tags.map((tag) => <Tag key={tag.id} name={tag.name} color={tag.color} />)}
      </div>
      <img src={shownVariant.image} alt={product.render_name} />
      <div className={css.text}>
        <p className={css.name}>{product.render_name}</p>
        <p className={css.category}>{getRootCategory(product.category)}</p>
      </div>
      <RatingStars
        avgRating={product.avg_rating}
        reviewsCount={product.reviews_count}
      />
      <ProductPrice
        actualPrice={shownVariant.actual_price}
        salePrice={shownVariant.sale_price}
      />
      {
        isProductInStock
        ? (
          <div className={css.buttons}>
            {
              isToggleSaveLoading
              ? <Spinner size={40} thickness={3} />
              : (
                <HeartButton
                  onClick={onHeartClick}
                  isActive={shownVariant.is_saved}
                />
              )
            }

            <AddToCartButton
              variantId={shownVariant.id}
              isInRemoteCart={shownVariant.is_in_cart}
              isInStock={shownVariant.is_in_stock}
            />
          </div>
        )
        : (
          <NotInStock />
        )
      }
    </Link>
  );
}
