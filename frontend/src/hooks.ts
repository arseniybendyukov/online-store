import { useState, useEffect } from 'react';

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
