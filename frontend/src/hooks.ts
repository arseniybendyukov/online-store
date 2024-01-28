import { useState, useEffect, useMemo } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

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

/** @deprecated */
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

export function useSearchParamsState<T extends string>(
  searchParamName: T,
  defaultValue: string,
): readonly [
  searchParamsState: string,
  setSearchParamsState: (newState: string) => void
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams.get(searchParamName);
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  const setSearchParamsState = (newState: string) => {
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
  return [searchParamsState, setSearchParamsState];
}
