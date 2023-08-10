import { ReactNode, useId } from 'react';
import css from './index.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { ReactComponent as Arrow } from '../../images/arrow.svg';

interface Props {
  items: ReactNode[];
}

export function ProductSlider({ items }: Props) {
  const nextArrowId = useId();
  const prevArrowId = useId();

  return (
    <div className={css.wrapper}>
      <Swiper
        className={css.swiper}
        slidesPerView={4}
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

      <div className={`${css.arrow} ${css.next}`} id={nextArrowId}><Arrow /></div>
      <div className={`${css.arrow} ${css.prev}`} id={prevArrowId}><Arrow /></div>
    </div>
  );
}
