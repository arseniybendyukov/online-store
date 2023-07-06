import { ReactNode } from 'react';
import css from './index.module.css';

interface Props {
  title: string;
  children: ReactNode;
}

export const HoverTitle = ({ title, children }: Props) => (
  <div className={css.container}>
    <div className={css.title}>
      {title}
    </div>
    <div className={css.children}>
      {children}
    </div>
  </div>
);
