import css from './index.module.css';

interface Props {
  size: 'small' | 'medium' | 'large';
  image: string | null;
  initials: string;
  color: string;
}

export function CircleAvatar({ size, image, initials, color }: Props) {
  let circleSize;
  let fontSize;
  switch (size) {
    case 'small':
      circleSize = 50;
      fontSize = 18;
      break;
    case 'medium':
      circleSize = 100;
      fontSize = 36;
      break;
    case 'large':
      circleSize = 190;
      fontSize = 56;
      break;
  }

  return (
    <div
      className={`ibg ${css.circle}`}
      style={{
        background: color,
        width: circleSize,
        height: circleSize,
      }}
    >
      {
        image
        ? <img src={image} alt='avatar' className={css.image} />
        : (
          <span
            className={css.initials}
            style={{ fontSize }}
          >
            {initials.toUpperCase()}
          </span>
        )
      }
    </div>
  );
}
