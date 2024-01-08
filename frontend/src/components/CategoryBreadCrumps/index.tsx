import { Link } from 'react-router-dom';
import { TreeCategory } from '../../types/data';
import { findCategoryById } from '../../utils/data';
import css from './index.module.css';
import { NavPaths } from '../../navigation';

interface Props {
  selectedId: number | null;
  categories: TreeCategory[];
}

export function CategoryBreadCrumps({
  selectedId,
  categories,
}: Props) {
  const selectedCategory = findCategoryById(categories, selectedId);

  if (!selectedId || !selectedCategory) {
    return null;
  }

  const breadCrumbs = [...(selectedCategory?.parents || []), selectedCategory];

  return <>
    {selectedCategory && (
      <div className={css.container}>
        {breadCrumbs.map((breadCrumb, index) => (
          <div key={breadCrumb.id} className={css.elem}>
            <Link
              to={`${NavPaths.CATALOG}/?category=${breadCrumb.id}`}
              className={`${css.breadCrumb} ${index === breadCrumbs.length - 1 ? css.last : ''}`}
            >
              {breadCrumb.name}
            </Link>

            {index < breadCrumbs.length - 1 && (
              <span className={css.separator}>/</span>
            )}
          </div>
        ))}
      </div>
    )}
  </>;
}
