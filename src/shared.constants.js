import React from "react";

export const ROUTE_PATHS = {
  LOGIN: "/",
  REGISTER: "/register",
  USER_LIST: "/user-list",
  USER_DETAILS: "/user/:id",
  EVENTS: "/events",
};

export const ROUTE_NAMES = {
  LOGIN: "Login",
  REGISTER: "Register",
  USER_LIST: "Users",
  USER_DETAILS: "User Details",
  EVENTS: "Events",
};

export const APP_ROUTES = [
  {
    path: ROUTE_PATHS.USER_LIST,
    component: React.lazy(() => import("./pages/UserListPage/UserListPage")),
    name: ROUTE_NAMES.USER_LIST,
  },
  {
    path: ROUTE_PATHS.USER_DETAILS,
    component: React.lazy(() =>
      import("./pages/UserDetailsPage/UserDetailsPage")
    ),
    name: ROUTE_NAMES.USER_DETAILS,
  },
  {
    path: ROUTE_PATHS.EVENTS,
    component: React.lazy(() => import("./pages/EventsPage/EventsPage")),
    name: ROUTE_NAMES.EVENTS,
  },
];

export const LOCAL_STORAGE = {
  TOKEN: "token",
};
