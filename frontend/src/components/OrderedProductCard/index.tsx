import { OrderedProduct } from '../../types/data';
import css from './index.module.css';
import { ProductPrice } from '../ProductPrice';

interface Props {
  orderedProduct: OrderedProduct;
  className?: string;
}

export const OrderedProductCard = ({ orderedProduct, className }: Props) => (
  <div className={`${css.orderedProduct} ${className ? className : ''}`}>
    <img src={orderedProduct.image} alt='product' />
    <p className={css.name}>{orderedProduct.name}</p>
    <div className={css.row}>
      <ProductPrice
        actualPrice={orderedProduct.actual_price}
        salePrice={orderedProduct.sale_price}
        oldPriceClassName={css.oldPrice}
      />
      <p className={css.amount}>{`${orderedProduct.amount} шт.`}</p>
    </div>
  </div>
);
