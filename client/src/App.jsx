import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Protected from "./pages/Protected.jsx";
import VerifyOtpPage from "./pages/VerifyOtpPage.jsx";
import AddPage from "./pages/AddPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ViewCartPage from "./pages/ViewCartPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import CancelPage from "./pages/CancelPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import MyOrder from "./components/MyOrder.jsx";
import MyOrders from "./components/MyOrders.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ConditionsPage from "./pages/ConditionsPage.jsx";
import CookiePolicyPage from "./pages/CookiePolicyPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import VerifyOtpEmailPage from "./pages/VerifyOtpEmailPage.jsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.jsx";
import TrackingOrderPage from "./pages/TrackingOrderPage.jsx";
import OurPromisePage from "./pages/OurPromisePage.jsx";
import ManageOurPromisePage from "./pages/ManageOurPromisePage.jsx";
import EditPromisePage from "./pages/EditPromisePage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import UserOrderDetailsPage from './pages/UserOrderDetailsPage.jsx'
import OurServicesPage from "./pages/OurServicesPage.jsx";
import ManageOurServicesPage from "./pages/ManageOurServicesPage.jsx";
import EditOurServicesPage from './pages/EditOurServicesPage.jsx'
import AbouUsPage from './pages/AboutUsPage.jsx'
import ManageAboutUsPage from './pages/ManageAboutUsPage.jsx'
import EditAboutUsPage from "./pages/EditAboutUsPage.jsx";
import ExploreMorePage from './pages/ExploreMorePage.jsx'
import CheckoutGuardPage from "./pages/CheckoutGuardPage.jsx";
import EditFoodPage from './pages/EditFoodPage.jsx'

function App() {

  const router = createBrowserRouter(

    createRoutesFromElements(

      <Route path={"/"} element={<Layout />}>

        <Route index element={<Protected><HomePage /></Protected>} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/register'} element={<RegisterPage />} />
        <Route path={"/verify-otp"} element={<Protected><VerifyOtpPage /></Protected>} />
        <Route path={"/add-food"} element={<Protected><AddPage /></Protected>} />
        <Route path={"/menu"} element={<Protected><MenuPage /></Protected>} />
        <Route path={"/details/:id"} element={<DetailsPage />} />
        <Route path={"/profile"} element={<Protected><ProfilePage /></Protected>} />
        <Route path={"/view-cart"} element={<ViewCartPage />} />
        <Route path={"/success"} element={<Protected><SuccessPage /></Protected>} />
        <Route path={"/cancel"} element={<Protected><CancelPage /></Protected>} />
        <Route path={"/checkout"} element={<Protected><CheckoutGuardPage /></Protected>} />
        <Route path={"/my-order"} element={<Protected><MyOrder /></Protected>} />
        <Route path={"/my-orders"} element={<Protected><MyOrders /></Protected>} />
        <Route path={"/contact"} element={<ContactPage />} />
        <Route path={"/conditions"} element={<ConditionsPage />} />
        <Route path={"/policy"} element={<CookiePolicyPage />} />
        <Route path={"/reset-password"} element={<ForgotPasswordPage />} />
        <Route path={"/verify-code"} element={<VerifyOtpEmailPage />} />
        <Route path={"/change-password"} element={<ChangePasswordPage />} />
        <Route path={"/tracking-order/:id"} element={<TrackingOrderPage />} />
        <Route path={"/our-promise"} element={<OurPromisePage />} />
        <Route path={"/manage-promise"} element={<ManageOurPromisePage />} />
        <Route path={"/edit-promise/:id"} element={<EditPromisePage />} />
        <Route path={"/order-details/:id"} element={<OrderDetailsPage />} />
        <Route path={"/manage-orders/:id"} element={<UserOrderDetailsPage />} />
        <Route path={"/our-services"} element={<OurServicesPage />} />
        <Route path={"/manage-our-services"} element={<ManageOurServicesPage />} />
        <Route path={"/edit-our-promises/:id"} element={<EditOurServicesPage />} />
        <Route path={"/about-us"} element={< AbouUsPage/>} />
        <Route path={"/manage-about-us"} element={<ManageAboutUsPage />} />
        <Route path={"/edit_about_us/:id"} element={<EditAboutUsPage />} />
        <Route path={"our-food"} element={<ExploreMorePage />} />
        <Route path={"/edit-food/:id"} element={<EditFoodPage />} />

      </Route>

    )

  )

  return (
    <>

      <RouterProvider router={router} />

    </>
  )


}

export default App;
