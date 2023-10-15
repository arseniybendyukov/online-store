import css from './index.module.css';

interface Props {
  sizeType: 'small' | 'medium' | 'large';
  image: string | null;
  initials: string;
  color: string;
}

export function CircleAvatar({ sizeType, image, initials, color }: Props) {
  let size;
  let fontSize;
  switch (sizeType) {
    case 'small':
      size = 50;
      fontSize = 18;
      break;
    case 'medium':
      size = 100;
      fontSize = 36;
      break;
    case 'large':
      size = 190;
      fontSize = 56;
      break;
  }

  return (
    <div
      className={`ibg ${css.circle}`}
      style={{
        background: color,
        width: size,
        height: size,
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
            {initials}
          </span>
        )
      }
    </div>
  );
}
