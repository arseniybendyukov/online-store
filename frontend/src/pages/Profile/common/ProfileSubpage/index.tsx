import { ReactNode } from 'react';
import css from './index.module.css';

interface Props {
  heading: string;
  itemsCount?: number;
  isLoading: boolean;
  children: ReactNode;
}

export function ProfileSubpage({
  heading,
  itemsCount,
  isLoading,
  children,
}: Props) {
  const pageHeading = itemsCount !== undefined ? `${heading} (${itemsCount})` : heading;

  return isLoading ? <>Загрузка...</> : (
    <div className={css.content}>
      <h1 className='h1'>{pageHeading}</h1>
      <div>{children}</div>
    </div>
  );
}
