import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home";
import Apartment from "../pages/generalPages/Apartment";
import NotFound from "../pages/generalPages/NotFound";
import Login from "../pages/generalPages/Login";
import Registration from "../pages/generalPages/Registration";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../provider/PrivateRoute";



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

      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/registration",
        Component: Registration,
      },
    ],
  },


  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      // {
      //   path: "/dashboard/myParcels",
      //   Component: MyParcels,
      // },
    ]

    },

 
 
 
 
    {
    path: "/*",
    element: <NotFound />,
  },
]);
