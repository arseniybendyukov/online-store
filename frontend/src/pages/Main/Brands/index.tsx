import { Link } from 'react-router-dom';
import { useGetBrandImagesQuery } from '../../../redux/api';
import css from './index.module.css';
import { NavPaths } from '../../../navigation';
import { Slider } from '../../../components/Slider';

export function Brands() {
  const { data=[], isLoading } = useGetBrandImagesQuery();

  return (
    <section>
      <h2 className='h2'>Бренды</h2>
      {
        isLoading
        ? 'Загрузка брендов'
        : (
          <Slider
            insideArrows
            slidesPerView={2}
            className={css.slider}
            breakpoints={{
              0: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              600: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              750: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              950: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              1200: {
                slidesPerView: 6,
                slidesPerGroup: 6,
              },
            }}
            items={data.map(((brand) => (
              <Link
                key={brand.id}
                className={css.link}
                to={`${NavPaths.CATALOG}?brand=${brand.id}&show-all=true`}
              >
                <img
                  src={brand.image}
                  alt={`brand ${brand.id}`}
                  className={css.image}
                />
              </Link>
            )))}
          />
        )
      }
    </section>
  );
}
