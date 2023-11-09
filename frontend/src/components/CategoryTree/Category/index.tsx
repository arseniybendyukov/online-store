import { SetState } from '../../../types/common';
import { ReactComponent as Arrow } from '../../../images/arrow.svg';
import css from './index.module.css';

interface Props {
  id: number;
  name: string;
  count: number | null;
  setSelectedId: SetState<number | null>;
  isSelected: boolean;
  hasArrow: boolean;
}

export function Category({
  id,
  name,
  count,
  setSelectedId,
  isSelected,
  hasArrow,
}: Props) {
  return (
    <div
      className={`${css.category} ${isSelected ? css.selected : ''}`}
      onClick={() => setSelectedId(id)}
    >
      {
        count !== null
        ? `${name} (${count})`
        : name
      }

      {hasArrow && <Arrow className={css.arrowSVG} />}
    </div>
  );
}
