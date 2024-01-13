import { useOutletContext } from 'react-router-dom';
import { ProductDetailOutletContext } from '../types';
import { ProductSlider } from '../../../components/ProductSlider';

export function SimilarProducts() {
  const { silimarProducts } = useOutletContext<ProductDetailOutletContext>();

  return <ProductSlider products={silimarProducts} />;
}
