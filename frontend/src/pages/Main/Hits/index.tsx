import { Link } from 'react-router-dom';
import css from './index.module.css';
import { NavPaths } from '../../../navigation';
import { useGetProductsQuery } from '../../../redux/apis/productsApi';
import { Slider } from '../../../components/Slider';
import { ProductCard } from '../../../components/ProductCard';

const HIT_TAG_ID = 2;

export function Hits() {
  // todo: сделать ссылку на каталог с query param на хиты
  const { data=[], isLoading } = useGetProductsQuery({ tag: HIT_TAG_ID });

  return (
    <section className={css.container}>
      <div className={css.row}>
        <h2 className='h2'>Хиты продаж</h2>
        <Link to={NavPaths.CATALOG} className='link'>Перейти в каталог</Link>
      </div>
      {isLoading ? 'Загрузка хитов продаж...' : (
        <Slider items={data.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} />
      )}
    </section>
  );
}
