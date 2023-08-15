import { ReactNode } from 'react';
import css from './index.module.css';

interface Props {
  heading: string;
  empty: string;
  itemsCount?: number;
  isLoading: boolean;
  children: ReactNode;
}

export function ProfileSubpage({
  heading,
  empty,
  itemsCount,
  isLoading,
  children,
}: Props) {
  const pageHeading = itemsCount ? `${heading} (${itemsCount})` : heading;

  return isLoading ? <>Загрузка...</> : (
    <div className={css.content}>
      {
        itemsCount
        ? <>
          <h1 className='h1'>{pageHeading}</h1>
          <div>{children}</div>
        </>
        : <div className={css.empty}>{empty}</div>
      }
    </div>
  );
}
