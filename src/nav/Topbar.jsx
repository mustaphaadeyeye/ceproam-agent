import { useState } from "react";
import Logo from "../assets/images/ceproamlogo.svg";
import DashImg from "../assets/icons/myhouse.png";
import GrowthIcon from "../assets/icons/mygro.png";
import userIocn from "../assets/icons/usericon.png";
import ChatIcon from "../assets/icons/chaticon.png";
import transactionIcon from "../assets/icons/transactionicon.png";
import settingsIcon from "../assets/icons/seticon.png";
import SearchInput from "../inputs/SearchInput";
import { Bell, Search, ChevronDown, Menu, X } from "lucide-react";
import Jimage from "../assets/images/profile.png";
import Wrapper from "../components/Wrapper";
import { fontFamily } from "../styles/theme";
import { NavLink, useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/profile/useProfile";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

const navItems = [
  { label: "Dashboard", icon: DashImg, path: "/app" },
  { label: "Properties", icon: GrowthIcon, path: "/app/properties" },
  { label: "Investments", icon: GrowthIcon, path: "/app/investments" },
  { label: "Users", icon: userIocn, path: "/app/users" },
  { label: "Transactions", icon: transactionIcon, path: "/app/transactions" },
  { label: "Chat", icon: ChatIcon, path: "/app/chat", end: true },
  { label: "Settings", icon: settingsIcon, path: "/app/settings" },
];

const activeIconFilter = {
  filter:
    "invert(20%) sepia(90%) saturate(5000%) hue-rotate(355deg) brightness(90%)",
};

const Topbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const { data: user } = useProfile();
  const userAvatar = user?.faceCaptureUrl || Jimage;

  // Fetch conversations to calculate unread message count badge
  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await api.get("/chat/conversations/list");
      return res?.data ?? res;
    },
    refetchInterval: 4000,
  });

  const unreadMessagesCount = conversations.filter((c) => c.hasUnread).length;

  const handleNotify = () => {
    navigate("/app/notification");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-lg z-50 ${fontFamily.main}`}
    >
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
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/app"}
                >
                  {({ isActive }) => {
                    const isChat = item.path === "/app/chat";
                    return (
                      <div className="flex items-center gap-2 cursor-pointer transition duration-200 relative">
                        <div className="relative">
                          <img
                            src={item.icon}
                            alt={item.label}
                            className="w-4.5 h-4.5"
                            style={{
                              filter: isActive
                                ? activeIconFilter.filter
                                : "none",
                            }}
                          />
                          {isChat && unreadMessagesCount > 0 && (
                            <span className="absolute -top-1 -right-2 flex h-3.5 min-w-[14px] px-0.5 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-xs">
                              {unreadMessagesCount > 99
                                ? "99+"
                                : unreadMessagesCount}
                            </span>
                          )}
                        </div>

                        <span
                          className={`text-[15px] font-normal whitespace-nowrap ${
                            isActive ? "text-[#EC2614]" : "text-[#05062F]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  }}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4">
            <div className="hidden lg:block">
              <SearchInput
                icon={Search}
                placeholder="Search..."
                width="203px"
                height="42px"
                rounded="lg"
              />
            </div>

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
            </div>

            <div className="hidden sm:flex items-center gap-2 cursor-pointer">
              <img
                src={userAvatar}
                alt="User avatar"
                onClick={() => navigate("/app/settings")}
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
              />
              <ChevronDown size={16} className="text-[#05062F]" />
            </div>

            <div className="sm:hidden">
              <img
                src={userAvatar}
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
            </div>

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
                end={item.path === "/app"}
                onClick={() => setMobileOpen(false)}
              >
                {({ isActive }) => {
                  const isChat = item.path === "/app/chat";
                  return (
                    <div className="flex items-center gap-3 px-2 py-3 cursor-pointer transition duration-200 relative">
                      <div className="relative">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-5 h-5"
                          style={{
                            filter: isActive ? activeIconFilter.filter : "none",
                          }}
                        />
                        {isChat && unreadMessagesCount > 0 && (
                          <span className="absolute -top-1 -right-2 flex h-3.5 min-w-[14px] px-0.5 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white shadow-xs">
                            {unreadMessagesCount > 99
                              ? "99+"
                              : unreadMessagesCount}
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[15px] font-normal whitespace-nowrap ${
                          isActive ? "text-[#EC2614]" : "text-[#05062F]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                }}
              </NavLink>
            ))}

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
