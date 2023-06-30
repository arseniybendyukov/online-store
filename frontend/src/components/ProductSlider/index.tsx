import { ListProduct } from '../../types/data';
import { ProductCard } from '../ProductCard';
import css from './index.module.css';

interface Props {
  products: ListProduct[];
}

export function ProductSlider({ products }: Props) {
  return (
    <div className={css.slider}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
