import { lazy } from "react";
import { NProvider } from "@namespace/index";

const HomePage = lazy(() => import("@components/home-page"));
const Groceries = lazy(() => import("@components/groceries-page"));
const Grocery = lazy(() => import("@components/grocery-page"));
const LoginPage = lazy(() => import("@components/login-page"));
const PageNotFound = lazy(() => import("@components/page-not-found"));
const SignUpPage = lazy(() => import("@components/sign-up-page"));
const ForgotPassword = lazy(() => import("@components/forgot-password-page"));

export const menu = [];

export const routers: NProvider.TRoutes = [
  {
    path: "/",
    Children: HomePage,
    index: true,
  },
  {
    path: "/groceries/:boxId",
    Children: Groceries,
    index: false,
  },
  {
    path: "/groceries/:boxId/:groceryId",
    Children: Grocery,
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
    path: "/forgot-password",
    Children: ForgotPassword,
    index: false,
  },
  {
    path: "*",
    Children: PageNotFound,
    index: false,
  },
];
