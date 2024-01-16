import css from './index.module.css';

interface Props {
  large?: boolean;
  actualPrice: number;
  salePrice: number | null;
  percentage?: number | null;
  isInStock?: boolean;
  oldPriceClassName?: number;
  className?: string;
}

export function ProductPrice({
  large=false,
  actualPrice,
  salePrice,
  percentage,
  isInStock=true,
  oldPriceClassName,
  className,
}: Props) {
  const priceClassName = salePrice === null
    ? css.actualPrice
    : css.salePrice;

  return (
    <div className={`${css.price} ${className ? className : ''}`}>
      <p className={`${priceClassName} ${large ? css.large : ''} ${!isInStock ? css.notInStock : ''}`}>
        {salePrice !== null ? salePrice : actualPrice} ₽
      </p>
      {isInStock && salePrice !== null && (
        <p className={`${css.oldPrice} ${oldPriceClassName ? oldPriceClassName : ''}`}>
          {actualPrice} ₽
        </p>
      )}
      {isInStock && percentage && (
        <p className={css.percentage}>-{percentage}%</p>
      )}
    </div>
  );
}
