import { Link } from 'react-router-dom';
import css from './index.module.css';
import { NavPaths } from '../../../navigation';
import { useGetProductsQuery } from '../../../redux/apis/productsApi';
import { Slider } from '../../../components/Slider';
import { ProductCard } from '../../../components/ProductCard';
import { SpinnerScreen } from '../../../components/SpinnerScreen';

export function Hits() {
  const { data, isLoading } = useGetProductsQuery({ tag: Number(process.env.REACT_APP_HIT_TAG_ID) });

  return (
    <section className={css.container}>
      <div className={css.row}>
        <h2 className='h2'>Хиты продаж</h2>
        <Link
          className='link'
          to={`${NavPaths.CATALOG}?tag=${Number(process.env.REACT_APP_HIT_TAG_ID)}`}
        >
          Перейти в каталог
        </Link>
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
