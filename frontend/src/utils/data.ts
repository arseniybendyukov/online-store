import { Category, ListCategory, Order } from '../types/data';

export function getRootCategory(category: Category): string {
  if (category.parent) {
    return getRootCategory(category.parent);
  }
  return category.name;
}


export function findCategoryById(categories: ListCategory[], id: number | null): ListCategory | undefined {
  if (id === null) {
    return undefined;
  }

  for (let category of categories) {
    if (category.id === id) {
      return category;
    }
    
    if (category.children) {
      const child = findCategoryById(category.children, id);
      if (child) return child;
    }
  }
}


export function getFirstParent(categories: ListCategory[], id: number) {
  const category = findCategoryById(categories, id);

  if (category) {
    if (category.parents) {
      return findCategoryById(
        categories,
        category.parents[category.parents.length - 1].id,
      );
    }
  }
}


export function formatDate(date: string) {
  const obj = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return obj.format(new Date(date));
}


export function monthAndDayFromDate(date: string) {
  const obj = new Intl.DateTimeFormat('ru', {
    month: 'long',
    day: 'numeric',
  });

  return obj.format(new Date(date));
}


export function getOverallPrice(order: Order) {
  const price = order.products.reduce((acc, orderedProduct) => {
    const price = orderedProduct.sale_price || orderedProduct.actual_price;
    return acc + price * orderedProduct.amount;
  }, 0);

  return `${price} ₽`;
}


export function getFullName<
T extends {
  first_name: string;
  last_name: string;
  patronymic?: string | null;
}>(user: T) {
  let fullName = `${user.first_name} ${user.last_name}`;

  if (user.patronymic) {
    fullName = `${fullName} ${user.patronymic}`;
  }

  return fullName;
}
