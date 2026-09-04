import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Wrapper from "../../components/Wrapper";
import ProfileImg from "../../assets/images/profile.png";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../styles/theme";
import TransferIcon from "../../assets/icons/transfericon.png";
import PersonalIcon from "../../assets/icons/UserCircle.png";
import ReferralIcon from "../../assets/icons/UsersFour.png";
import SecurityIcon from "../../assets/icons/Keyhole.png";
import HouseIcon from "../../assets/icons/House.png";
import ContactIcon from "../../assets/icons/PhoneCall.png";
import LogoutIcon from "../../assets/icons/SignOut.png";
import EditIcon from "../../assets/icons/PencilSimpleLine.png";
import InviteCode from "./InviteCode";
import LoginPwdIcon from "../../assets/icons/LoginPwd.png";
import SettingsModal from "../../components/modals/SettingsModal";
import WalletModal from "../../components/modals/WalletModal";
import SecurityBgIcon from "../../assets/icons/securityicon.png";
import Button from "../../components/Button";
import { useAuthStore } from "../../stores/auth.store";
import toast from "react-hot-toast";

// Hooks
import { useProfile, useUpdateProfile } from "../../hooks/profile/useProfile";
import {
  useChangePassword,
  useSetTransactionPin,
} from "../../hooks/profile/useSecurity";
import { useReferrals } from "../../hooks/profile/useReferrals";
import { useSubmitKyc } from "../../hooks/profile/useKyc";

import BankIcon from "../../assets/icons/addbankicon.png";
import blueIcon from "../../assets/icons/blueicon.png";
import AtIcon from "../../assets/icons/at.png";
import Callicon from "../../assets/icons/call.png";
import LiveChat from "../../assets/icons/live.png";
import Xicon from "../../assets/icons/xpng.png";
import Iicon from "../../assets/icons/insta.png";
import Licon from "../../assets/icons/link.png";
import Ficon from "../../assets/icons/fb.png";

const menuItems = [
  { id: "personal", label: "Company Information", icon: PersonalIcon },
  { id: "properties", label: "Wallet", icon: HouseIcon },
  { id: "referrals", label: "Referrals", icon: ReferralIcon },
  { id: "security", label: "Security", icon: SecurityIcon },
  { id: "contact", label: "Support", icon: ContactIcon },
  { id: "logout", label: "Logout", icon: LogoutIcon },
];

