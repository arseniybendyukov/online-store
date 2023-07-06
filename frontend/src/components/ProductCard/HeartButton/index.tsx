import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import { ReactComponent as Heart } from '../../../images/heart.svg';
import { Colors } from '../../../types/common';
import css from './index.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const HeartButton = ({ isActive, ...props }: Props) => (
  <button className={css.body} {...props}>
    <Heart style={{ fill: isActive ? Colors.RED : 'none' }} />
  </button>
);
