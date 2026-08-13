import { Outlet } from "react-router-dom";
import Topbar from "../nav/Topbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      <Topbar />
      <div className="
        pt-8 pb-24
        md:pt-9 md:pb-24
        lg:pt-20 lg:pb-2
        xl:pt-22 xl:pb-2
      ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
