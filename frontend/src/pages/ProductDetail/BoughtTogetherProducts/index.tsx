import { useOutletContext } from 'react-router-dom';
import { ProductDetailOutletContext } from '../types';
import { ProductSlider } from '../../../components/ProductSlider';

export function BoughtTogetherProducts() {
  const { boughtTogetherProducts } = useOutletContext<ProductDetailOutletContext>();

  return <ProductSlider products={boughtTogetherProducts} />;
}