/* =========================================================
   COMPANY INFORMATION (Personal Information Form)
========================================================= */
const PersonalInformation = ({ autoOpenKyc = false }) => {
  const [editField, setEditField] = useState(null);
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [kycNin, setKycNin] = useState("");
  const [kycFile, setKycFile] = useState(null);

  const { data: user, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { mutate: submitKyc, isPending: isKycSubmitting } = useSubmitKyc();

  const avatarInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    occupation: "",
    nin: "",
    state: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "James & Co.",
        email: user.email || "mustapha@gmail.com",
        phoneNumber: user.phoneNumber || "+234 801 234 5678",
        address: user.address || "Lagos, Nigeria",
        occupation: user.occupation || "Agent",
        nin: user.nin || "",
        state: user.state || "",
      });
      if (user.nin) setKycNin(user.nin);
    }
  }, [user]);

  useEffect(() => {
    if (autoOpenKyc) {
      setKycModalOpen(true);
    }
  }, [autoOpenKyc]);

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const payload = new FormData();
    payload.append("file", file);

    const toastId = toast.loading("Uploading new company logo...");

    updateProfile(payload, {
      onSuccess: () => {
        toast.success("Company logo updated successfully!", { id: toastId });
        if (avatarInputRef.current) avatarInputRef.current.value = "";
      },
      onError: (err) => {
        const msg = err.response?.data?.message || "Failed to upload image.";
        toast.error(msg, { id: toastId });
      },
    });
  };

  const handleKycSubmit = (e) => {
    e.preventDefault();
    if (!kycNin || kycNin.length !== 11) {
      toast.error("Please enter a valid 11-digit NIN.");
      return;
    }

    const payload = new FormData();
    payload.append("nin", kycNin);
    if (kycFile) payload.append("file", kycFile);

    submitKyc(payload, {
      onSuccess: () => {
        toast.success("KYC details submitted successfully!");
        setKycModalOpen(false);
        setKycFile(null);
      },
      onError: (err) => {
        const msg =
          err.response?.data?.message || "Failed to submit KYC verification.";
        toast.error(msg);
      },
    });
  };

  const isKycVerified = user?.isKycVerified;
  const kycStatus =
    user?.kycStatus || (isKycVerified ? "VERIFIED" : "UNVERIFIED");

  const personalFields = [
    { label: "Company Name", key: "fullName", value: formData.fullName },
    { label: "Email", key: "email", value: formData.email, readonly: true },
    { label: "Phone Number", key: "phoneNumber", value: formData.phoneNumber },
    { label: "Address", key: "address", value: formData.address },
    { label: "Role", key: "occupation", value: formData.occupation },
    {
      label: "NIN / KYC Status",
      key: "nin",
      value: (
        <div className="flex items-center gap-2">
          <span>{formData.nin || "Not Provided"}</span>
          {isKycVerified ? (
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              ✓ Verified
            </span>
          ) : kycStatus === "PENDING" ? (
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              ⏳ Verification Pending
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setKycModalOpen(true)}
              className="bg-red-100 text-red-600 hover:bg-red-200 text-xs font-bold px-2.5 py-0.5 rounded-full transition cursor-pointer"
            >
              Verify KYC Now
            </button>
          )}
        </div>
      ),
      readonly: true,
    },
  ];

  const handleDirectUpdate = (updatedPayload) => {
    updateProfile(updatedPayload, {
      onSuccess: () => {
        setEditField(null);
      },
    });
  };

  const handleSaveAll = () => {
    const payload = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      occupation: formData.occupation,
      nin: formData.nin,
      state: formData.state,
    };
    updateProfile(payload);
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        type="file"
        ref={avatarInputRef}
        onChange={handleAvatarFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Profile / Company Logo */}
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="relative">
          <img
            src={user?.faceCaptureUrl || ProfileImg}
            alt="profile"
            className="w-40 h-40 rounded-full object-cover border-2 border-gray-100 shadow-sm"
          />
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            disabled={isPending}
            className="absolute bottom-2 right-2 bg-gray-200 rounded-full p-2 shadow hover:bg-gray-300 transition cursor-pointer disabled:opacity-50"
            title="Change Company Logo"
          >
            <img src={EditIcon} alt="edit" className="w-4 h-4" />
          </button>
        </div>
        <span
          className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
        >
          {formData.fullName}
        </span>
      </div>

      {personalFields.map((field) => (
        <div
          key={field.label}
          className="flex items-center justify-between border-b border-gray-100 pb-4"
        >
          <div className="flex flex-col gap-1">
            <span
              className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
            >
              {field.label}
            </span>
            <div
              className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}
            >
              {field.value}
            </div>
          </div>
          {!field.readonly && (
            <button
              onClick={() => setEditField(field)}
              className="p-2 rounded-full bg-gray-100 transition cursor-pointer hover:bg-gray-200"
            >
              <img src={EditIcon} alt="edit" className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}

      {editField && (
        <SettingsModal
          type="details"
          field={editField.label}
          value={editField.value}
          isPending={isPending}
          onClose={() => setEditField(null)}
          onSave={(newValue) => {
            setFormData((prev) => ({ ...prev, [editField.key]: newValue }));
            handleDirectUpdate({ [editField.key]: newValue });
          }}
        />
      )}

      {kycModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-md flex flex-col gap-4 relative shadow-2xl">
            <button
              onClick={() => setKycModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-[#05062F] text-center">
              KYC Verification
            </h2>
            <p className="text-xs text-gray-500 text-center -mt-2">
              Submit your National Identification Number (NIN) to unlock
              management privileges.
            </p>

            <form
              onSubmit={handleKycSubmit}
              className="flex flex-col gap-4 mt-2"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#05062F]">
                  NIN (11 Digits)
                </label>
                <input
                  type="text"
                  maxLength={11}
                  required
                  placeholder="e.g. 12345678901"
                  value={kycNin}
                  onChange={(e) => setKycNin(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 h-11 text-sm outline-none focus:border-[#05062F]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#05062F]">
                  Upload Selfie / Document Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setKycFile(e.target.files?.[0] || null)}
                  className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#05062F] hover:file:bg-blue-100 cursor-pointer"
                />
              </div>

              <Button
                text={
                  isKycSubmitting ? "Submitting..." : "Submit KYC Verification"
                }
                type="submit"
                disabled={isKycSubmitting}
                bg="bg-[#05062F]"
                width="w-full"
                height="h-[46px]"
                rounded="rounded-xl"
                className="text-white text-sm font-semibold mt-2 disabled:opacity-50 cursor-pointer"
              />
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Button
          text={isPending ? "Saving..." : "Save Changes"}
          bg="bg-[#05062F]"
          width="w-[330px]"
          height="h-[50px]"
          disabled={isPending}
          rounded="rounded-[10px]"
          className={`text-white ${fontSize.md} ${fontWeight.medium} ${fontFamily.main} cursor-pointer`}
          onClick={handleSaveAll}
        />
      </div>
    </div>
  );
};

/* =========================================================
   MANAGED PROPERTIES (Wallet / Linked Bank Accounts)
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
      <p
        className={`${fontSize.lg} ${fontWeight.medium} ${textColor.primary800} ${fontFamily.main}`}
      >
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
                <h1
                  className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary}`}
                >
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
          <div className="bg-white rounded-[10px] shadow border border-[#CCCCCCB2] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={BankIcon} alt="bank" className="w-8 h-8" />
                <div>
                  <h1
                    className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary}`}
                  >
                    {bank.bankName}
                  </h1>
                  <p className={`${fontSize.xs} ${textColor.secondary} mt-1`}>
                    {bank.accountName}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <img src={blueIcon} alt="bank added" />
              </div>
            </div>

            <div className="mt-4 pl-0 sm:pl-11">
              <p className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary}`}>
                Account Number
              </p>
              <p
                className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} mt-1`}
              >
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
  const { data: user } = useProfile();
  const { data: referralData } = useReferrals();

  const rewardBalance = referralData?.rewardBalance ?? user?.rewardBalance ?? 0;
  const referralCount = referralData?.numberOfReferrals ?? 0;
  const inviteCode =
    referralData?.inviteCode || user?.referralCode || "JAMES2025";

  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <div
          style={{
            background: "linear-gradient(135deg, #6B7FD4 0%, #8B9FE8 100%)",
          }}
          className="rounded-md p-5 md:p-10 w-full xl:w-160 h-auto sm:h-40"
        >
          <div className="flex items-center justify-between">
            <h1
              className={`${fontSize.lg} ${fontWeight.normal} ${textColor.white} ${fontFamily.main}`}
            >
              Reward Balance
            </h1>
            <h1
              className={`${fontSize["4xl"]} ${fontWeight.medium} ${textColor.white} ${fontFamily.main}`}
            >
              {referralCount}
            </h1>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`${fontSize["4xl"]} ${fontWeight.medium} ${textColor.white} ${fontFamily.main} mt-2`}
            >
              ₦{Number(rewardBalance).toLocaleString()}
            </p>
            <p
              className={`${fontSize.sm} ${fontWeight.normal} ${textColor.white} ${fontFamily.main} mt-2`}
            >
              Referrals
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-8">
        <p className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main}`}>
          Invite and Earn
        </p>
        <p
          className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary} mt-1`}
        >
          Share your referral invite link with friends and receive reward
          bonuses instantly inside your balance wallet upon their sign-up
          verification check!
        </p>
      </div>

      <div className="flex justify-center my-8">
        <img src={TransferIcon} alt="" />
      </div>

      <div className="flex justify-center my-2">
        <InviteCode code={inviteCode} />
      </div>
    </div>
  );
};

/* =========================================================
   SECURITY
========================================================= */
const Security = ({ autoOpenPin = false }) => {
  const [securityModal, setSecurityModal] = useState(null);
  const queryClient = useQueryClient();

  const { data: user, refetch: refetchProfile } = useProfile();
  const { mutate: changePassword, isPending: passwordPending } =
    useChangePassword();
  const { mutate: setPin, isPending: pinPending } = useSetTransactionPin();

  const hasPin = Boolean(user?.transactionPin);

  const securityItems = [
    {
      id: "Login Password",
      label: "Login Password",
      sub: "Change your login password",
      icon: LoginPwdIcon,
    },
    {
      id: "Transaction Pin",
      label: "Transaction PIN",
      sub: hasPin
        ? "Update or reset your existing transaction PIN"
        : "Set transaction pin",
      icon: LoginPwdIcon,
      badge: hasPin ? (
        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
          ✓ PIN Set
        </span>
      ) : (
        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
          ⚠️ Not Set
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (autoOpenPin) {
      setSecurityModal("Transaction Pin");
    }
  }, [autoOpenPin]);

  return (
    <div className="flex flex-col gap-5 xl:px-12 lg:px-8 md:px-4 px-2">
      {securityItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b border-gray-100 pb-4"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
              >
                {item.label}
              </span>
              {item.badge}
            </div>
            <span
              className={`${fontSize.xs} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}
            >
              {item.sub}
            </span>
          </div>
          <button
            onClick={() => setSecurityModal(item.id)}
            className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
          >
            <img src={item.icon} alt={item.label} />
          </button>
        </div>
      ))}

      <div className="flex justify-center mt-10 opacity-10">
        <img src={SecurityBgIcon} alt="security" className="mt-10" />
      </div>

      {securityModal === "Login Password" && (
        <SettingsModal
          type="password"
          isPending={passwordPending}
          onClose={() => setSecurityModal(null)}
          onSubmitPassword={(dto) => {
            changePassword(dto, {
              onSuccess: () => setSecurityModal(null),
            });
          }}
        />
      )}

      {securityModal === "Transaction Pin" && (
        <SettingsModal
          type="pin"
          hasPin={hasPin}
          isPending={pinPending}
          onClose={() => setSecurityModal(null)}
          onSubmitPin={(dto) => {
            setPin(dto, {
              onSuccess: () => {
                toast.success(
                  hasPin
                    ? "Transaction PIN updated successfully!"
                    : "Transaction PIN set successfully!",
                );
                setSecurityModal(null);
                queryClient.invalidateQueries({ queryKey: ["profile"] });
                queryClient.invalidateQueries({ queryKey: ["user"] });
                refetchProfile();
              },
              onError: (err) => {
                const msg =
                  err?.response?.data?.message ||
                  "Failed to update transaction PIN.";
                toast.error(msg);
              },
            });
          }}
        />
      )}
    </div>
  );
};

/* =========================================================
   SUPPORT / CONTACT US
========================================================= */
const ContactUs = () => (
  <div className="flex flex-col h-full">
    <div>
      <h1 className="text-[#05062F] font-semibold text-[24px]">Support</h1>
      <p className="w-3/6 mt-2 text-gray-500 text-sm">
        We’re here to help! Reach out to us anytime for support, questions, or
        feedback.
      </p>

      <div className="mt-5 flex flex-col gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-3">
          <img src={AtIcon} alt="" />
          <p>Companyname@gmail.com</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={Callicon} alt="" />
          <p>+234 123 456 7890</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={LiveChat} alt="" />
          <p>Live Chat</p>
        </div>
      </div>

      <div className="mt-13 text-center">
        <h1 className="font-semibold text-[#05062F] text-[16px]">
          Social Media Handle
        </h1>
        <div className="flex justify-center gap-4 mt-2 cursor-pointer">
          <img src={Xicon} alt="Twitter" />
          <img src={Iicon} alt="Instagram" />
          <img src={Licon} alt="LinkedIn" />
          <img src={Ficon} alt="Facebook" />
        </div>
      </div>
    </div>
  </div>
);

/* =========================================================
   SETTINGS LAYOUT (Admin / Agent Dashboard)
========================================================= */
const SettingsLayout = () => {
  const [active, setActive] = useState("personal");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const { data: user } = useProfile();
  const { mutate: updateProfile, isPending: isAvatarPending } =
    useUpdateProfile();

  const panelAvatarInputRef = useRef(null);

  const shouldAutoOpenKyc = Boolean(location.state?.openKyc);
  const shouldAutoOpenPin = Boolean(location.state?.openPin);

  useEffect(() => {
    if (shouldAutoOpenKyc) {
      setActive("personal");
      setMobileDetailOpen(true);
    } else if (shouldAutoOpenPin) {
      setActive("security");
      setMobileDetailOpen(true);
    }
  }, [shouldAutoOpenKyc, shouldAutoOpenPin]);

  const handleMenu = (id) => {
    if (id === "logout") {
      setShowLogout(true);
      return;
    }
    setActive(id);
    setMobileDetailOpen(true);
  };

  const handleConfirmLogout = () => {
    setShowLogout(false);
    logout();
    navigate("/", { replace: true });
  };

  const handlePanelAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const payload = new FormData();
    payload.append("file", file);

    const toastId = toast.loading("Uploading new company logo...");

    updateProfile(payload, {
      onSuccess: () => {
        toast.success("Company logo updated successfully!", { id: toastId });
        if (panelAvatarInputRef.current) panelAvatarInputRef.current.value = "";
      },
      onError: (err) => {
        const msg = err.response?.data?.message || "Failed to upload image.";
        toast.error(msg, { id: toastId });
      },
    });
  };

  const contentMap = {
    personal: <PersonalInformation autoOpenKyc={shouldAutoOpenKyc} />,
    properties: <ManagedProperties />,
    referrals: <Referrals />,
    security: <Security autoOpenPin={shouldAutoOpenPin} />,
    contact: <ContactUs />,
    logout: null,
  };

  const activeItem = menuItems.find((item) => item.id === active);

  return (
    <div>
      <input
        type="file"
        ref={panelAvatarInputRef}
        onChange={handlePanelAvatarFileChange}
        accept="image/*"
        className="hidden"
      />

      <Wrapper>
        {/* =================================================
            MOBILE
        ================================================= */}
        <div className="lg:hidden">
          {!mobileDetailOpen ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 mt-2">
                <div className="relative">
                  <img
                    src={user?.faceCaptureUrl || ProfileImg}
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border border-gray-100"
                  />
                  <button
                    onClick={() => panelAvatarInputRef.current?.click()}
                    disabled={isAvatarPending}
                    className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
                  >
                    <img src={EditIcon} alt="edit" className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span
                  className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
                >
                  {user?.fullName || "James & Co."}
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenu(item.id)}
                    className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm text-left transition hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-5 h-5 shrink-0"
                    />
                    <span
                      className={`${fontSize.sm} ${fontWeight.normal} ${textColor.primary} ${fontFamily.main}`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileDetailOpen(false)}
                  aria-label="Go back"
                  className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                  // aria-label="Back"
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
                <span
                  className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
                >
                  {activeItem?.label}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 flex-1 flex flex-col">
                {contentMap[active]}
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            DESKTOP
        ================================================= */}
        <div className="hidden lg:flex gap-6 items-stretch">
          {/* LEFT SIDEBAR */}
          <div className="flex w-100 shrink-0 bg-white shadow-[100px_100px_100px_100px_rgba(0,0,0,0.1)] rounded-2xl p-5 flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <img
                  src={user?.faceCaptureUrl || ProfileImg}
                  alt="profile"
                  className="w-50 h-50 rounded-full object-cover border border-gray-100 shadow-sm"
                />
                <button
                  onClick={() => panelAvatarInputRef.current?.click()}
                  disabled={isAvatarPending}
                  className="absolute bottom-5 right-10 bg-white rounded-full p-1.5 shadow hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
                  title="Change Company Logo"
                >
                  <img src={EditIcon} alt="edit" className="w-3.5 h-3.5" />
                </button>
              </div>
              <span
                className={`${fontSize.md} ${fontWeight.bold} ${textColor.primaryDark || textColor.primary} ${fontFamily.main}`}
              >
                {user?.fullName || "James & Co."}
              </span>
            </div>

            {/* Menu */}
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
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-5 h-5 shrink-0"
                  />
                  <span
                    className={`${fontSize.sm} ${fontWeight.normal} ${textColor.primary} ${fontFamily.main}`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div
            className={`flex-1 bg-white shadow-[100px_100px_100px_100px_rgba(0,0,0,0.1)] rounded-2xl px-20 py-5 flex flex-col gap-6 ${fontFamily.main} h-full`}
          >
            <div className="flex-1 flex flex-col h-full">
              {contentMap[active]}
            </div>
          </div>
        </div>

        {showLogout && (
          <SettingsModal
            type="logout"
            onClose={() => setShowLogout(false)}
            onConfirmLogout={handleConfirmLogout}
          />
        )}
      </Wrapper>
    </div>
  );
};

export default SettingsLayout;
