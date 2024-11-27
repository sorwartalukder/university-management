import { TRoute, TUserPath } from "../types";

export const routeGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    } else {
      acc.push({
        path: item.path!,
        element: item.element,
      });
    }
    return acc;
  }, []);
  return routes;
};
