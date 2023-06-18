import css from './index.module.css';

interface Props {
  actualPrice: number;
  salePrice: number | null;
}

export function ProductPrice({ actualPrice, salePrice }: Props) {
  return (
    <div className={css.price}>
      <p className={
        salePrice !== null
        ? css.salePrice
        : css.actualPrice
      }>
        {salePrice !== null ? salePrice : actualPrice} ₽
      </p>
      {salePrice !== null && (
        <p className={css.oldPrice}>{actualPrice} ₽</p>
      )}
    </div>
  );
}
