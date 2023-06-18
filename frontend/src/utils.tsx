import React from "react";

export const repeat = (n: number, Component: React.ComponentType) => (
  [...Array(n)].map((_, i) => <Component key={i} />)
);
