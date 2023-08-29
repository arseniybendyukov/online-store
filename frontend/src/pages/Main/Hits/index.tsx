import { Link } from 'react-router-dom';
import css from './index.module.css';
import { NavPaths } from '../../../navigation';
import { useGetProductsQuery } from '../../../redux/apis/productsApi';
import { Slider } from '../../../components/Slider';
import { ProductCard } from '../../../components/ProductCard';
import { SpinnerScreen } from '../../../components/SpinnerScreen';

const HIT_TAG_ID = 2;

export function Hits() {
  // todo: сделать ссылку на каталог с query param на хиты
  const { data, isLoading } = useGetProductsQuery({ tag: HIT_TAG_ID });

  return (
    <section className={css.container}>
      <div className={css.row}>
        <h2 className='h2'>Хиты продаж</h2>
        <Link to={NavPaths.CATALOG} className='link'>Перейти в каталог</Link>
      </div>
      {
        isLoading
        ? <SpinnerScreen height='300px' />
        : data && (
          <Slider
            items={data.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          />
        )
      }
    </section>
  );
}
