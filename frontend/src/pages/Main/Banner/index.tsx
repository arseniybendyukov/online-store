import { Button } from '../../../components/Button';
import { NavPaths } from '../../../navigation';
import { Colors } from '../../../types/common';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
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
    name: 'Для химчистки',
    img: pylesos,
  },
  {
    name: 'Клининга',
    img: pipidastr,
  },
  {
    name: 'И дома',
    img: pshykalka,
  },
];

export const Banner = () => (
  <section className={css.banner}>
    <div className={css.content}>
      <div id='containerForBullets' className={css.bullets} />
      <div className={css.main}>
        <div className={css.text}>
          <h1 className={`h1 ${css.h1}`}>Профессиональная&nbsp;химия</h1>
          <p className={css.paragraph}>
            Наша компания представляет широкий выбор средств профессиональной химии  и оборудования от известных мировых и росийских производителей
            <span className={css.highlighted}> с доставкой по Новосибирску и всей России</span>
          </p>
        </div>
        <div className={css.buttons}>
          <Button
            path={NavPaths.CATALOG}
            state={{ default: { text: 'Перейти в каталог', icon: undefined } }}
            className={css.button}
            isBig
          />
          <Button
            path={NavPaths.CONTACTS}
            state={{ default: { text: 'Связаться с нами', icon: undefined } }}
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
        renderBullet: (index, className) => (
          `<span class=${className}>${slides[index].name}</span>`
        ),
      }}
      on={{
        slideChange: (swiper) => {console.log(swiper)},
        paginationUpdate: (swiper) => {console.log(swiper)},
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
