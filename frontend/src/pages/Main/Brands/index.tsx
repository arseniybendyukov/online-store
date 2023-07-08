import { Link } from 'react-router-dom';
import { useGetBrandsQuery } from '../../../redux/productsApi';
import css from './index.module.css';
import { NavPaths } from '../../../navigation';

export function Brands() {
  const { data=[], isLoading } = useGetBrandsQuery();

  return (
    <section>
      <h2 className='h2'>Бренды</h2>
      {/* todo: сделать слайдер */}
      <div className={css.slider}>
        {isLoading ? 'Загрузка брендов...' : data.map(((brand) => (
          // todo: сделать ссылку на каталог с правильными query params
          <Link
            key={brand.id}
            to={NavPaths.CATALOG}
            className={css.link}
          >
            <img
              src={brand.image}
              alt={brand.name}
              className={css.image}
            />
          </Link>
        )))}
      </div>
    </section>
  );
}
