import { SetState } from "../../types/common";
import { Checkbox } from "../Checkbox";

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
        <Checkbox
          key={option.id}
          label={option.label}
          checked={selectedIds.includes(option.id)}
          onChange={() => inputOnChange(option.id)}
        />
      ))}
    </div>
  );
}
