import React from "react";

export const repeat = (n: number, Component: React.ComponentType) => (
  [...Array(n)].map((_, i) => <Component key={i} />)
);

export const range = (n: number) => (
  Array.from({ length: n }, (_, i) => i + 1)
);
