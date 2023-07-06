import { Link } from 'react-router-dom';
import { ListProduct } from '../../types/data';
import { Tag } from '../Tag';
import { RatingStars } from '../RatingStars';
import { ProductPrice } from '../ProductPrice';
import { HeartButton } from './HeartButton';
import css from './index.module.css';
import { NavPaths, paramPath } from '../../navigation';
import { AddToCartButton } from '../AddToCartButton';

interface Props {
  product: ListProduct;
}

export function ProductCard({ product }: Props) {
  const price = product.variants[0].price;

  return (
    <Link
      to={paramPath(NavPaths.PRODUCT_DETAIL, product.id)}
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
        <HeartButton onClick={(e) => { e.preventDefault() }} isActive={false} />
        <AddToCartButton id={product.id} isActive={false} />
      </div>
    </Link>
  );
}
