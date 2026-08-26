import React from "react";
import { Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./components/auth/RequireAuth"; // 👈 Import Guard
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
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#555555",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
            borderBottom: "4px solid transparent",
          },
          success: {
            iconTheme: {
              primary: "#00b300",
              secondary: "#fff",
            },
            style: {
              borderBottom: "4px solid #00b300",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
            style: {
              borderBottom: "4px solid #EF4444",
            },
          },
        }}
        reverseOrder={false}
      />
      <Routes>
        {/* Authentication — public */}
        <Route path="/" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="personal-info" element={<PersonalInfo />} />
        <Route path="kyc" element={<Kyc />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        {/* Dashboard — protected by RequireAuth guard */}
        <Route
          path="app"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
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
    </>
  );
}

export default App;
