import { lazy } from "react";
import { NProvider } from "src/typings";

const HomePage = lazy(() => import("src/components/home-page"));
const Groceries = lazy(() => import("src/components/groceries"));

export const menu = [];

export const routers: NProvider.TRoutes = [
  {
    path: "/",
    Children: HomePage,
    index: true,
  },
  {
    path: "/groceries",
    Children: Groceries,
    index: false,
  },
  {
    path: "/grocery/:id",
    Children: Groceries,
    index: false,
  },
  {
    path: "/settings",
    Children: Groceries,
    index: false,
  },
  {
    path: "/sign-in",
    Children: Groceries,
    index: false,
  },
  {
    path: "/sign-up",
    Children: Groceries,
    index: false,
  },
];
