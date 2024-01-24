import { useGetSavedProductVariantsQuery } from '../../../redux/api';
import { SavedProductVariantCard } from '../../../components/SavedProductCard';
import css from './index.module.css';
import { ProfileSubpage } from '../common/ProfileSubpage';

export function Saved() {
  const { data, isLoading } = useGetSavedProductVariantsQuery();

  return (
    <ProfileSubpage
      heading='Сохраненное'
      empty='Нет сохраненных товаров'
      itemsCount={data?.length}
      isLoading={isLoading}
    >
      {data && (
        <div className={css.products}>
          {data.map((product) => <SavedProductVariantCard key={product.id} {...product} />)}
        </div>
      )}
    </ProfileSubpage>
  );
}
