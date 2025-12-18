import type { JSX } from "react";

type Route = {
  index?: boolean;
  path?: string;
  element: JSX.Element;
  state?: string;
};
export type { Route };
