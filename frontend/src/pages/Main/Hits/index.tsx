import { Link } from 'react-router-dom';
import css from './index.module.css';
import { NavPaths } from '../../../navigation';
import { useGetProductsQuery } from '../../../redux/productsApi';
import { ProductSlider } from '../../../components/ProductSlider';

const HIT_TAG_ID = 2;

export function Hits() {
  // todo: сделать ссылку на каталог с query param на хиты
  const { data=[], isLoading } = useGetProductsQuery({ tag: HIT_TAG_ID });

  return (
    <section className={css.container}>
      <div className={css.row}>
        <h2 className='h2'>Хиты продаж</h2>
        <Link to={NavPaths.CATALOG} className={css.link}>Перейти в каталог</Link>
      </div>
      {isLoading ? 'Загрузка хитов продаж...' : (
        <ProductSlider
          products={data.slice(0, 4)}
          slidable={false}
        />
      )}
    </section>
  );
}
