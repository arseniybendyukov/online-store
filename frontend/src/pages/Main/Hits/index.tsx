import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../../redux/apis/productsApi';
import css from './index.module.css';
import { NavPaths } from '../../../navigation';
import { SpinnerScreen } from '../../../components/SpinnerScreen';
import { ProductSlider } from '../../../components/ProductSlider';

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
        : data && <ProductSlider products={data} />
      }
    </section>
  );
}
