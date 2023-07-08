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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  outlineColor?: Colors;
}

type Props = ButtonProps | LinkProps;

export function Button({
  color = Colors.BLUE,
  outlineColor = Colors.WHITE,
  ...props
}: Props) {  
  if (props.path) {
    return (
      <Link to={props.path}>
        <Content color={color} outlineColor={outlineColor} {...props} />
      </Link>
    );
  } else {
    return (
      <button onClick={props.onClick}>
        <Content color={color} outlineColor={outlineColor} {...props} />
      </button>
    );
  }
}

const Content = (props: Props & { color: Colors, outlineColor: Colors }) => (
  <div
    className={css.button}
    style={{
      background: props.isActive ? props.outlineColor : props.color,
      borderColor: props.isActive ? props.color : props.outlineColor,
    }}
  >
    <div
      className={css.text}
      style={{ color: props.isActive ? props.color : props.outlineColor }}
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
