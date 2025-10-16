import { SetState } from '../../../types/common';
import { TreeCategory } from '../../../types/data';
import { findCategoryById } from '../../../utils/data';
import { declOfNum } from '../../../utils/lang';
import css from './index.module.css';

interface Props {
  categories: TreeCategory[];
  selectedId: number | null;
  setSelectedId: SetState<number | null>;
}

export function CategoryCards({
  categories,
  selectedId,
  setSelectedId,
}: Props) {
  const selectedCategory = selectedId ? findCategoryById(categories, selectedId) : null;

  let displayedCategories: TreeCategory[];

  if (selectedCategory) {
    if (selectedCategory.children) {
      displayedCategories = selectedCategory.children;
    } else {
      displayedCategories = [];
    }
  } else {
    displayedCategories = categories;
  }

  return (
    <div className={css.container}>
      {displayedCategories && (
        displayedCategories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            image={category.image}
            count={category.count}
            setSelectedId={setSelectedId}
          />
        ))
      )}
    </div>
  );
}

interface CategoryCardProps {
  id: number;
  name: string;
  image: string | null;
  count: number;
  setSelectedId: SetState<number | null>;
}

function CategoryCard({
  id,
  name,
  image,
  count,
  setSelectedId,
}: CategoryCardProps) {


  return (
    <div className={css.card} onClick={() => setSelectedId(id)}>
      <div className={`ibg ${css.image}`}>
        {image && <img src={image} alt='category' />}
      </div>

      <div className={css.texts}>
        <p className={css.name}>
          {name}
        </p>

        <span className={css.count}>
          {`${count} products found`}
        </span>
      </div>
    </div>
  );
}
