import React, { useState, useRef } from "react";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../styles/theme";
import Button from "../Button";

const PinBoxes = ({
  value,
  setter,
  refs,
  onChangeDigit,
  onKeyDownDigit,
  onPasteDigits,
}) => (
  <div
    className="flex gap-2 sm:gap-3"
    onPaste={(event) => onPasteDigits(event, setter, refs, value.length)}
  >
    {value.map((digit, index) => (
      <input
        key={index}
        ref={(element) => {
          refs.current[index] = element;
        }}
        type="password"
        inputMode="numeric"
        maxLength={1}
        value={digit}
        onChange={(event) =>
          onChangeDigit(event.target.value, index, setter, value, refs)
        }
        onKeyDown={(event) => onKeyDownDigit(index, event, value, setter, refs)}
        className="w-full max-w-[80px] h-12 sm:h-14 border border-gray-200 rounded-lg text-center text-lg outline-none bg-gray-50 focus:border-[#05062F] transition duration-200"
      />
    ))}
  </div>
);

const SettingsModal = ({
  onClose,
  onSave,
  onConfirmLogout, // 👈 Added logout confirmation callback handler
  field,
  value,
  type,
  item,
  hasPin = false,
  successTitle = "Success",
  successMessage = "Your changes have been saved successfully.",
}) => {
  const [detailInput, setDetailInput] = useState(value || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [currentPin, setCurrentPin] = useState(["", "", "", ""]);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);

  const currentPinRefs = useRef([]);
  const pinRefs = useRef([]);
  const confirmPinRefs = useRef([]);

  const handlePinChange = (rawValue, index, setter, state, refs) => {
    const digitsOnly = rawValue.replace(/\D/g, "");
    const singleDigit = digitsOnly ? digitsOnly.slice(-1) : "";

    const updated = [...state];
    updated[index] = singleDigit;
    setter(updated);

    if (singleDigit && index < state.length - 1) {
      requestAnimationFrame(() => {
        refs.current[index + 1]?.focus();
      });
    }
  };

  const handlePinKeyDown = (index, event, state, setter, refs) => {
    if (event.key === "Backspace" && !state[index] && index > 0) {
      event.preventDefault();
      const updated = [...state];
      updated[index - 1] = "";
      setter(updated);
      refs.current[index - 1]?.focus();
    }
  };

  const handlePinPaste = (event, setter, refs, length = 4) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasted) return;

    const newDigits = Array(length).fill("");
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setter(newDigits);

    const focusIndex = Math.min(pasted.length, length - 1);
    requestAnimationFrame(() => {
      refs.current[focusIndex]?.focus();
    });
  };

  const propertyRows = item
    ? [
        { label: "Amount", value: item.amount },
        { label: "ROI", value: item.roi },
        { label: "Duration", value: item.duration },
        { label: "Interest Earned", value: item.interestEarned },
        { label: "Transaction ID", value: item.transactionId },
        { label: "Date", value: item.date || item.rawDate },
      ]
    : [];

  const primaryButtonProps = {
    width: "w-full",
    height: "h-[48px]",
    bgColor: "bg-[#05062F]",
    hoverBgColor: "hover:bg-[#0c0f4f]",
    textColor: "text-white",
    rounded: "rounded-xl",
    fontWeight: "font-semibold",
    fontSize: "text-sm",
    className: "cursor-pointer transition-all duration-200 active:scale-95",
  };

  const dangerButtonProps = {
    width: "w-full",
    height: "h-[48px]",
    bgColor: "bg-[#E02020]",
    hoverBgColor: "hover:bg-[#c81919]",
    textColor: "text-white",
    rounded: "rounded-xl",
    fontWeight: "font-semibold",
    fontSize: "text-sm",
    className: "cursor-pointer transition-all duration-200 active:scale-95",
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 ${fontFamily.main}`}
    >
      {/* EDIT DETAILS */}
      {type === "details" && (
        <div className="bg-white rounded-[20px] w-full max-w-[420px] flex flex-col items-center relative shadow-xl p-6 sm:p-8 gap-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-[#0f1c3f]">Edit {field}</h2>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-[#0f1c3f] font-medium">
              {field}
            </label>
            <input
              type="text"
              value={detailInput}
              onChange={(event) => setDetailInput(event.target.value)}
              autoComplete="off"
              className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-800 w-full bg-gray-50 focus:border-[#05062F] transition duration-200"
            />
          </div>
          <Button
            onClick={() => onSave?.(detailInput)}
            text="Save"
            {...primaryButtonProps}
          />
        </div>
      )}

      {/* CHANGE PASSWORD */}
      {type === "password" && (
        <div className="bg-white rounded-[20px] w-full max-w-[420px] flex flex-col items-center relative shadow-xl p-6 sm:p-8 gap-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-[#0f1c3f]">Change Password</h2>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-[#0f1c3f] font-medium">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                autoComplete="off"
                className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-800 w-full bg-gray-50 focus:border-[#05062F] transition duration-200"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-[#0f1c3f] font-medium">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="off"
                className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-800 w-full bg-gray-50 focus:border-[#05062F] transition duration-200"
              />
            </div>
          </div>
          <Button
            onClick={() => onSave?.({ oldPassword, newPassword })}
            text="Save"
            {...primaryButtonProps}
          />
        </div>
      )}

      {/* TRANSACTION PIN */}
      {type === "pin" && (
        <div className="bg-white rounded-[20px] w-full max-w-[425px] flex flex-col items-center relative shadow-xl p-6 sm:p-8 gap-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-[#0f1c3f] text-center">
            {hasPin ? "Update Transaction PIN" : "Set Transaction PIN"}
          </h2>
          <div className="w-full flex flex-col gap-4">
            {hasPin && (
              <div className="flex flex-col gap-2 pb-2 border-b border-gray-100">
                <label className="text-sm text-[#0f1c3f] font-medium">
                  Current Transaction PIN
                </label>
                <PinBoxes
                  value={currentPin}
                  setter={setCurrentPin}
                  refs={currentPinRefs}
                  onChangeDigit={handlePinChange}
                  onKeyDownDigit={handlePinKeyDown}
                  onPasteDigits={handlePinPaste}
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#0f1c3f] font-medium">
                {hasPin ? "New Transaction PIN" : "Transaction PIN"}
              </label>
              <PinBoxes
                value={pin}
                setter={setPin}
                refs={pinRefs}
                onChangeDigit={handlePinChange}
                onKeyDownDigit={handlePinKeyDown}
                onPasteDigits={handlePinPaste}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#0f1c3f] font-medium">
                {hasPin ? "Confirm New PIN" : "Confirm Transaction PIN"}
              </label>
              <PinBoxes
                value={confirmPin}
                setter={setConfirmPin}
                refs={confirmPinRefs}
                onChangeDigit={handlePinChange}
                onKeyDownDigit={handlePinKeyDown}
                onPasteDigits={handlePinPaste}
              />
            </div>
          </div>
          <Button
            onClick={() =>
              onSave?.({
                currentPin: currentPin.join(""),
                pin: pin.join(""),
                confirmPin: confirmPin.join(""),
              })
            }
            text={hasPin ? "Update PIN" : "Save"}
            {...primaryButtonProps}
          />
        </div>
      )}

      {/* LOGOUT CONFIRMATION MODAL */}
      {type === "logout" && (
        <div className="bg-white rounded-[20px] w-full max-w-[380px] flex flex-col items-center relative shadow-xl p-6 sm:p-8 gap-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-[#0f1c3f]">Confirm Logout</h2>
          <p className="text-sm text-gray-500">
            Are you sure you want to log out of your account?
          </p>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onClose}
              className="flex-1 h-11 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer transition"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirmLogout?.()}
              className="flex-1 h-11 bg-[#E02020] text-white rounded-xl text-sm font-semibold hover:bg-[#c81919] cursor-pointer transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* PROPERTY SUMMARY */}
      {type === "property" && item && (
        <div className="bg-white rounded-[20px] w-full max-w-[430px] flex flex-col relative shadow-xl p-6 sm:p-8 gap-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p
            className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary} pr-8`}
          >
            {item.name || item.title}
          </p>
          <div className="flex flex-col gap-4">
            {propertyRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3"
              >
                <p
                  className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary}`}
                >
                  {row.label}
                </p>
                <p
                  className={`${fontSize.sm} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary} text-right break-all`}
                >
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUCCESS */}
      {type === "success" && (
        <div className="bg-white rounded-[20px] w-full max-w-[380px] flex flex-col relative shadow-xl p-6 sm:p-8 gap-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-[#0f1c3f] pr-6">
            {successTitle}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            {successMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default SettingsModal;
