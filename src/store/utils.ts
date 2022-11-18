import { lazy } from "react";
import { NProvider } from "@namespace/index";

const HomePage = lazy(() => import("@components/home-page"));
const Groceries = lazy(() => import("@components/groceries-page"));
const LoginPage = lazy(() => import("@components/login-page"));

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
    path: "/grocery/:name/:id",
    Children: Groceries,
    index: false,
  },
  {
    path: "/groceries/:name",
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
    Children: LoginPage,
    index: false,
  },
  {
    path: "/sign-up",
    Children: Groceries,
    index: false,
  },
];
