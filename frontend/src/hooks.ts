import { useState, useEffect, useMemo } from 'react';
import { SetURLSearchParams } from 'react-router-dom';

export function useDebounce<V extends string | number | null>(value: V, delay: number) {
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [flag]);
}

export function useSyncQueryParam(
  params: [string, any][],
  setSearchParams: SetURLSearchParams,
) {
  const memorizedParams = useMemo<[string, any][]>(
    () => params,
    params.map(([_, value]) => value),
  );

  useEffect(() => {
    setSearchParams(
      Object.fromEntries(
        memorizedParams.filter(([_, value]) => value)
      )
    );
  }, [memorizedParams, setSearchParams]);
}
