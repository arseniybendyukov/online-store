import { SetState } from '../../types/common';
import { Variant } from '../../types/data';
import css from './index.module.css';

interface Props {
  options: Variant[];
  selectedVariant: Variant | null;
  setSelectedVariantId: SetState<number | null>;
  isTouched?: boolean;
  error?: string;
}

export function RadioVariants({
  options,
  selectedVariant,
  setSelectedVariantId,
  isTouched,
  error,
}: Props) {
  const isError = isTouched && error;

  return (
    <div className={css.container}>
      {options.map((variant) => (
        <div
          key={variant.price.id}
          onClick={() => setSelectedVariantId(variant.pk)}
          className={`${css.variant} ${variant === selectedVariant ? css.selected : ''}`}
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
