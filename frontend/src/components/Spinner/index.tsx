import { CSSProperties } from 'react';
import css from './index.module.css';
import { Colors } from '../../types/common';

export interface Props {
  size?: number;
  thickness?: number;
  color?: CSSProperties['color'];
}

export function Spinner({
  size=60,
  thickness=5,
  color=Colors.DARK_BLUE,
}: Props) {
  return (
    <div
      className={css.spinner}
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid`,
        borderColor: `${color} transparent`,
      }}
    />
  );
}
