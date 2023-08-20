import { HTMLProps } from 'react';
import css from './index.module.css';

type Props<T extends 'input' | 'textarea'> = {
  identity?: T;
  label: string;
  isTouched?: boolean;
  error?: string;
} & (T extends 'input' ? HTMLProps<HTMLInputElement> : HTMLProps<HTMLTextAreaElement>);

export function Input<T extends 'input' | 'textarea'>({
  identity='input' as T,
  label,
  isTouched,
  error,
  ...props
}: Props<T>) {
  const isError = isTouched && error;

  return (
    <div>
      <div className={`${css.container} ${isError ? css.error : ''}`}>
        {
          identity === 'input'
          ? <input className={css.input} {...props as HTMLProps<HTMLInputElement>} />
          : <textarea className={css.input} {...props as HTMLProps<HTMLTextAreaElement>} />
        }
        <label className={css.label}>{label}</label>
      </div>
      {isError ? (
        <span className='error'>{error}</span>
      ) : null}
    </div>
  );
}
