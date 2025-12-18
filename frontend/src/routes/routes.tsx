import HomePage from "../pages/HomePage";
import type { Route } from "../type";

export const routesGen = {
  home: "/",
};

const routes: Route[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
];

export default routes;
