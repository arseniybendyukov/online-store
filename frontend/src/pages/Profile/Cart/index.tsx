import css from './index.module.css';
import { ProfileSubpage } from '../common/ProfileSubpage';
import { useGetCartQuery } from '../../../redux/apis/productsApi';
import { CartItemCard } from '../../../components/CartItemCard';

export function Cart() {
  const { data, isLoading } = useGetCartQuery();

  return (
    <ProfileSubpage
      heading='Корзина'
      itemsCount={data?.length}
      isLoading={isLoading}
    >
      {data && (
        <div className={css.cartItems}>
          {data.map((cartItem) => <CartItemCard key={cartItem.id} {...cartItem} />)}
        </div>
      )}
    </ProfileSubpage>
  );
}
