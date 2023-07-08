import { ListProduct } from '../../types/data';
import { ProductCard } from '../ProductCard';
import css from './index.module.css';

// todo: сделать слайдер

interface Props {
  products: ListProduct[];
  slidable?: boolean;
}

export function ProductSlider({ products, slidable=true }: Props) {
  return (
    <div className={css.slider}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
