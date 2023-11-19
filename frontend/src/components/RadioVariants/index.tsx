import { SetState } from '../../types/common';
import { Variant } from '../../types/data';
import css from './index.module.css';

interface Props {
  options: Variant[];
  selectedVariantId: number | null;
  setSelectedVariantId: SetState<number | null>;
  shouldDisplayIsInStock?: boolean;
  isTouched?: boolean;
  error?: string;
}

export function RadioVariants({
  options,
  selectedVariantId,
  setSelectedVariantId,
  shouldDisplayIsInStock=true,
  isTouched,
  error,
}: Props) {
  const isError = isTouched && error;

  return (
    <div className={css.container}>
      {options.map((variant) => (
        <div
          key={variant.id}
          onClick={() => setSelectedVariantId(variant.id)}
          className={`${css.variant} ${variant.id === selectedVariantId ? css.selected : ''} ${shouldDisplayIsInStock && !variant.is_in_stock ? css.notInStock : ''}`}
        >
          {variant.name}
        </div>
      ))}
      
      {isError ? (
        <span className='error'>{error}</span>
      ) : null}
    </div>
  );
}
