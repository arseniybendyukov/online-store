import { SetState } from '../../types/common';
import { Variant } from '../../types/data';
import css from './index.module.css';

interface Props {
  options: Variant[];
  selectedVariant: Variant | null;
  setSelectedVariant: SetState<Variant | null>;
}

export function RadioVariants({
  options,
  selectedVariant,
  setSelectedVariant,
}: Props) {
  return (
    <div className={css.container}>
      {options.map((variant) => (
        <div
          key={variant.price.id}
          onClick={() => setSelectedVariant(variant)}
          className={`${css.variant} ${variant === selectedVariant ? css.selected : ''}`}
        >
          {variant.name}
        </div>
      ))}
    </div>
  );
}
