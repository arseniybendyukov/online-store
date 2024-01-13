import { ReactNode, HTMLProps } from 'react';
import { ReactComponent as ArrowDown } from '../../images/arrow.svg';
import css from './index.module.css';

type CommonProps = {
  icon: ReactNode;
  className?: string;
}

type InputProps = HTMLProps<HTMLInputElement> & CommonProps & {
  as: 'input';
  options?: never;
  text?: never;
}

type SelectProps<V extends string = string> = HTMLProps<HTMLSelectElement> & CommonProps & {
  as: 'select';
  options: SelectOption<V>[];
  text?: never;
}

export type SelectOption<V extends string = string> = {
  label: string;
  value: V;
}

type ButtonProps = HTMLProps<HTMLButtonElement> & CommonProps & {
  as: 'button';
  options?: never;
  text: string;
}


export function IconFormElement<V extends string = string>({
  icon,
  className,
  ...props
}: InputProps | SelectProps<V> | ButtonProps) {
  return (
    <div className={className ? `${css.container} ${className}` : css.container}>
      <div className={css.icon}>{icon}</div>
      {
        props.as === 'input'
        ? <input className={css.input} type='text' {...props} />
        : props.as === 'select'
        ? <>
          <select className={css.select} {...props}>
            {props.options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <ArrowDown className={css.arrowSVG} />
        </>
        : (
          <button className={css.button} onClick={props.onClick}>
            {props.text}
          </button>
        )
      }
    </div>
  );
}
