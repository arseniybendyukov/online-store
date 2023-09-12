import { ReactNode } from 'react';
import css from './index.module.css';
import { Link } from 'react-router-dom';

interface Props {
  heading: string;
  path?: string;
  children: ReactNode;
}

export function FooterBlock({
  heading,
  path,
  children,
}: Props) {
  return (
    <div className={css.block}>
      {
        path
        ? <Link to={path} className={`h3 ${css.heading}`}>{heading}</Link>
        : <h3 className={`h3 ${css.heading}`}>{heading}</h3>
      }
      {children}
    </div>
  );
}
