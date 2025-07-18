import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home";
import Apartment from "../pages/generalPages/Apartment";
import NotFound from "../pages/generalPages/NotFound";
import Login from "../pages/generalPages/Login";
import Registration from "../pages/generalPages/Registration";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../provider/PrivateRoute";
import MyProfile from "../pages/dashboardPages/MyProfile";
import Announcements from "../pages/dashboardPages/Announcements";
import AdminProfile from "../pages/dashboardPages/AdminProfile";
import AdminRoute from "../provider/AdminRoute";
import UserRoute from "../provider/UserRoute";
import MakeAnnouncement from "../pages/dashboardPages/MakeAnnouncement";
import ManageCoupons from "../pages/dashboardPages/ManageCoupons";
import AgreementRequest from "../pages/dashboardPages/AgreementRequest";
import MemberRoute from "../provider/MemberRoute";
import ManageMembers from "../pages/dashboardPages/ManageMembers";

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
      {
        path: "/dashboard/my-profile",
        element: (
          <MemberRoute>
            <MyProfile />
          </MemberRoute>
        )
      },
      {
        path: "/dashboard/announcements",
        element: (
          <MemberRoute>
            <Announcements />
          </MemberRoute>
        )
      },
      {
        path: "/dashboard/adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        )
      },
      {
        path: "/dashboard/makeAnnouncement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        )
      },
      {
        path: "/dashboard/manageCoupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        )
      },
      {
        path: "/dashboard/agreementRequest",
        element: (
          <AdminRoute>
            <AgreementRequest />
          </AdminRoute>
        )
      },
      {
        path: "/dashboard/manageMembers",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        )
      },
    ],
  },

  {
    path: "/*",
    element: <NotFound />,
  },
]);
