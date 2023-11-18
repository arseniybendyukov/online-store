import { Link } from 'react-router-dom';
import { OrderedProduct } from '../../types/data';
import css from './index.module.css';
import { NavPaths } from '../../navigation';
import { ProductPrice } from '../ProductPrice';

interface Props {
  orderedProduct: OrderedProduct;
}

export function OrderedProductCard({ orderedProduct }: Props) {
  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${orderedProduct.origin_variant.product}?variant=${orderedProduct.origin_variant.id}`}
      className={css.orderedProduct}
    >
      <img src={orderedProduct.image} alt='product' />
      <p className={css.name}>{orderedProduct.name}</p>
      <div className={css.row}>
        <ProductPrice
          actualPrice={orderedProduct.actual_price}
          salePrice={orderedProduct.sale_price}
        />
        <p className={css.amount}>{`${orderedProduct.amount} шт.`}</p>
      </div>
    </Link>
  );
}
