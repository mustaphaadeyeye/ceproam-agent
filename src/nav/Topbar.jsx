import { useState } from "react";
import Logo from "../assets/images/ceproamlogo.svg";
import DashImg from "../assets/icons/myhouse.png";
import GrowthIcon from "../assets/icons/mygro.png";
import userIocn from "../assets/icons/usericon.png";
import transactionIcon from "../assets/icons/transactionicon.png";
import settingsIcon from "../assets/icons/seticon.png";
import SearchInput from "../inputs/SearchInput";
import { Bell, Search, ChevronDown, Menu, X } from "lucide-react";
import Jimage from "../assets/images/jimage.png";
import Wrapper from "../components/Wrapper";
import { fontFamily } from "../styles/theme";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: DashImg, path: "/" },
  { label: "Properties", icon: GrowthIcon, path: "/properties" },
  { label: "Investments", icon: GrowthIcon, path: "/investments" },
  { label: "Users", icon: userIocn, path: "/users" },
  { label: "Transactions", icon: transactionIcon, path: "/transactions" },
  { label: "Settings", icon: settingsIcon, path: "/settings" },
];

const activeIconFilter = {
  filter:
    "invert(20%) sepia(90%) saturate(5000%) hue-rotate(355deg) brightness(90%)",
};


  
const handleNotify = () => {
  navigate("/notifications");
};

const Topbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleNotify = () => {
  navigate("/notification");
};

  return (
    <header className={`fixed top-0 left-0 w-full  bg-white/90 backdrop-blur-md shadow-lg z-50 ${fontFamily.main}`}>
      <Wrapper>
        <div className="h-16 xl:h-18 flex items-center justify-between">

          {/* Left */}
          <div className="flex items-center gap-4 xl:gap-14">

            {/* Logo */}
            <div className="flex items-center">
              <img
                src={Logo}
                alt="Ceproam"
                className="h-8 xl:h-10 w-auto object-contain"
              />
            </div>

            {/* Navigation - full desktop only, xl and above */}
            <nav className="hidden xl:flex items-center gap-5">
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path}>
                  {({ isActive }) => (
                    <div className="flex items-center gap-2 cursor-pointer transition duration-200">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-4.5 h-4.5"
                        style={{
                          filter: isActive ? activeIconFilter.filter : "none",
                        }}
                      />

                      <span
                        className={`text-[15px] font-normal whitespace-nowrap ${
                          isActive ? "text-[#EC2614]" : "text-[#05062F]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4">

            {/* Search - full box shown lg and up (iPad Pro + desktop) */}
            <div className="hidden lg:block">
              <SearchInput
                icon={Search}
                placeholder="Search..."
                width="203px"
                height="42px"
                rounded="lg"
              />
            </div>

            {/* Search icon trigger - below lg (iPad mini + mobile) */}
            <button
              type="button"
              aria-label="Search"
              className="lg:hidden text-[#05062F]"
            >
              <Search size={20} />
            </button>

            <div className="relative cursor-pointer">
              <Bell
                size={21}
                className="text-[#05062F] hover:scale-105 transition"
                onClick={handleNotify}
              />

              {/* <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-white bg-[#EC2614] rounded-full">
                2
              </span> */}
            </div>

            <div className="hidden sm:flex items-center gap-2 cursor-pointer">
              <img
                src={Jimage}
                alt="User avatar"
                className="w-9 h-9 rounded-full object-cover"
              />

              <ChevronDown
                size={16}
                className="text-[#05062F]"
              />
            </div>

            {/* Avatar only, no chevron, on very small screens */}
            <div className="sm:hidden">
              <img
                src={Jimage}
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            {/* Hamburger - shown for iPad Pro (lg), iPad mini (md), and mobile; hidden at xl */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="xl:hidden text-[#05062F] ml-1"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>

        {/* Dropdown nav - iPad Pro, iPad mini, and mobile */}
        {mobileOpen && (
          <nav className="xl:hidden flex flex-col gap-1 pb-4 border-t border-gray-100">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
              >
                {({ isActive }) => (
                  <div className="flex items-center gap-3 px-2 py-3 cursor-pointer transition duration-200">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-5 h-5"
                      style={{
                        filter: isActive ? activeIconFilter.filter : "none",
                      }}
                    />

                    <span
                      className={`text-[15px] font-normal whitespace-nowrap ${
                        isActive ? "text-[#EC2614]" : "text-[#05062F]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}

            {/* search inside dropdown, since inline search is hidden below lg */}
            <div className="lg:hidden px-2 pt-2">
              <SearchInput
                icon={Search}
                placeholder="Search..."
                width="100%"
                height="42px"
                rounded="lg"
              />
            </div>
          </nav>
        )}
      </Wrapper>
    </header>
  );
};

export default Topbar;
