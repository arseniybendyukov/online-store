import { ReactNode } from 'react';
import css from './index.module.css';

interface Props {
  heading: string;
  children: ReactNode;
}

export function SidebarSection({ heading, children }: Props) {
  return (
    <div className={css.section}>
      <h4 className={`h4 ${css.heading}`}>{heading}</h4>
      {children}
    </div>
  );
}
