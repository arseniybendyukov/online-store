import { useParams } from 'react-router-dom';
import css from './index.module.css';
import { useGetOrderDetailQuery } from '../../../../redux/apis/productsApi';

export function OrderDetail() {
  const { id = '' } = useParams();
  const { data: order, isLoading } = useGetOrderDetailQuery({ id });

  return (
    <div>OrderDetail: {id}</div>
  );
}
