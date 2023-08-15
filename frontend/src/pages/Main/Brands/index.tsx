import { Link } from 'react-router-dom';
import { useGetBrandsQuery } from '../../../redux/apis/productsApi';
import css from './index.module.css';
import { NavPaths } from '../../../navigation';
import { Slider } from '../../../components/Slider';

export function Brands() {
  const { data=[], isLoading } = useGetBrandsQuery();

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
              // todo: сделать ссылку на каталог с query params
              <Link key={brand.id} to={NavPaths.CATALOG} className={css.link}>
                <img
                  src={brand.image}
                  alt={brand.name}
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
