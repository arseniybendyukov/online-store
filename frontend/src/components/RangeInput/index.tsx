import { HTMLProps } from 'react';
import { SetState } from '../../types/common';
import css from './index.module.css';

interface Props {
  min: number | null;
  max: number | null;
  setMin: SetState<number | null>;
  setMax: SetState<number | null>;
}

export function RangeInput({ min, max, setMin, setMax }: Props) {
  return (
    <div className={css.container}>
      <label htmlFor='min-price' className={css.label}>От</label>
      <label htmlFor='max-price' className={css.label}>До</label>
    
      {
        min
        ? (
          <Input
            id='min-price'
            min='1'
            value={min}
            setValue={(value: number) => setMin(Math.max(Number(value), 1))}
          />
        ) : (
          <div className={css.empty}></div>
        )
      }

      {
        max
        ? (
          <Input
            id='max-price'
            min='1'
            value={max}
            setValue={(value: number) => setMax(Math.max(Number(value), 1))}
          />
        ) : (
          <div className={css.empty}></div>
        )
      }
    </div>
  );
}

interface InputProps extends HTMLProps<HTMLInputElement> {
  value: number;
  setValue: (value: number) => void;
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
