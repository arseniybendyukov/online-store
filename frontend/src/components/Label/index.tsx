import { ReactNode } from 'react';
import css from './index.module.css';

interface Props {
  label: string;
  children: ReactNode;
}

export function Label({ label, children }: Props) {
  return (
    <div className={css.container}>
      <span className={css.label}>{label}:</span>
      <div className={css.children}>{children}</div>
    </div>
  );
}
