import { Spinner, Props as SpinnerProps } from '../Spinner';
import { CSSProperties } from 'react';
import css from './index.module.css';

interface Props extends SpinnerProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export function SpinnerScreen({
  width='auto',
  height='100%',
  ...props
}: Props) {
  return (
    <div style={{ width, height }} className={css.container}>
      <Spinner {...props} />
    </div>
  );
}
