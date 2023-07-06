import { ReactNode } from 'react';
import css from './index.module.css';

interface Props {
  label: string;
  gap?: number;
  children: ReactNode;
}

export function Label({ label, gap=5, children }: Props) {
  return (
    <div className={css.container} style={{ gap }}>
      <span className={css.label}>{label}:</span>
      <div className={css.children}>{children}</div>
    </div>
  );
}
