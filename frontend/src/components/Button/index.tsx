import { ReactNode } from 'react';
import { Link } from "react-router-dom";
import { NavPaths } from "../../navigation";
import { Colors } from '../../types/common';
import css from './index.module.css';

// Состояния при isActive
type ButtonState<T extends boolean, I extends boolean> = {
  text: T extends true ? string : never | undefined;
  icon: I extends true ? ReactNode : never | undefined;
}

type DefaultState = {
  default: ButtonState<true, false> | ButtonState<true, true>;
  active?: never;
}

type ActiveState = {
  default: ButtonState<true, false> | ButtonState<true, true>;
  active: ButtonState<true, false> | ButtonState<true, true>;
}

// Типы для кнопки
type CommonButtonProps = {
  path?: never;
  onClick: () => void;
}

type DefaultButton = CommonButtonProps & {
  isActive?: never;
  state: DefaultState;
}

type ActiveButton = CommonButtonProps & {
  isActive: boolean;
  state: ActiveState;
}

type ButtonProps = CommonProps & (DefaultButton | ActiveButton);

// Типы для ссылки
type LinkProps = CommonProps & {
  isActive?: never;
  state: DefaultState;
  path: NavPaths;
  onClick?: never;
}

// Общие стили и итоговые props
type CommonProps = {
  color?: Colors;
}

type Props = ButtonProps | LinkProps;

export function Button({ color = Colors.BLUE, ...props }: Props) {  
  if (props.path) {
    return (
      <Link to={props.path}>
        <Content color={color} {...props} />
      </Link>
    );
  } else {
    return (
      <button onClick={props.onClick}>
        <Content color={color} {...props} />
      </button>
    );
  }
}

const Content = (props: Props & { color: Colors }) => (
  <div
    className={css.button}
    style={{
      background: props.isActive ? '#fff' : props.color,
      borderColor: props.isActive ? props.color : 'transparent',
    }}
  >
    <div
      className={css.text}
      style={{ color: props.isActive ? props.color : '#fff' }}
    >
      {props.isActive
        ? props.state.active.text
        : props.state.default.text
      }
    </div>

    <div className={css.icon}>
      {props.isActive
        ? props.state.active.icon
        : props.state.default.icon
      }
    </div>
  </div>
);
