import css from './index.module.css';

interface Props {
  large?: boolean;
  actualPrice: number;
  salePrice: number | null;
  percentage?: number | null;
}

export function ProductPrice({
  large=false,
  actualPrice,
  salePrice,
  percentage,
}: Props) {
  const priceClassName = salePrice !== null
    ? css.salePrice
    : css.actualPrice;

  return (
    <div className={css.price}>
      <p className={`${priceClassName} ${large ? css.large : ''}`}>
        {salePrice !== null ? salePrice : actualPrice} ₽
      </p>
      {salePrice !== null && (
        <p className={css.oldPrice}>{actualPrice} ₽</p>
      )}
      {percentage && (
        <p className={css.percentage}>-{percentage}%</p>
      )}
    </div>
  );
}
