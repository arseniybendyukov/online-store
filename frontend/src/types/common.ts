import { Dispatch } from "react";

export const enum Colors {
  DARK_BLUE = 'var(--main-dark)',
  RED = 'var(--red)',
  WHITE = '#fff',
}

export type SetState<T extends any> = Dispatch<React.SetStateAction<T>>;

export interface NamedLink<P extends string = string> {
  path: P;
  name: string;
}
