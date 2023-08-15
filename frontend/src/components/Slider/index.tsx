import { ReactNode, useId } from 'react';
import css from './index.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { ReactComponent as Arrow } from '../../images/arrow.svg';

interface Props {
  items: ReactNode[];
  slidesPerView?: number;
  insideArrows?: boolean;
}

export function Slider({
  items,
  slidesPerView=4,
  insideArrows=false,
}: Props) {
  const nextArrowId = useId();
  const prevArrowId = useId();

  return (
    <div className={`${css.wrapper} ${insideArrows ? css.inside : ''}`}>
      <Swiper
        className={css.swiper}
        slidesPerView={slidesPerView}
        slidesPerGroup={4}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={{
          nextEl: `[id="${nextArrowId}"]`,
          prevEl: `[id="${prevArrowId}"]`,
          disabledClass: css.disabled,
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>

      <div className={`${css.arrow} ${css.next} ${insideArrows ? css.inside : css.outside}`} id={nextArrowId}><Arrow /></div>
      <div className={`${css.arrow} ${css.prev} ${insideArrows ? css.inside : css.outside}`} id={prevArrowId}><Arrow /></div>
    </div>
  );
}
