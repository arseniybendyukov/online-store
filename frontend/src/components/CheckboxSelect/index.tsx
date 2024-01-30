import { SetState } from "../../types/common";
import { ReactComponent as Check } from '../../images/check.svg';
import css from './index.module.css';

interface CheckboxSelectOption {
  id: number;
  label: string;
}

interface Props {
  selectedIds: number[];
  setSelectedIds: SetState<number[]>;
  options: CheckboxSelectOption[];
}

export function CheckboxSelect({
  selectedIds,
  setSelectedIds,
  options,
}: Props) {
  function inputOnChange(id: number) {
    setSelectedIds(
      selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id]
    );
  }
  
  return (
    <div>
      {options.map((option) => (
        <label key={option.id} className={css.label}>
          <div className={css.checkboxWrapper}>
            <input
              className={css.checkbox}
              checked={selectedIds.includes(option.id)}
              onChange={() => inputOnChange(option.id)}
              value={option.id}
              name='checkbox'
              type='checkbox'
            />
            <Check className={css.checkSVG} />
          </div>
          {option.label}
        </label>
      ))}
    </div>
  );
}
