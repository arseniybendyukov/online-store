import { SetState } from '../../types/common';
import { ListCategory } from '../../types/data';
import { Category } from './Category';
import { ReactComponent as LongArrow } from '../../images/long-arrow.svg';
import css from './index.module.css';
import { findCategoryById, getFirstParent } from '../../utils/data';

interface Props {
  categories: ListCategory[];
  selectedId: number | null;
  setSelectedId: SetState<number | null>;
}

export function CategoryTree({
  categories,
  selectedId,
  setSelectedId,
}: Props) {
  const selectedCategory = selectedId ? findCategoryById(categories, selectedId) : null;

  let headerCategory: ListCategory | null;

  if (selectedCategory) {
    if (selectedCategory.children) {
      headerCategory = selectedCategory;
    } else {
      if (selectedCategory.parents) {
        headerCategory = getFirstParent(categories, selectedCategory.id) as ListCategory;
      } else {
        headerCategory = null;
      }
    }
  } else {
    headerCategory = null;
  }

  function setSelectedToPrev() {
    if (headerCategory) {
      if (categories.includes(headerCategory)) {
        setSelectedId(null)
      } else {
        setSelectedId((getFirstParent(categories, headerCategory.id) as ListCategory).id)
      }
    }
  }

  return (
    <div className={css.container}>
      {headerCategory && (
        <button className={css.back} onClick={setSelectedToPrev}>
          <LongArrow className={css.arrowSVG} />
          {headerCategory.name}
        </button>
      )}

      <div className={css.categories}>
        {headerCategory && (
          <Category
            id={headerCategory.id}
            name='Все'
            count={null}
            setSelectedId={setSelectedId}
            isSelected={selectedId === headerCategory.id}
            hasArrow={false}
          />
        )}

        {(headerCategory?.children || categories).map((category) => (
          <Category
            key={category.id}
            id={category.id}
            name={category.name}
            count={category.count}
            setSelectedId={setSelectedId}
            isSelected={selectedId === category.id}
            hasArrow={!!category.children}
          />
        ))}
      </div>
    </div>
  );
}
