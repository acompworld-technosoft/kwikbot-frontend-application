import "./App.css";
import "./superadmin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./Components/Admin/loginPage";
import ProfileAdmin from "./Components/Admin/profileadmin";
import BillingInformation from "./Components/Admin/billing-information";
import CancelRenewal from "./Components/Admin/cancel-renewal";
import ChangePassword from "./Components/Admin/change-password";
import Confirm from "./Components/Admin/confirm";
import Content from "./Components/Admin/content/content";
import ContentHistory from "./Components/Admin/content/content-history";
import Conversation from "./Components/Admin/Conversation";
import Faqs from "./Components/Admin/faqs";
import FirstTimeSubscription from "./Components/Admin/FirstTimeSubscription";
import Invoices from "./Components/Admin/invoices";
import MySubscription from "./Components/Admin/my-subscribption";
import PaymentInfo from "./Components/Admin/payment-info";
import PrivacyPolicy from "./Components/Admin/privacy-policy";
import KwikbotAdminPanel from "./Components/SuperAdmin/SuperAdminusers";
import CustomerConversation from "./Components/SuperAdmin/customer-conversation";
import Transaction from "./Components/SuperAdmin/transaction";
import SuperAdminLogin from "./Components/SuperAdmin/superAdminloginPage";
import ForgetPassword from "./Components/Admin/forgotPassword/ForgetPassword";
import ResetPassword from "./Components/Admin/forgotPassword/ResetPassword";
import Lead from "./Components/Admin/Lead";

function App() {
  const isUserLoggedIn = !!localStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isUserLoggedIn ? (
                <Navigate to="/admin/profile" replace />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="/admin/forgotpassword" element={<ForgetPassword />} />
          <Route path="/admin/resetpassword" element={<ResetPassword />} />

          {/* Protected Routes */}
        
            <>
              <Route path="/admin/profile" element={<ProfileAdmin />} />
              <Route
                path="/admin/billinginformation"
                element={<BillingInformation />}
              />
              <Route path="/admin/cancelrenewal" element={<CancelRenewal />} />
              <Route path="/admin/changepassword" element={<ChangePassword />} />
              <Route path="/admin/confirm" element={<Confirm />} />
              <Route path="/admin/addcontent" element={<Content />} />
              <Route
                path="/admin/contenthistory"
                element={<ContentHistory />}
              />
              <Route path="/admin/conversation" element={<Conversation />} />
              <Route path="/admin/conversation/:id" element={<Conversation />} />
              <Route path="/admin/faqs" element={<Faqs />} />
              <Route
                path="/admin/firsttimesubscription"
                element={<FirstTimeSubscription />}
              />
              <Route path="/admin/invoices" element={<Invoices />} />
              <Route
                path="/admin/mysubscribption"
                element={<MySubscription />}
              />
              <Route path="/admin/paymentinfo" element={<PaymentInfo />} />
              <Route path="/admin/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/admin/lead" element={<Lead />} />
            </>
          
      

          <Route path="/superadmin/login" element={<SuperAdminLogin />} />
          <Route path="/superadmin/users" element={<KwikbotAdminPanel />} />
          <Route path="/superadmin/transactions" element={<Transaction />} />
          <Route
            path="/superadmin/customerconversation"
            element={<CustomerConversation />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
