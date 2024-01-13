import { ReactNode } from 'react';
import css from './index.module.css';
import { Spinner } from '../../../../components/Spinner';

interface Props {
  heading: string;
  isLoading?: boolean;
  children: ReactNode;
}

export function Section({
  heading,
  isLoading=false,
  children,
}: Props) {
  return (
    <div className={css.section}>
      <div className={css.row}>
        <h4 className='h4'>{heading}</h4>
        {isLoading && <Spinner size={20} thickness={2} />}
      </div>
      {children}
    </div>
  );
}
