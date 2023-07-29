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

interface Props {
  product: ListProduct;
}

export function ProductCard({ product }: Props) {
  const toggleSaved = useToggleSaved(product.id, product.is_saved);

  function onHeartClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    toggleSaved();
  }

  const price = product.variants[0].price;

  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${product.id}`}
      className={css.product}
    >
      <div className={css.tags}>
        {product.tags.map((tag) => <Tag key={tag.id} name={tag.name} color={tag.color} />)}
      </div>
      <img src={product.image} alt='product' />
      <div className={css.text}>
        <p className={css.name}>{product.name}</p>
        <p className={css.category}>{product.subcategory.category.name}</p>
      </div>
      <RatingStars
        avgRating={product.avg_rating}
        reviewsCount={product.reviews_count}
      />
      <ProductPrice
        actualPrice={price.actual_price}
        salePrice={price.sale_price}
      />
      <div className={css.buttons}>
        <HeartButton
          onClick={onHeartClick}
          isActive={product.is_saved}
        />

        <AddToCartButton
          productId={product.id}
          productVariantId={product.variants[0].pk}
          isInCart={product.is_in_cart}
        />
      </div>
    </Link>
  );
}
