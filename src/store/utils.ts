import { lazy } from "react";
import { NProvider } from "@namespace/index";

const HomePage = lazy(() => import("@components/home-page"));
const Groceries = lazy(() => import("@components/groceries-page"));
const LoginPage = lazy(() => import("@components/login-page"));
const PageNotFound = lazy(() => import("@components/page-not-found"));
const SignUpPage = lazy(() => import("@components/sign-up-page"));

export const menu = [];

export const routers: NProvider.TRoutes = [
  {
    path: "/",
    Children: HomePage,
    index: true,
  },
  {
    path: "/groceries/:groceryId",
    Children: Groceries,
    index: false,
  },
  {
    path: "/groceries/:groceryId/:groceryChildId",
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
    Children: SignUpPage,
    index: false,
  },
  {
    path: "*",
    Children: PageNotFound,
    index: false,
  },
];

export const MENU_HELPER: readonly {
  title: string;
  path: string;
  isPopUp: boolean;
  isVisited: boolean;
}[] = [
  {
    path: "/",
    title: "Homepage",
    isPopUp: false,
    isVisited: false,
  },
  {
    path: "/settings",
    title: "Settings",
    isPopUp: false,
    isVisited: false,
  },
  {
    path: "/sign-in",
    title: "Sign-in",
    isPopUp: false,
    isVisited: false,
  },
  {
    path: "/sign-up",
    title: "Sign-up",
    isPopUp: false,
    isVisited: false,
  },
];
