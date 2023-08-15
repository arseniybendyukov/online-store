import { useGetSavedProductsQuery } from '../../../redux/apis/productsApi';
import { SavedProductCard } from '../../../components/SavedProductCard';
import css from './index.module.css';
import { ProfileSubpage } from '../common/ProfileSubpage';

export function Saved() {
  const { data, isLoading } = useGetSavedProductsQuery();

  return (
    <ProfileSubpage
      heading='Сохраненное'
      empty='Нет сохраненных товаров'
      itemsCount={data?.length}
      isLoading={isLoading}
    >
      {data && (
        <div className={css.products}>
          {data.map((product) => <SavedProductCard key={product.id} {...product} />)}
        </div>
      )}
    </ProfileSubpage>
  );
}
