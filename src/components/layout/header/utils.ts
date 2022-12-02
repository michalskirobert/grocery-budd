type TMenu = readonly {
  title: string;
  path: string;
  isPopUp: boolean;
  isVisited: boolean;
}[];

const BASE_URL: TMenu = [
  {
    path: "/",
    title: "Homepage",
    isPopUp: false,
    isVisited: false,
  },
];

const NOT_LOGGED_USER_MENU: TMenu = [
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

const LOGGED_USER_MENU: TMenu = [
  ...BASE_URL,
  {
    path: "/analyse",
    title: "Analyse",
    isPopUp: false,
    isVisited: false,
  },
  {
    path: "/favourites",
    title: "Favourites",
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
    title: "Sign out",
    isPopUp: false,
    isVisited: false,
  },
];

export const setNav = (isLogged: boolean): TMenu => {
  let menu: TMenu = [];

  if (isLogged) {
    menu = [...BASE_URL, ...LOGGED_USER_MENU];
  } else {
    menu = [...BASE_URL, ...NOT_LOGGED_USER_MENU];
  }

  return Array.from(
    new Map(menu.map((item) => [item["title"], item])).values()
  );
};
