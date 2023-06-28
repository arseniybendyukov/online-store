import { ReactNode } from 'react';
import css from './index.module.css';

interface Props {
  heading: string;
  children: ReactNode;
}

export function FooterBlock({ heading, children }: Props) {
  return (
    <div className={css.block}>
      <h3 className={`h3 ${css.heading}`}>{heading}</h3>
      {children}
    </div>
  );
}
