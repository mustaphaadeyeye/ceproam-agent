import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./pages/dashboard/DashboardLayout"
import Properties from "./pages/properties/Properties";
import PropertyDetails from "./pages/properties/PropertyDetails";
import MediaUpload from "./pages/properties/MediaUpload";
import ReviewPublish from "./pages/properties/ReviewPublish";
import InvestmentLayout from "./pages/investments/InvestmentLayout";
import InvestmentDetails from "./pages/investments/InvestmentDetails";
import EditDetails from "./pages/investments/EditDetails";
// import UserLayout from "./pages/users/UserLayout";
 import TransactionLayout from "./pages/transactions/TransactionLayout";
 import TransactionsDeatils from "./pages/transactions/TransactionsDeatils";
import SettingsLayout from "./pages/settings/SettingsLayout"
import Notification from "./pages/Notification"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="properties" element={<Properties/>}/>
        <Route path="properties-details" element={<PropertyDetails/>}/>
        <Route path="media-upload" element={<MediaUpload/>}/>
        <Route path="review-publish" element={<ReviewPublish/>}/>
        <Route path="investments" element={<InvestmentLayout/>}/>
        <Route path="investments/:id" element={<InvestmentDetails/>}/>
        <Route path="edit-details" element={<EditDetails/>}/>
         {/* <Route path="users" element={<UserLayout/>}/> */}
        <Route path="transactions" element={<TransactionLayout/>}/> 
        <Route path='transactions/:id' element={<TransactionsDeatils/>}/>
        <Route path="settings" element={<SettingsLayout/>}/>
        <Route path="notification" element={<Notification/>}/>
      </Route>
    </Routes>
  );
}

export default App;
