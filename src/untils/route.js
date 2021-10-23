import Home from "../pages/Home";
import Search from "../pages/Search";
import React from "react";
const routes = [
  {
    name: "Home",
    path: "/",
    component: <Home />,
    roles: [],
  },
  {
    name: "Search",
    path: "/search",
    component: <Search />,
    roles: [],
  },
];

export { routes };
