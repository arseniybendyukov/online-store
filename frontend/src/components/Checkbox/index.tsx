import { ReactNode } from 'react';
import { ReactComponent as Check } from '../../images/check.svg';
import css from './index.module.css';

interface Props {
  label: ReactNode;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function Checkbox({
  label,
  checked,
  onChange,
}: Props) {  
  return (
    <label className={css.label}>
      <div className={css.checkboxWrapper}>
        <input
          className={css.checkbox}
          checked={checked}
          onChange={onChange}
          name='checkbox'
          type='checkbox'
        />
        <Check className={css.checkSVG} />
      </div>
      {label}
    </label>
  );
}
