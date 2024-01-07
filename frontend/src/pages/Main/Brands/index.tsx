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
            slidesPerView={6}
            items={data.map(((brand) => (
              <Link
                key={brand.id}
                className={css.link}
                to={`${NavPaths.CATALOG}?brand=${brand.id}`}
              >
                <img
                  src={brand.image}
                  alt={`brand ${brand.id}`}
                  className={`greyImg ${css.image}`}
                />
              </Link>
            )))}
          />
        )
      }
    </section>
  );
}
