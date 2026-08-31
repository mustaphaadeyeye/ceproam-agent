import React, { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";

import ProfileImg from "../../assets/images/comLogo.png";
import TransferIcon from "../../assets/icons/transfericon.png";
import PersonalIcon from "../../assets/icons/UserCircle.png";
import ReferralIcon from "../../assets/icons/UsersFour.png";
import SecurityIcon from "../../assets/icons/Keyhole.png";
import HouseIcon from "../../assets/icons/House.png";
import ContactIcon from "../../assets/icons/PhoneCall.png";
import LogoutIcon from "../../assets/icons/SignOut.png";
import EditIcon from "../../assets/icons/PencilSimpleLine.png";
import LoginPwdIcon from "../../assets/icons/LoginPwd.png";

import InviteCode from "./InviteCode";
import SecurityBgIcon from "../../assets/icons/securityicon.png";

import BankIcon from "../../assets/icons/addbankicon.png";
import blueIcon from "../../assets/icons/blueicon.png";
import ContactChat from "../settings/ContactChat";

import SettingsModal from "../../components/modals/SettingsModal";
import WalletModal from "../../components/modals/WalletModal";

const menuItems = [
  {
    id: "personal",
    label: "Company Information",
    icon: PersonalIcon,
  },
  {
    id: "properties",
    label: "Wallet",
    icon: HouseIcon,
  },
  // {
  //   id: "referrals",
  //   label: "Referrals",
  //   icon: ReferralIcon,
  // },
  {
    id: "security",
    label: "Security",
    icon: SecurityIcon,
  },
  {
    id: "contact",
    label: "Support",
    icon: ContactIcon,
  },
  {
    id: "logout",
    label: "Logout",
    icon: LogoutIcon,
  },
];

/* =========================================================
   PERSONAL INFORMATION
========================================================= */

const PersonalInformation = () => {
  const [fields, setFields] = useState({
    companyName: "James & Co.",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
    role: "Agent",
  });

  const [activeField, setActiveField] = useState(null);

  const openEditModal = (key, label, value) => {
    setActiveField({ key, label, value });
  };

  const closeEditModal = () => {
    setActiveField(null);
  };

  const handleSave = (key, newValue) => {
    setFields((prev) => ({ ...prev, [key]: newValue }));
    closeEditModal();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="relative">
          <img
            src={ProfileImg}
            alt="profile"
            className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover border-2 border-gray-100"
          />

          <button
            type="button"
            className="absolute bottom-2 right-2 bg-gray-200 rounded-full p-2 shadow hover:bg-gray-300 transition cursor-pointer"
          >
            <img src={EditIcon} alt="edit" className="w-4 h-4" />
          </button>
        </div>

        <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
          {fields.companyName}
        </span>
      </div>

      {/* Company Name */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
            Company Name
          </span>
          <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main} break-words`}>
            {fields.companyName}
          </span>
        </div>

        <button
          onClick={() => openEditModal("companyName", "Company Name", fields.companyName)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer shrink-0"
        >
          <img src={EditIcon} alt="edit" className="w-4 h-4" />
        </button>
      </div>

      {/* Email (no edit) */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
            Email
          </span>
          <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main} break-words`}>
            mustapha@gmail.com
          </span>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
            Phone Number
          </span>
          <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main} break-words`}>
            {fields.phone}
          </span>
        </div>

        <button
          onClick={() => openEditModal("phone", "Phone Number", fields.phone)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer shrink-0"
        >
          <img src={EditIcon} alt="edit" className="w-4 h-4" />
        </button>
      </div>

      {/* Address */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
            Address
          </span>
          <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main} break-words`}>
            {fields.address}
          </span>
        </div>

        <button
          onClick={() => openEditModal("address", "Address", fields.address)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer shrink-0"
        >
          <img src={EditIcon} alt="edit" className="w-4 h-4" />
        </button>
      </div>

      {/* Role */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
            Role
          </span>
          <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main} break-words`}>
            {fields.role}
          </span>
        </div>

        <button
          onClick={() => openEditModal("role", "Role", fields.role)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer shrink-0"
        >
          <img src={EditIcon} alt="edit" className="w-4 h-4" />
        </button>
      </div>

      {/* Edit modal */}
      {activeField && (
        <SettingsModal
          type="details"
          field={activeField.label}
          value={activeField.value}
          onClose={closeEditModal}
          onSave={(newValue) => handleSave(activeField.key, newValue)}
        />
      )}
    </div>
  );
};

/* =========================================================
   MANAGED PROPERTIES
========================================================= */

const ManagedProperties = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [bank, setBank] = useState(null);

  const handleSaveBank = (bankDetails) => {
    setBank(bankDetails);
    setShowWalletModal(false);
  };

  return (
    <div className="flex flex-col gap-5 py-5">
      <p className={`${fontSize.lg} ${fontWeight.medium} ${textColor.primary800} ${fontFamily.main}`}>
        Linked Bank
      </p>

      <div className="flex flex-col gap-4">
        {!bank ? (
          <button
            onClick={() => setShowWalletModal(true)}
            className="bg-white rounded-[10px] shadow border border-[#CCCCCCB2] p-4 sm:p-5 flex flex-col gap-4 cursor-pointer hover:shadow-md transition text-left"
          >
            <div>
              <div className="flex gap-2 items-center">
                <img src={BankIcon} alt="bank" />
                <h1 className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary}`}>
                  Add Bank
                </h1>
              </div>

              <div className="flex justify-between pl-10 mt-2">
                <p className="text-gray-400">***********</p>
                <div>
                  <img src={blueIcon} alt="add bank" />
                </div>
              </div>
            </div>
          </button>
        ) : (
          <div className="bg-white rounded-[10px] shadow border border-[#CCCCCCB2] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img src={BankIcon} alt="bank" className="w-8 h-8 shrink-0" />
                <div className="min-w-0">
                  <h1 className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} truncate`}>
                    {bank.bankName}
                  </h1>
                  <p className={`${fontSize.xs} ${textColor.secondary} mt-1 truncate`}>
                    {bank.accountName}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center shrink-0">
                <img src={blueIcon} alt="bank added" />
              </div>
            </div>

            <div className="mt-4 pl-0 sm:pl-11">
              <p className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary}`}>
                Account Number
              </p>
              <p className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} mt-1`}>
                {bank.accountNumber}
              </p>
            </div>
          </div>
        )}
      </div>

      {showWalletModal && (
        <WalletModal onClose={() => setShowWalletModal(false)} onSave={handleSaveBank} />
      )}
    </div>
  );
};

/* =========================================================
   REFERRALS
========================================================= */

const Referrals = () => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <div
          style={{
            background: "linear-gradient(135deg, #6B7FD4 0%, #8B9FE8 100%)",
          }}
          className="rounded-md p-5 md:p-10 w-full xl:w-160 h-auto sm:h-40"
        >
          <div className="flex items-center justify-between gap-3">
            <h1 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.white} ${fontFamily.main}`}>
              Reward Balance
            </h1>
            <h1 className={`${fontSize["4xl"]} ${fontWeight.medium} ${textColor.white} ${fontFamily.main}`}>
              5
            </h1>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className={`${fontSize["4xl"]} ${fontWeight.medium} ${textColor.white} ${fontFamily.main} mt-2`}>
              ₦25,000
            </p>
            <p className={`${fontSize.sm} ${fontWeight.normal} ${textColor.white} ${fontFamily.main} mt-2`}>
              Referrals
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-8">
        <p className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main}`}>
          Invite and Earn
        </p>
        <p className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary} mt-1`}>
          Share your referral invite link with friends and receive reward bonuses
          instantly inside your balance wallet upon their sign-up verification check!
        </p>
      </div>

      <div className="flex justify-center my-8">
        <img src={TransferIcon} alt="" />
      </div>

      <div className="flex justify-center my-2">
        <InviteCode code="OLAGE2025" />
      </div>
    </div>
  );
};

