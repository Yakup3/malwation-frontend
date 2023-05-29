import React from "react";

export const ROUTE_PATHS = {
  LOGIN: "/login",
  REGISTER: "/register",
  USER_LIST: "/user-list",
  USER_DETAILS: "/user/:id",
};

const APP_ROUTES = [
  {
    path: ROUTE_PATHS.LOGIN,
    component: React.lazy(() => import("./pages/LoginPage/LoginPage")),
    name: "Login",
  },
  {
    path: ROUTE_PATHS.REGISTER,
    component: React.lazy(() => import("./pages/RegisterPage/RegisterPage")),
    name: "Register",
  },
  {
    path: ROUTE_PATHS.USER_LIST,
    component: React.lazy(() => import("./pages/UserListPage/UserListPage")),
    name: "User List",
  },
  {
    path: ROUTE_PATHS.USER_DETAILS,
    component: React.lazy(() =>
      import("./pages/UserDetailsPage/UserDetailsPage")
    ),
    name: "User Details",
  },
];

export default APP_ROUTES;
