import { Button } from '../../../components/Button';
import { NavPaths } from '../../../navigation';
import { Colors } from '../../../types/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import pylesos from '../../../images/pylesos.png';
import pipidastr from '../../../images/pipidastr.png';
import pshykalka from '../../../images/pshykalka.png';
import css from './index.module.css';

interface Bullet {
  name: string;
  img: string;
}

const slides: Bullet[] = [
  {
    name: 'For Dry Cleaning',
    img: pylesos,
  },
  {
    name: 'Cleaning',
    img: pipidastr,
  },
  {
    name: '& Home',
    img: pshykalka,
  },
];

export const Banner = () => (
  <section className={css.banner}>
    <div className={css.content}>
      <div id='containerForBullets' className={css.bullets} />
      <div className={css.main}>
        <div className={css.text}>
          <h1 className={`h1 ${css.h1}`}>Professional&nbsp;chemicals</h1>
          <p className={css.paragraph}>
            Our company offers a wide range of professional chemicals and equipment from well-known international and russian manufacturers
            <span className={css.highlighted}> with delivery in Novosibirsk and across Russia</span>
          </p>
        </div>
        <div className={css.buttons}>
          <Button
            path={NavPaths.CATALOG}
            state={{ default: { text: 'Go to Catalog', icon: undefined } }}
            className={css.button}
            isBig
          />
          <Button
            path={NavPaths.CONTACTS}
            state={{ default: { text: 'Contact Us', icon: undefined } }}
            color={Colors.WHITE}
            outlineColor={Colors.DARK_BLUE}
            className={css.button}
            coloredBorder
            isBig
          />
        </div>
      </div>
    </div>
    
    <Swiper
      className={css.swiper}
      autoplay={{ delay: 5000 }}
      slidesPerView={1}
      slidesPerGroup={1}
      modules={[ Autoplay, Navigation, Pagination ]}
      pagination={{
        el: "#containerForBullets",
        type: "bullets",
        bulletClass: css.bullet,
        bulletActiveClass: css.active,
        clickable: true,
        renderBullet: (index: number, className: string) => (
          `<span class=${className}>${slides[index].name}</span>`
        ),
      }}
    >
      {slides.map(({ name, img }) => (
        <SwiperSlide key={name}>
          <img src={img} className={css.slideImage} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);
