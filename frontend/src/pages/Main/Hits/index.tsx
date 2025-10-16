import { useGetProductsQuery } from '../../../redux/api';
import css from './index.module.css';
import { NavPaths } from '../../../navigation';
import { SpinnerScreen } from '../../../components/SpinnerScreen';
import { ProductSlider } from '../../../components/ProductSlider';
import { Button } from '../../../components/Button';

export function Hits() {
  const { data, isLoading } = useGetProductsQuery({ tag: Number(process.env.REACT_APP_HIT_TAG_ID) });

  return (
    <section className={css.container}>
      <h2 className='h2'>Best sellers</h2>
      {
        isLoading
        ? <SpinnerScreen height='300px' />
        : data && <ProductSlider products={data} />
      }
      <Button
        path={`${NavPaths.CATALOG}?tag=${Number(process.env.REACT_APP_HIT_TAG_ID)}&show-all=true`}
        state={{ default: { text: 'Go to Catalog', icon: undefined } }}
        className={css.button}
        isBig
      />
    </section>
  );
}
