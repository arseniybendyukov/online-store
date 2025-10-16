import { OrderedProduct } from '../../types/data';
import css from './index.module.css';
import { ProductPrice } from '../ProductPrice';
import { Button } from '../Button';
import { useState } from 'react';
import { CreateReviewModalForm } from '../../components/CreateReviewModalForm';

interface Props {
  orderedProduct: OrderedProduct;
  className?: string;
  showCreateReviewButton?: boolean;
}

export function OrderedProductCard({
  orderedProduct,
  className,
  showCreateReviewButton=false,
}: Props) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  
  return <>
    <div className={`${css.orderedProduct} ${className ? className : ''}`}>
      <img src={orderedProduct.image} alt='product' />
      <p className={css.name}>{orderedProduct.name}</p>
      <div className={css.row}>
        <ProductPrice
          actualPrice={orderedProduct.actual_price}
          salePrice={orderedProduct.sale_price}
          oldPriceClassName={css.oldPrice}
        />
        <p className={css.amount}>{`${orderedProduct.amount} pcs`}</p>
      </div>

      {showCreateReviewButton && orderedProduct.is_review_allowed && orderedProduct.origin_variant && (
        <Button
          className={css.reviewButton}
          state={{
            default: {
              text: 'Write a review',
              icon: undefined,
            }
          }}
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpened(true)
          }}
        />
      )}
    </div>
    
    {showCreateReviewButton && orderedProduct.origin_variant && (
      <CreateReviewModalForm
        isOpened={isModalOpened}
        close={() => setIsModalOpened(false)}
        variantId={orderedProduct.origin_variant.id}
      />
    )}
  </>;
}
