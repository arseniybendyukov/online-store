import { Product } from '../../types/data';
import { Tag } from '../Tag';
import { RatingStars } from '../RatingStars';
import { ProductPrice } from '../ProductPrice';
import { HeartButton } from './HeartButton';
import { Button } from '../Button';
import { ReactComponent as ShoppingCart } from '../../images/shopping-cart.svg';
import { ReactComponent as Check } from '../../images/check.svg';
import css from './index.module.css';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const price = product.variants[0].price;

  const switchSaved = () => {};
  const switchAddedToCart = () => {};

  return (
    <div className={css.product}>
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
        <HeartButton onClick={switchSaved} isActive={false} />
        <Button onClick={switchAddedToCart} isActive={false} state={{
          default: {
            text: 'В корзину',
            icon: <ShoppingCart className={css.shoppingCartSVG} />,
          },
          active: {
            text: 'Добавлено',
            icon: <Check className={css.checkSVG} />,
          },
        }} />
      </div>
    </div>
  );
}
