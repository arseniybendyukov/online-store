import { ReactNode, useId } from 'react';
import css from './index.module.css';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { ReactComponent as Arrow } from '../../images/arrow.svg';

interface Props extends SwiperProps {
  items: ReactNode[];
  insideArrows?: boolean;
  className?: string;
}

export function Slider({
  items,
  slidesPerView=4,
  slidesPerGroup=4,
  insideArrows=false,
  className,
  ...props
}: Props) {
  const nextArrowId = useId();
  const prevArrowId = useId();

  return (
    <div className={`${css.wrapper} ${insideArrows ? css.inside : ''} ${className ? className : ''}`}>
      <Swiper
        className={css.swiper}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerGroup}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={{
          nextEl: `[id="${nextArrowId}"]`,
          prevEl: `[id="${prevArrowId}"]`,
          disabledClass: css.disabled,
        }}
        {...props}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>

      <div
        id={nextArrowId}
        className={`${css.arrow} ${css.next} ${insideArrows ? css.inside : css.outside}`}
      >
        <Arrow />
      </div>
      <div
        className={`${css.arrow} ${css.prev} ${insideArrows ? css.inside : css.outside}`}
        id={prevArrowId}
      >
        <Arrow />
      </div>
    </div>
  );
}
