import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import AvailableFoods from "../pages/AvailableFoods";
import AddFood from "../pages/AddFood";
import ManageMyFoods from "../pages/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest";
import FoodDetails from "../pages/FoodDetails";
import UpdateFoodInfo from "../pages/UpdateFoodInfo";
import LearnMore from "../pages/LearnMore";
import PrivateRoute from "../provider/PrivateRoute";
import FoodUpload from "../pages/FoodUpload";


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
        path: "/login",
        Component: Login,
      },
      {
        path: "/registration",
        Component: Registration,
      },
      {
        path: "/availablefoods",
        Component: AvailableFoods,
      },
      {
        path: "/addfood",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/managemyfoods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/myfoodrequest",
        element: (
          <PrivateRoute>
            <MyFoodRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
         path: "/updatefood/:id",
        element: (
          <PrivateRoute>
            <UpdateFoodInfo />
          </PrivateRoute>
        ),
      },
     
      {
        path: "/learnmore",
        element: <LearnMore />,
      },
      {
        path: "/fooduploadwithai",
        element: <FoodUpload />,
      },

      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);
