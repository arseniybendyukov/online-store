import { Link } from 'react-router-dom';
import { OrderedProduct } from '../../types/data';
import css from './index.module.css';
import { NavPaths } from '../../navigation';
import { ProductPrice } from '../ProductPrice';

interface Props {
  orderedProduct: OrderedProduct;
}

export function OrderedProductCard({ orderedProduct }: Props) {
  const {
    id: orderedProductId,
    amount,
    variant: {
      price,
      product: {
        id: productId,
        render_name: name,
        image,
      },
    },
  } = orderedProduct;

  return (
    <Link
      to={`${NavPaths.PRODUCT_DETAIL}/${productId}`}
      className={css.orderedProduct}
    >
      <img src={image} alt='product' />
      <p className={css.name}>{name}</p>
      <div className={css.row}>
        <ProductPrice
          actualPrice={price.actual_price}
          salePrice={price.sale_price}
        />
        <p className={css.amount}>{`${amount} шт.`}</p>
      </div>
    </Link>
  );
}
