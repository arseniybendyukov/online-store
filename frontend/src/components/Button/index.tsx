import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../../types/common';
import css from './index.module.css';
import { Spinner } from '../Spinner';

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
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

type DefaultButton = CommonButtonProps & {
  isActive?: never;
  state: DefaultState;
}

type ActiveButton = CommonButtonProps & {
  isActive?: boolean;
  state: ActiveState;
}

type ButtonProps = CommonProps & (DefaultButton | ActiveButton);

// Типы для ссылки
type LinkProps = CommonProps & {
  isActive?: never;
  state: DefaultState;
  path: string;
  isLoading?: never;
  onClick?: never;
  type?: never;
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
      <button onClick={props.onClick} type={props.type} disabled={!!props.isLoading}>
        <Content color={color} outlineColor={outlineColor} {...props} />
      </button>
    );
  }
}

function Content(props: Props & { color: Colors, outlineColor: Colors }) {
  let mainColor;
  let secondaryColor;

  if (!props.isActive) {
    mainColor = props.color;
    secondaryColor = props.outlineColor;
  } else {
    mainColor = props.outlineColor;
    secondaryColor = props.color;
  }

  return (
    <div
      className={css.button}
      style={{
        background: mainColor,
        borderColor: secondaryColor,
      }}
    >
      <div
        className={css.text}
        style={{ color: secondaryColor }}
      >
        {
          props.isLoading
          ? (
            <Spinner
              size={20}
              thickness={3}
              color={secondaryColor}
            />
          )
          : props.isActive
          ? props.state.active.text
          : props.state.default.text
        }
      </div>

      {!props.isLoading && (
        <div className={css.icon}>
          {
            props.isActive
            ? props.state.active.icon
            : props.state.default.icon
          }
        </div>
      )}
    </div>
  );
}
