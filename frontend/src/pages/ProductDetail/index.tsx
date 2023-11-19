import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { useGetProductDetailQuery, useToggleSavedMutation } from "../../redux/apis/productsApi";
import css from './index.module.css';
import { RatingStars } from "../../components/RatingStars";
import { ProductPrice } from "../../components/ProductPrice";
import { Label } from "../../components/Label";
import { RadioVariants } from "../../components/RadioVariants";
import { useEffect, useMemo, useState } from "react";
import { AmountInput } from "../../components/AmountInput";
import { AddToCartButton } from "../../components/AddToCartButton";
import { Button } from "../../components/Button";
import { Colors } from "../../types/common";
import { ReactComponent as Heart } from '../../images/heart.svg';
import { ProductDetailNestedPaths } from "../../navigation";
import { NavTabs } from "../../components/NavTabs";
import { SpinnerScreen } from "../../components/SpinnerScreen";
import { useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { getRootCategory } from "../../utils/data";
import { useSyncQueryParam } from "../../hooks";
import { NotInStock } from "../../components/NotInStock";
import { Description } from "../../components/Description";

export function ProductDetail() {
  const { id = '' } = useParams();
  const { data: product, isLoading } = useGetProductDetailQuery({ id });

  const [searchParams, setSearchParams] = useSearchParams();

  const user = useAppSelector((state) => state.userState.user);

  const [amount, setAmount] = useState(1);

  // todo: обновлять состояние под это
  const queryParamVariant = useMemo(() => {
    const raw = searchParams.get('variant');
    return raw !== null
    ? Number(raw)
    : null
  }, [searchParams]);

  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(queryParamVariant);

  const selectedVariant = product?.variants.filter((variant) => variant.id === selectedVariantId)[0] || null;

  useEffect(() => {
    if (selectedVariant === null) {
      setSelectedVariantId(null);
    }
  }, [selectedVariant]);

  const [
    toggleSaved,
    { isLoading: isToggleSaveLoading},
  ] = useToggleSavedMutation();

  useEffect(() => {
    if (product && selectedVariantId === null) {
      setAmount(1);
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product, selectedVariantId]);

  function onSaveButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (selectedVariant) {
      if (user) {
        toggleSaved({ variant_id: selectedVariant.id });
      } else {
        toast('Войдите, чтобы сохранять товары', { type: 'error' });
      }
    } else {
      toast('Ошибка: не выбран вариант товара', { type: 'error' });
    }
  }

  // Синхронизация состояния с query parameters
  useSyncQueryParam(
    [
      ['variant', selectedVariantId],
    ],
    setSearchParams,
  );

  return <>
    {
      isLoading
      ? <SpinnerScreen height={500} />
      : product && (
        <div className={`container ${css.container}`}>
          <div className={css.productDetails}>
            <div className={css.slider}>
              <img src={selectedVariant?.image} alt={`product ${product.render_name}`} />
            </div>
            <div className={css.main}>
              {!selectedVariant?.is_in_stock && <NotInStock />}
              <h1 className='h1'>{product.render_name}</h1>
              <div className={css.rowStats}>
                <RatingStars avgRating={product.avg_rating} />

                {product.avg_rating > 0 && (
                  <ReadReviews reviewsCount={product.reviews_count} />
                )}
              </div>

              <Description text={product.description} />

              {selectedVariant && (
                <ProductPrice
                  large
                  actualPrice={selectedVariant.actual_price}
                  salePrice={selectedVariant.sale_price}
                  percentage={selectedVariant.percentage}
                />
              )}
              <div className={css.devider}></div>
              <Label label='Бренд'>{product.brand.name}</Label>
              <Label label='Категория'>{getRootCategory(product.category)}</Label>
              <Label label='Вариант товара'>
                <RadioVariants
                  options={product.variants}
                  selectedVariantId={selectedVariantId}
                  setSelectedVariantId={setSelectedVariantId}
                />
              </Label>
              {selectedVariant?.is_in_stock && (
                <Label label='Количество'>
                  <AmountInput
                    amount={amount}
                    setAmount={setAmount}
                  />
                </Label>
              )}
              {selectedVariant && (
                <div className={css.buttons}>
                  <AddToCartButton
                    variantId={selectedVariant.id}
                    isInCart={selectedVariant.is_in_cart}
                    isInStock={selectedVariant.is_in_stock}
                    amount={amount}
                  />

                  <Button
                    onClick={onSaveButtonClick}
                    isActive={selectedVariant.is_saved}
                    isLoading={isToggleSaveLoading}
                    color={Colors.RED}
                    state={{
                      default: {
                        text: 'В сохраненное',
                        icon: <Heart className={css.heartSVG} />,
                      },
                      active: {
                        text: 'Cохранено',
                        icon: <Heart className={`${css.heartSVG} ${css.active}`} />,
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <NavTabs
            options={[
              {
                path: ProductDetailNestedPaths.BOUGHT_TOGETHER_PRODUCTS,
                name: `С этим товаром покупают (${product.bought_together_products.length})`,
              },
              {
                path: ProductDetailNestedPaths.SIMILAR_PRODUCTS,
                name: `Похожие товары (${product.silimar_products.length})`,
              },
              {
                path: ProductDetailNestedPaths.REVIEWS,
                name: `Отзывы (${product.reviews_count})`,
              },
            ]}
          />
          <Outlet
            context={{
              boughtTogetherProducts: product.bought_together_products,
              silimarProducts: product.silimar_products,
              reviews: {
                id: product.id,
                avgRating: product.avg_rating,
                variants: product.variants,
              },
            }}
          />
        </div>
      )
    }
  </>;
}

interface ReadReviewsProps {
  reviewsCount: number;
}

const ReadReviews = ({ reviewsCount }: ReadReviewsProps) => (
  <Link to='#' className={css.reviewsCount}>
    Читать {reviewsCount} отзывов
  </Link>
);
