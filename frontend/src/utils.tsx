import React from "react";

export const repeat = (n: number, Component: React.ComponentType) => (
  [...Array(n)].map((_, i) => <Component key={i} />)
);

export const range = (n: number) => (
  Array.from({ length: n }, (_, i) => i + 1)
);

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
