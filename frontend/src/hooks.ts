import { useState, useEffect } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

export function useDebounce<V extends string | number>(value: V, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export function useDisableScroll(flag: boolean) {
  useEffect(() =>  {
    if (flag) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [flag]);
}

export function useSyncQueryParam(
  key: string,
  value: any,
  setSearchParams: SetURLSearchParams,
) {
  useEffect(() => {
    if (value || value.length !== 0) {
      setSearchParams((prev) => {
        prev.set(key, value);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete(key);
        return prev;
      });
    }
  }, [value]);
} 
