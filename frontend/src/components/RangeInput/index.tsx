import { HTMLProps } from 'react';
import { MinMax } from '../../types/data';
import { SetState } from '../../types/common';
import css from './index.module.css';

interface Props extends MinMax {
  setMin: SetState<number>;
  setMax: SetState<number>;
}

export function RangeInput({ min, max, setMin, setMax }: Props) {
  return (
    <div className={css.container}>
      <Input value={min} setValue={setMin} />
      <span className={css.devider}></span>
      <Input value={max} setValue={setMax} />
    </div>
  );
}

interface InputProps extends HTMLProps<HTMLInputElement> {
  value: number;
  setValue: SetState<number>;
}

function Input({ value, setValue, ...props }: InputProps) {
  return (
    <input
      type='number'
      className={css.input}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      {...props}
    />
  );
}
