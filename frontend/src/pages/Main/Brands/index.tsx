import { Link } from 'react-router-dom';
import { useGetBrandImagesQuery } from '../../../redux/apis/productsApi';
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
              0: { slidesPerView: 2 },
              600: { slidesPerView: 3 },
              750: { slidesPerView: 4 },
              950: { slidesPerView: 5 },
              1200: { slidesPerView: 6 },
            }}
            items={data.map(((brand) => (
              <Link
                key={brand.id}
                className={css.link}
                to={`${NavPaths.CATALOG}?brand=${brand.id}`}
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
