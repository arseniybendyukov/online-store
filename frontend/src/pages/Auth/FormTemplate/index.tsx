import { Link } from 'react-router-dom';
import { NamedLink } from '../../../types/common';
import { ReactNode } from 'react';
import css from './index.module.css';

interface Props {
  heading: string;
  width: number;
  link?: NamedLink;
  children: ReactNode;
}

export const FormTemplate = ({
  heading,
  width,
  link,
  children,
}: Props) => (
  <div className={css.body} style={{ width }}>
    <div className={css.header}>
      <h2 className='h2'>{heading}</h2>
      {link && <Link to={link.path} className='link'>{link.name}</Link>}
    </div>
    {children}
  </div>
);
