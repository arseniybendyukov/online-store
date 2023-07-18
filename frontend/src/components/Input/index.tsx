import { HTMLProps } from 'react';
import css from './index.module.css';

interface Props extends HTMLProps<HTMLInputElement> {
  label: string;
  isTouched?: boolean;
  error?: string;
}

export function Input({
  label,
  type='text',
  isTouched,
  error,
  ...props
}: Props) {
  const isError = isTouched && error;

  return (
    <div>
      <div className={`${css.container} ${isError ? css.error : ''}`}>
        <input type={type} className={css.input} {...props} />
        <label className={css.label}>{label}</label>
      </div>
      {isError ? (
        <span className={css.errorText}>{error}</span>
      ) : null}
    </div>
  );
}
