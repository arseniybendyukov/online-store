import { useState } from 'react';
import { ReactComponent as ArrowDown } from '../../images/arrow.svg';
import { ReactComponent as LongArrow } from '../../images/long-arrow.svg';
import css from './index.module.css';
import { SetState } from '../../types/common';

interface CategoryNode extends SubcategoryNode {
  children: SubcategoryNode[];
}

interface SubcategoryNode {
  id: number;
  label: string;
}

interface Props {
  selectedIds: number[];
  setSelectedIds: SetState<number[]>;
  nodes: CategoryNode[];
}

export function CategoryAccordionSelect({
  selectedIds,
  setSelectedIds,
  nodes,
}: Props) {
  const [openedCategoryIds, setOpenedCategoryIds] = useState<number[]>([]);

  function buttonOnClick(id: number) {
    setOpenedCategoryIds((prevOpenedIds) => {
      if (prevOpenedIds.includes(id)) {
        return prevOpenedIds.filter((openedId) => openedId !== id);
      } else {
        return [...prevOpenedIds, id];
      }
    });
  }

  function isCategoryOpened(id: number): boolean {
    return openedCategoryIds.includes(id);
  }

  function categoryOnClick(children: SubcategoryNode[]) {
    setSelectedIds((prevSelectedIds) => {
      const areAllChildrenSelected = children.every((subcategoryNode) => (
        prevSelectedIds.includes(subcategoryNode.id)
      ));

      if (areAllChildrenSelected) {
        return prevSelectedIds.filter((selectedId) => (
          !children.map((subcategoryNode) => subcategoryNode.id).includes(selectedId)
        ));
      } else {
        return [
          ...prevSelectedIds,
          ...children
            .map((subcategoryNode) => subcategoryNode.id)
            .filter((id) => !prevSelectedIds.includes(id)),
        ];
      }
    });
  }
  
  function subcategoryOnClick(id: number) {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  }

  function isCategorySelected(children: SubcategoryNode[]): boolean {
    return children.every(({ id }) => (
      isSubcategorySelected(id)
    ));
  }

  function isSubcategorySelected(id: number): boolean {
    return selectedIds.includes(id);
  }

  return (
    <div>
      {nodes.map((categoryNode) => (
        <div
          key={categoryNode.id}
          className={`${css.category} ${isCategorySelected(categoryNode.children) ? css.categorySelected : ''}`}
        >
          <div className={css.label} onClick={() => categoryOnClick(categoryNode.children)}>
            <span>{categoryNode.label}</span>
          </div>
          <button className={css.button} onClick={() => buttonOnClick(categoryNode.id)}>
            <ArrowDown className={`${css.arrowSVG} ${isCategoryOpened(categoryNode.id) ? css.opened : ''}`} />
          </button>
          <div
            style={{
              display: isCategoryOpened(categoryNode.id) ? 'block' : 'none',
            }}
          >
            {categoryNode.children.map((subcategoryNode) => (
              <div
                key={subcategoryNode.id}
                className={`${css.category} ${isSubcategorySelected(subcategoryNode.id) ? css.subcategorySelected : ''}`}
                onClick={() => subcategoryOnClick(subcategoryNode.id)}
              >
                <div className={css.label}>
                  <LongArrow className={css.longArrowSVG} />
                  <span>{subcategoryNode.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
