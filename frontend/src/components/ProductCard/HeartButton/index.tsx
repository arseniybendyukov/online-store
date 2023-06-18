import { ReactComponent as Heart } from '../../../images/heart.svg';
import { Colors } from '../../../types/common';
import css from './index.module.css';

interface Props {
  onClick: () => void;
  isActive: boolean;
}

export const HeartButton = ({ isActive, onClick }: Props) => (
  <button className={css.body} onClick={onClick}>
    <Heart style={{ fill: isActive ? Colors.RED : 'none' }} />
  </button>
);
