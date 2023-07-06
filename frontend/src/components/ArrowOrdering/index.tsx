import { SetState } from '../../types/common';
import { ReactComponent as Arrow } from '../../images/long-arrow.svg'
import css from './index.module.css';

export interface OrderingParam<P extends string> {
  param: P;
  isDesc: boolean;
  isReversed: boolean;
}

interface Option<P extends string> {
  param: P;
  isDesc: boolean;
  name: string;
}

export const paramToString = <P extends string>({
  param,
  isReversed,
  isDesc,
}: OrderingParam<P>) => (
  `${(isDesc ? !isReversed : isReversed) ? '-' : ''}${param}`
);

interface Props<P extends string> {
  value: OrderingParam<P>;
  setValue: SetState<OrderingParam<P>>;
  options: Option<P>[];
}

export function ArrowOrdering<P extends string>({
  value,
  setValue,
  options,
}: Props<P>) {
  function optionOnClick(option: Option<P>) {
    setValue((prevValue) => {
      if (prevValue.param === option.param) {
        return {
          ...prevValue,
          isReversed: !prevValue.isReversed,
        };
      } else {
        return {
          param: option.param,
          isDesc: option.isDesc,
          isReversed: false,
        };
      }
    });
  }

  return (
    <div className={css.container}>
      {options.map((option) => (
        <div
          key={option.param}
          onClick={() => optionOnClick(option)}
          className={`${css.option} ${value.param === option.param ? css.active : ''}`}
        >
          <span className={css.name}>
            {option.name}
          </span>
          <span className={`${css.arrow} ${value.isReversed ? css.reversed : ''}`}>
            <Arrow className={css.arrowSVG} />
          </span>
        </div>
      ))}
    </div>
  );
}
