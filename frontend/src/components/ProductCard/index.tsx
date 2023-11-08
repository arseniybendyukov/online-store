import { Link } from 'react-router-dom';
import { ListProduct } from '../../types/data';
import { Tag } from '../Tag';
import { RatingStars } from '../RatingStars';
import { ProductPrice } from '../ProductPrice';
import { HeartButton } from './HeartButton';
import css from './index.module.css';
import { NavPaths } from '../../navigation';
import { AddToCartButton } from '../AddToCartButton';
import { useToggleSaved } from '../../redux/apis/productsApi';
import { Spinner } from '../Spinner';
import { useAppSelector } from '../../redux/store';
import { toast } from 'react-toastify';

interface Props {
  product: ListProduct;
}

export function ProductCard({ product }: Props) {
  const { toggleSaved, isLoading } = useToggleSaved(product.id, product.is_saved);
  const user = useAppSelector((state) => state.userState.user);

  function onHeartClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (user) {
      toggleSaved();
    } else {
      toast('Войдите, чтобы сохранять товары', { type: 'error' });
    }
  }

  const firstVariant = product.variants[0];

  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${product.id}`}
      className={css.product}
    >
      <div className={css.tags}>
        {product.tags.map((tag) => <Tag key={tag.id} name={tag.name} color={tag.color} />)}
      </div>
      <img src={product.image} alt={product.render_name} />
      <div className={css.text}>
        <p className={css.name}>{product.render_name}</p>
        <p className={css.category}>{product.subcategory.category.name}</p>
      </div>
      <RatingStars
        avgRating={product.avg_rating}
        reviewsCount={product.reviews_count}
      />
      <ProductPrice
        actualPrice={firstVariant.actual_price}
        salePrice={firstVariant.sale_price}
      />
      <div className={css.buttons}>
        {
          isLoading
          ? <Spinner size={40} thickness={3} />
          : (
            <HeartButton
              onClick={onHeartClick}
              isActive={product.is_saved}
            />
          )
        }

        <AddToCartButton
          variantId={product.variants[0].id}
          isInCart={product.is_in_cart}
        />
      </div>
    </Link>
  );
}
