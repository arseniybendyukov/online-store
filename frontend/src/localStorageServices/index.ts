import { LocalStorageSchema } from './types';

export function getTypedStorageItem<T extends keyof LocalStorageSchema>(key: T): LocalStorageSchema[T] | null {
  const rawValue = localStorage.getItem(key);
  if (rawValue !== null) {
    return JSON.parse(rawValue) as LocalStorageSchema[T];
  }
  return null;
}

export function setTypedStorageItem<T extends keyof LocalStorageSchema>(key: T, value: LocalStorageSchema[T]): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeTypedStorageItem<T extends keyof LocalStorageSchema>(key: T): void {
  localStorage.removeItem(key);
}
