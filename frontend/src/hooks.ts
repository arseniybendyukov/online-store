import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useDebounce<V extends string | number | null>(value: V, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDisableScroll(flag: boolean) {
  useEffect(() =>  {
    if (flag) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [flag]);
}

export function useSearchParamsState(
  searchParamName: string,
  getDefaultValue: (params: URLSearchParams) => any,
): readonly [
  searchParamsState: any,
  setSearchParamsState: (newState: any) => void
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = getDefaultValue(searchParams);

  const setSearchParamsState = (newState: any) => {
      const next = Object.assign(
          {},
          [...searchParams.entries()].reduce(
              (o, [key, value]) => ({ ...o, [key]: value }),
              {}
          ),
          { [searchParamName]: newState }
      );
      setSearchParams(next);
  };
  return [value, setSearchParamsState];
}
