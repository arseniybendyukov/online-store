import { Link, Outlet, useParams } from "react-router-dom";
import { useGetProductDetailQuery, useToggleSavedMutation } from "../../redux/api";
import css from './index.module.css';
import { RatingStars } from "../../components/RatingStars";
import { ProductPrice } from "../../components/ProductPrice";
import { Label } from "../../components/Label";
import { RadioVariants } from "../../components/RadioVariants";
import { useEffect, useState } from "react";
import { ToggleCartButton } from "../../components/ToggleCartButton";
import { Button } from "../../components/Button";
import { Colors } from "../../types/common";
import { ReactComponent as Heart } from '../../images/heart.svg';
import { ProductDetailNestedPaths } from "../../navigation";
import { NavTabs } from "../../components/NavTabs";
import { SpinnerScreen } from "../../components/SpinnerScreen";
import { useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { getRootCategory } from "../../utils/data";
import { NotInStock } from "../../components/NotInStock";
import { Description } from "../../components/Description";

export function ProductDetail() {
  const { id = '' } = useParams();
  const { data: product, isLoading } = useGetProductDetailQuery({ id });

  const user = useAppSelector((state) => state.userState.user);

  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);

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
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product, selectedVariantId]);

  function onSaveButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (selectedVariant) {
      if (user) {
        toggleSaved({ variantId: selectedVariant.id });
      } else {
        toast('Please log in to save products', { type: 'error' });
      }
    } else {
      toast('Error: No product option selected', { type: 'error' });
    }
  }

  return <>
    {
      isLoading
      ? <SpinnerScreen height={500} />
      : product && (
        <div className={`container ${css.container}`}>
          <div className={css.productDetails}>
            <ProductImage
              image={selectedVariant?.image}
              name={product.render_name}
              className={css.desktopImage}
            />

            <div className={css.main}>
              <div className={css.nameAndRating}>
                {!selectedVariant?.is_in_stock && <NotInStock />}
                <h1 className='h3'>{product.render_name}</h1>


                <div className={css.rowStats}>
                  <RatingStars avgRating={product.avg_rating} />

                  {product.avg_rating > 0 && (
                    <ReadReviews reviewsCount={product.reviews_count} />
                  )}
                </div>
              </div>

              <div className={css.priceAndVariants}>
                {selectedVariant && (
                  <ProductPrice
                    large
                    actualPrice={selectedVariant.actual_price}
                    salePrice={selectedVariant.sale_price}
                    percentage={selectedVariant.percentage}
                  />
                )}

                <Label label='Option'>
                  <RadioVariants
                    options={product.variants}
                    selectedVariantId={selectedVariantId}
                    setSelectedVariantId={setSelectedVariantId}
                  />
                </Label>
              </div>

              {selectedVariant && (
                <div className={css.buttons}>
                  <ToggleCartButton
                    cartItemId={selectedVariant.cart_item_id}
                    variantId={selectedVariant.id}
                    isInStock={selectedVariant.is_in_stock}
                  />

                  <Button
                    onClick={onSaveButtonClick}
                    isActive={selectedVariant.is_saved}
                    isLoading={isToggleSaveLoading}
                    color={Colors.RED}
                    state={{
                      default: {
                        text: 'Save',
                        icon: <Heart className={css.heartSVG} />,
                      },
                      active: {
                        text: 'Saved',
                        icon: <Heart className={`${css.heartSVG} ${css.active}`} />,
                      },
                    }}
                  />
                </div>
              )}

              <ProductImage
                image={selectedVariant?.image}
                name={product.render_name}
                className={css.mobileImage}
              />

              <Description text={product.description} />

              <div className={css.properties}>
                <Label label='Brand'>{product.brand.name}</Label>
                {product.article && (
                  <Label label='Product ID'>{product.article}</Label>
                )}
                {product.brand.manufacturer_country && (
                  <Label label='Country of Origin'>
                    {product.brand.manufacturer_country.name}
                  </Label>
                )}
                <Label label='Category'>{getRootCategory(product.category)}</Label>
                {product.ph_level && (
                  <Label label='pH Level'>{product.ph_level}</Label>
                )}
              </div>
            </div>
          </div>
          <NavTabs
            options={[
              {
                path: ProductDetailNestedPaths.BOUGHT_TOGETHER_PRODUCTS,
                name: `Frequently Bought Together (${product.bought_together_products.length})`,
              },
              {
                path: ProductDetailNestedPaths.SIMILAR_PRODUCTS,
                name: `Related Products (${product.silimar_products.length})`,
              },
              {
                path: ProductDetailNestedPaths.REVIEWS,
                name: `Reviews (${product.reviews_count})`,
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

interface ProductImageProps {
  image?: string,
  name: string,
  className?: string,
}

const ProductImage = ({ image, name, className }: ProductImageProps) => (
  <img
    className={`${css.image} ${className ? className : ''}`}
    src={image}
    alt={`product ${name}`}
  />
);


interface ReadReviewsProps {
  reviewsCount: number;
}

const ReadReviews = ({ reviewsCount }: ReadReviewsProps) => (
  <Link to='#' className={css.reviewsCount}>
    Read {reviewsCount} reviews
  </Link>
);
