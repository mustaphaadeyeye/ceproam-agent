import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Properties from "./pages/properties/Properties";
import PropertyDetails from "./pages/properties/PropertyDetails";
import MediaUpload from "./pages/properties/MediaUpload";
import ReviewPublish from "./pages/properties/ReviewPublish";
import InvestmentLayout from "./pages/investments/InvestmentLayout";
import InvestmentDetails from "./pages/investments/InvestmentDetails";
import EditDetails from "./pages/investments/EditDetails";
import UserLayout from "./pages/users/UserLayout";
import TransactionLayout from "./pages/transactions/TransactionLayout";
import TransactionsDeatils from "./pages/transactions/TransactionsDeatils";
import SettingsLayout from "./pages/settings/SettingsLayout";
import Notification from "./pages/Notification";
import UserDetails from "./pages/users/UserDetails";
import AvailableProperty from "./pages/properties/AvailableProperty";
import PendingProperty from "./pages/properties/PendingProperty";
import SoldProperty from "./pages/properties/SoldProperty";
import SignUp from "./pages/authentication/SignUp";
import Login from "./pages/authentication/Login";
import PersonalInfo from "./pages/authentication/PersonalInfo";
import Kyc from "./pages/authentication/Kyc";
import ForgotPassword from "./pages/authentication/ForgotPassword";

function App() {
  return (
    <Routes>
      {/* Authentication — public, no dashboard chrome */}
      <Route path="/" element={<Login />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="personal-info" element={<PersonalInfo />} />
      <Route path="kyc" element={<Kyc />} />
      <Route path="forgot-password" element={<ForgotPassword />} />

      {/* Dashboard — behind MainLayout */}
      <Route path="app" element={<MainLayout />}>
        <Route index element={<DashboardLayout />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties-details" element={<PropertyDetails />} />
        <Route path="media-upload" element={<MediaUpload />} />
        <Route path="review-publish" element={<ReviewPublish />} />
        <Route path="investments" element={<InvestmentLayout />} />
        <Route path="investments/:id" element={<InvestmentDetails />} />
        <Route path="edit-details" element={<EditDetails />} />
        <Route path="users" element={<UserLayout />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="transactions" element={<TransactionLayout />} />
        <Route path="transactions/:id" element={<TransactionsDeatils />} />
        <Route path="settings" element={<SettingsLayout />} />
        <Route path="notification" element={<Notification />} />
        <Route path="available-property" element={<AvailableProperty />} />
        <Route path="pending-property" element={<PendingProperty />} />
        <Route path="sold-property" element={<SoldProperty />} />
      </Route>
    </Routes>
  );
}

export default App;