/* =========================================================
   SECURITY
========================================================= */

const Security = () => {
  const [hasPin, setHasPin] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const securityItems = [
    {
      id: "password",
      label: "Login Password",
      sub: "Change your login password",
      icon: LoginPwdIcon,
    },
    {
      id: "pin",
      label: "Transaction PIN",
      sub: "Update or reset your transaction PIN",
      icon: LoginPwdIcon,
    },
  ];

  return (
    <div className="flex flex-col gap-5 xl:px-12 lg:px-8 md:px-4 px-2">
      {securityItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex flex-col gap-1 min-w-0">
            <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
              {item.label}
            </span>
            <span className={`${fontSize.xs} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}>
              {item.sub}
            </span>
          </div>

          <button
            onClick={() => setActiveModal(item.id)}
            className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer shrink-0"
          >
            <img src={item.icon} alt={item.label} />
          </button>
        </div>
      ))}

      <div className="flex justify-center mt-10 opacity-10">
        <img src={SecurityBgIcon} alt="security" className="mt-10 w-32 sm:w-auto" />
      </div>

      {activeModal === "password" && (
        <SettingsModal type="password" onClose={() => setActiveModal(null)} onSave={() => setActiveModal(null)} />
      )}

      {activeModal === "pin" && (
        <SettingsModal
          type="pin"
          hasPin={hasPin}
          onClose={() => setActiveModal(null)}
          onSave={() => {
            setHasPin(true);
            setActiveModal(null);
          }}
        />
      )}
    </div>
  );
};

/* =========================================================
   CONTACT US
========================================================= */

const ContactUs = () => {
  return (
    <div className="flex flex-col h-full">
      <div>
        <ContactChat variant="settings" />
      </div>
    </div>
  );
};

/* =========================================================
   SETTINGS LAYOUT
========================================================= */

const SettingsLayout = () => {
  const [active, setActive] = useState("personal");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleMenu = (id) => {
    if (id === "logout") {
      setShowLogoutModal(true);
      return;
    }

    setActive(id);
    setMobileDetailOpen(true);
  };

  const handleLogout = () => {
    // TODO: wire to real logout logic (clear auth, redirect, etc.)
    setShowLogoutModal(false);
  };

  const contentMap = {
    personal: <PersonalInformation />,
    properties: <ManagedProperties />,
    referrals: <Referrals />,
    security: <Security />,
    contact: <ContactUs />,
  };

  const activeItem = menuItems.find((item) => item.id === active);

  return (
    <div className="xl:mt-0 lg:mt-0 mt-12">
      <Wrapper>
        {/* =================================================
            MOBILE
        ================================================= */}
        <div className="lg:hidden">
          {!mobileDetailOpen ? (
            <div className="flex flex-col gap-6">
              {/* Profile */}
              <div className="flex flex-col items-center gap-2 mt-2">
                <div className="relative">
                  <img
                    src={ProfileImg}
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border border-gray-100"
                  />
                  <button className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition cursor-pointer">
                    <img src={EditIcon} alt="edit" className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                  James & Co.
                </span>
              </div>

              {/* Menu */}
              <div className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenu(item.id)}
                    className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm text-left transition hover:bg-gray-50 cursor-pointer"
                  >
                    <img src={item.icon} alt={item.label} className="w-5 h-5 shrink-0" />
                    <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.primary} ${fontFamily.main}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Back */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileDetailOpen(false)}
                  aria-label="Go back"
                  className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="#05062F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                  {activeItem?.label}
                </span>
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 flex-1 flex flex-col">
                {contentMap[active]}
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            DESKTOP
        ================================================= */}
        <div className="hidden lg:flex gap-6 items-stretch">
          <div className="flex w-100 shrink-0 bg-white shadow-[100px_100px_100px_100px_rgba(0,0,0,0.1)] rounded-2xl p-5 flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <img
                  src={ProfileImg}
                  alt="profile"
                  className="w-50 h-50 rounded-full object-cover border border-gray-100"
                />
              </div>

              <span className={`${fontSize.md} ${fontWeight.bold} ${textColor.primaryDark} ${fontFamily.main}`}>
                James & Co.
              </span>
            </div>

            <div className="w-full flex flex-col gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenu(item.id)}
                  className={`
                    flex items-center gap-3 px-4 py-5 w-full text-left
                    transition duration-200 whitespace-nowrap
                    shadow-sm rounded-xl cursor-pointer
                    ${active === item.id ? "bg-[#DBE8FD]" : "bg-white hover:bg-gray-50"}
                  `}
                >
                  <img src={item.icon} alt={item.label} className="w-5 h-5 shrink-0" />
                  <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.primary} ${fontFamily.main}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            className={`flex-1 bg-white shadow-[100px_100px_100px_100px_rgba(0,0,0,0.1)] rounded-2xl px-20 py-5 flex flex-col gap-6 ${fontFamily.main} h-full`}
          >
            <div className="flex-1 flex flex-col h-full">{contentMap[active]}</div>
          </div>
        </div>
      </Wrapper>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <SettingsModal type="logout" onClose={() => setShowLogoutModal(false)} onSave={handleLogout} />
      )}
    </div>
  );
};

export default SettingsLayout;