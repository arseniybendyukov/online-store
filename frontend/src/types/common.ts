import { Dispatch } from "react";

export const enum Colors {
  BLUE = 'var(--main-1)',
  RED = 'var(--red)',
}

export type SetState<T extends any> = Dispatch<React.SetStateAction<T>>;
