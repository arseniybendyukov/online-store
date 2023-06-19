import { ReactNode, HTMLProps } from 'react';
import { ReactComponent as Arrow } from '../../images/arrow.svg';
import css from './index.module.css';

export type SelectOption<V extends string = string> = {
  label: string;
  value: V;
}

type CommonProps = {
  icon: ReactNode;
  className?: string;
}

type InputProps = HTMLProps<HTMLInputElement> & CommonProps & {
  as: 'input';
  options?: never;
}

type SelectProps<V extends string = string> = HTMLProps<HTMLSelectElement> & CommonProps & {
  as: 'select';
  options: SelectOption<V>[];
}

export function IconField<V extends string = string>({
  icon,
  className,
  ...props
}: InputProps | SelectProps<V>) {
  return (
    <div className={className ? `${css.field} ${className}` : css.field}>
      <div className={css.icon}>{icon}</div>
      {props.as === 'input'
        ? <input className={css.input} type='text' {...props} />
        : <>
          <Arrow className={css.arrowSVG} />
          <select className={css.select} {...props}>
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </>
      }
    </div>
  );
}
