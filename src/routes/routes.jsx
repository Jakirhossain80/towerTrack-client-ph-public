import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home";
import Apartment from "../pages/generalPages/Apartment";
import NotFound from "../pages/generalPages/NotFound";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,

    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/apartment",
        Component: Apartment,
      },

      // {
      //   path: "/login",
      //   Component: Login,
      // },
      // {
      //   path: "/registration",
      //   Component: Registration,
      // },
    ],
  },

  {
    path: "/*",
    element: <NotFound />,
  },
]);
