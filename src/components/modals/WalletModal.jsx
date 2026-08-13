import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import Button from "../Button";

const WalletModal = ({ onClose, onSave }) => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const handleSave = () => {
    if (!bankName || !accountNumber || !accountName) return;

    onSave({
      bankName,
      accountNumber,
      accountName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#05062F]">
            Add Bank Account
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add your bank account to receive payments.
          </p>
        </div>


           {/* Account Number */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-[#05062F]">
            Account Number
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter account number"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
          />
        </div>

        {/* Bank */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-[#05062F]">
            Bank Name
          </label>

          <div className="relative">
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
            >
              <option value="">Select bank</option>
              <option value="Access Bank">Access Bank</option>
              <option value="GTBank">GTBank</option>
              <option value="First Bank">First Bank</option>
              <option value="UBA">UBA</option>
              <option value="Zenith Bank">Zenith Bank</option>
              <option value="Opay">Opay</option>
              <option value="Moniepoint">Moniepoint</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

     

        {/* Account Name */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-[#05062F]">
            Account Name
          </label>

          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Enter account name"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#3B82F6]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center">
          <Button
            text="Save Bank"
            onClick={handleSave}
            disabled={!bankName || !accountNumber || !accountName}
            bgColor= "bg-[#05062F]"
            width="257px"
            height="50px"
          />
            
          {/* <button
            onClick={handleSave}
            disabled={!bankName || !accountNumber || !accountName}
            className="flex-1 rounded-lg w-[257px] h-[50px] bg-[#2563EB] py-3 text-sm font-medium text-white hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Save Bank
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;