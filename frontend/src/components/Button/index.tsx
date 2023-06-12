import { Link } from "react-router-dom";
import { NavPaths } from "../../navigation";
import css from './index.module.css';
import { ReactNode } from "react";

interface Props {
  path: NavPaths;
  children: ReactNode;
}

export function Button({ path, children }: Props) {
  return <Link className={css.button} to={path}>{children}</Link>
}
