import { useGetOrdersQuery } from '../../../redux/apis/productsApi';
import css from './index.module.css';

export function Orders() {
  const { data, isLoading } = useGetOrdersQuery();

  console.log(data);
  
  return (
    <div>
      <h1 className='h1'>Заказы</h1>
    </div>
  );
}
