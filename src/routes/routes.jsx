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
import MakeAnnouncement from "../pages/dashboardPages/MakeAnnouncement";
import ManageCoupons from "../pages/dashboardPages/ManageCoupons";
import AgreementRequest from "../pages/dashboardPages/AgreementRequest";
import MemberRoute from "../provider/MemberRoute";
import ManageMembers from "../pages/dashboardPages/ManageMembers";
import MakePayment from "../pages/dashboardPages/MakePayment";
import MakePaymentDetails from "../pages/dashboardPages/MakePaymentDetails";
import PaymentHistory from "../pages/dashboardPages/PaymentHistory";
import NoticeBoard from "../pages/dashboardPages/NoticeBoard";
import UserOrMemberRoute from "../provider/UserOrMemberRoute";
import Communities from "../pages/generalPages/Communities";
import AboutUs from "../pages/generalPages/AboutUs";
import ContactUs from "../pages/generalPages/ContactUs";
import Overview from "../pages/dashboardPages/Overview";
import MemberOrAdminRoute from "../provider/MemberOrAdminRoute";

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
        path: "/communities",
        element: <Communities/>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs/>,
      },
      {
        path: "/contactUs",
        element: <ContactUs/>,
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
          <UserOrMemberRoute>
            <MyProfile />
          </UserOrMemberRoute>
        )
      },
      {
        path: "/dashboard/announcements",
        element: (
          <UserOrMemberRoute>
            <Announcements />
          </UserOrMemberRoute>
        )
      },
      {
        path: "/dashboard/makePayment",
        element: (
          <MemberRoute>
            <MakePayment />
          </MemberRoute>
        )
      },
      {
        path: "/dashboard/make-payment-details",
        element: (
          <MemberRoute>
            <MakePaymentDetails />
          </MemberRoute>
        )
      },
      {
        path: "/dashboard/paymentHistory",
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        )
      },
      {
        path: "/dashboard/noticeBoard",
        element: (
          <MemberRoute>
            <NoticeBoard />
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
      {
        path: "/dashboard/overview",
        element: (
          <MemberOrAdminRoute>
            <Overview />
          </MemberOrAdminRoute>
        )
      },
    ],
  },

  {
    path: "/*",
    element: <NotFound />,
  },
]);
