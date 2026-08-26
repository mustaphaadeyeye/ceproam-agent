import React, { useMemo, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/newcep.png";
import Button from "../../components/Button";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../styles/theme";
import Face from "../../assets/icons/faceid.png";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const SignUp = () => {
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [skipFaceCapture, setSkipFaceCapture] = useState(false);
  const navigate = useNavigate();

  const [localErrors, setLocalErrors] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    referralCode: "",
    occupation: "",
    state: "",
    role: "AGENT", // 🔒 Set to AGENT by default and hidden from UI
    password: "",
    confirmPassword: "",
    nin: "",
    faceCaptureUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (localErrors[name] || localErrors._global)
      setLocalErrors((p) => ({ ...p, [name]: undefined, _global: undefined }));
  };

  const getFieldError = (fieldName) => {
    if (localErrors && localErrors[fieldName]) return localErrors[fieldName];
    return null;
  };

  const getInputClass = (fieldName) => {
    const hasError = !!getFieldError(fieldName);
    return `w-full h-[48px] px-4 bg-[#F8FAFC] rounded-md outline-none text-sm placeholder:text-gray-300 transition duration-200 ${
      hasError
        ? "border border-red-500 focus:border-red-500"
        : "border border-[#E5E7EB] focus:border-[#2540A8]"
    }`;
  };

  const isActionDisabled = useMemo(() => {
    if (step === 1) {
      return (
        !form.fullName.trim() ||
        !form.email.trim() ||
        !form.phoneNumber.trim() ||
        !form.address.trim() ||
        !agreed
      );
    }
    if (step === 2) {
      return (
        !form.occupation.trim() ||
        !form.state ||
        !form.password ||
        !form.confirmPassword ||
        form.password !== form.confirmPassword
      );
    }
    if (step === 3) {
      return !form.nin.trim() || !/^[0-9]{6,16}$/.test(form.nin.trim());
    }
    if (step === 4) {
      return !form.faceCaptureUrl && !skipFaceCapture;
    }
    return true;
  }, [step, form, agreed, skipFaceCapture]);

  const validateStepOne = () => {
    const errs = {};
    if (!form.fullName || !form.fullName.trim())
      errs.fullName = "Full name is required";
    if (!form.email || !form.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.phoneNumber || !form.phoneNumber.trim())
      errs.phoneNumber = "Phone number is required";
    if (!form.address || !form.address.trim())
      errs.address = "Address is required";
    if (!agreed) errs._global = "You must agree to the Terms & Conditions";
    setLocalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStepTwo = () => {
    const errs = {};
    if (!form.occupation || !form.occupation.trim())
      errs.occupation = "Occupation is required";
    if (!form.state) errs.state = "Please select your state";
    if (!form.password) errs.password = "Password is required";
    if (!form.confirmPassword) errs.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setLocalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStepThree = () => {
    const errs = {};
    if (form.nin && !/^\d{6,16}$/.test(form.nin.trim()))
      errs.nin = "Enter a valid NIN (numbers only)";
    setLocalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStepFour = () => true;

  const handleSkipKyc = () => {
    if (step === 3) {
      setSkipFaceCapture(false);
      setLocalErrors({});
      setStep(4);
      return;
    }

    if (step === 4) {
      setSkipFaceCapture(true);
      setForm((p) => ({ ...p, faceCaptureUrl: "" }));
      setLocalErrors({});
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!validateStepOne()) return setStep(1);
      setLocalErrors({});
      setSkipFaceCapture(false);
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!validateStepTwo()) return setStep(2);
      setLocalErrors({});
      setSkipFaceCapture(false);
      setStep(3);
      return;
    }
    if (step === 3) {
      if (!validateStepThree()) return setStep(3);
      setLocalErrors({});
      setSkipFaceCapture(false);
      setStep(4);
      return;
    }
    if (step === 4) {
      if (!validateStepFour()) return;
    }

    const payload = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
      confirmPassword: form.confirmPassword,
      phoneNumber: form.phoneNumber.trim(),
      address: form.address.trim(),
      occupation: form.occupation.trim(),
      state: form.state,
      referralCode: form.referralCode.trim() || undefined,
      role: "AGENT", // 🔒 Explicitly locked to AGENT role for partner portal
      nin: form.nin?.trim() || "",
      faceCaptureUrl: form.faceCaptureUrl || "",
    };

    console.log("Agent Signup Payload:", payload);
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 py-6 ${fontFamily.main}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-32 w-full lg:w-auto">
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={logo}
            alt="Cepromas Logo"
            className="w-[280px] lg:w-[300px] object-contain"
          />
        </div>

        <div
          className={`w-full max-w-xl bg-white rounded-2xl shadow-sm ${
            step === 3 || step === 4 ? "py-16 p-12" : "py-12 p-12"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            {step !== 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                    setLocalErrors({});
                    if (step - 1 < 4) setSkipFaceCapture(false);
                  } else {
                    navigate("/");
                  }
                }}
                className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600"
                aria-label="Back"
              >
                <ArrowLeft size={12} />
              </button>
            ) : (
              <div />
            )}
            {(step === 3 || step === 4) && (
              <button
                type="button"
                onClick={handleSkipKyc}
                className="text-[#2540A8] text-sm font-semibold"
              >
                Skip
              </button>
            )}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-[22px] font-semibold text-[#111827]">
              {step === 1
                ? "Agent Signup"
                : step === 2
                  ? "Personal Information"
                  : "KYC"}
            </h2>

            <p className="text-[#6B7280] text-[13px] w-[50%] mx-auto leading-5 mt-2">
              {step === 1
                ? "Create your partner account to manage properties and investments."
                : step === 2
                  ? "Help us create a secure and professional experience for you."
                  : "Verify your identity to secure your management account."}
            </p>
            <div className="inline-flex items-center rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1 text-[12px] font-medium text-[#4B5563] mt-2">
              Step {step} of 4
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {getFieldError("_global") && (
              <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {getFieldError("_global")}
              </div>
            )}

            {step === 1 && (
              <>
                <label className="block text-xs text-[#6B7280] mt-2">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={getInputClass("fullName")}
                  placeholder="Enter full name"
                />
                {getFieldError("fullName") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("fullName")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={getInputClass("email")}
                  placeholder="Enter email"
                />
                {getFieldError("email") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("email")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className={getInputClass("phoneNumber")}
                  placeholder="Enter phone number"
                />
                {getFieldError("phoneNumber") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("phoneNumber")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Address
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className={getInputClass("address")}
                  placeholder="Enter address"
                />
                {getFieldError("address") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("address")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Referral Code{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  name="referralCode"
                  value={form.referralCode}
                  onChange={handleChange}
                  className={getInputClass("referralCode")}
                  placeholder="Enter referral code"
                />
                {getFieldError("referralCode") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("referralCode")}
                  </p>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="terms" className="text-sm text-[#6B7280]">
                    I agree to the Terms & Conditions
                  </label>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <label className="block text-xs text-[#6B7280] mt-2">
                  Occupation
                </label>
                <input
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className={getInputClass("occupation")}
                  placeholder="Enter occupation"
                />
                {getFieldError("occupation") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("occupation")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  State
                </label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={getInputClass("state")}
                >
                  <option value="">Select state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {getFieldError("state") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("state")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className={getInputClass("password")}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>

                <label className="block text-xs text-[#6B7280] mt-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={getInputClass("confirmPassword")}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <label className="block text-xs text-[#6B7280] mt-2">
                  National Identification Number (NIN)
                </label>
                <input
                  name="nin"
                  value={form.nin}
                  onChange={handleChange}
                  className={getInputClass("nin")}
                  placeholder="Enter NIN (optional)"
                />
                {getFieldError("nin") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("nin")}
                  </p>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full h-12 bg-[#02024D] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isActionDisabled}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <label className="block text-center text-xs text-[#6B7280] mt-2">
                  Face Capture (photo)
                </label>
                <div className="flex justify-center items-center mt-8 mb-8">
                  <img
                    src={Face}
                    alt="Face Scan Avatar"
                    className="w-[120px] h-[120px] object-contain"
                  />
                </div>
                {getFieldError("faceCaptureUrl") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("faceCaptureUrl")}
                  </p>
                )}
                {form.faceCaptureUrl && (
                  <img
                    src={form.faceCaptureUrl}
                    alt="preview"
                    className="h-20 w-20 object-cover rounded-md mt-3"
                  />
                )}

                <div className="mt-6">
                  <Button
                    type="submit"
                    text="Create Account"
                    bgColor="bg-[#02024D]"
                    width="100%"
                    height="48px"
                    rounded="md"
                    className="text-white"
                    disabled={isActionDisabled}
                  />
                </div>
              </>
            )}

            {(step === 1 || step === 2) && (
              <>
                <div className="mt-6">
                  <Button
                    type="submit"
                    text="Continue"
                    bgColor="bg-[#02024D]"
                    width="100%"
                    height="48px"
                    rounded="md"
                    className="text-white"
                    disabled={isActionDisabled}
                  />
                </div>

                <button
                  type="button"
                  className="w-full h-12 border rounded-md mt-3 flex items-center justify-center gap-3 text-sm"
                  onClick={() => {}}
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="w-4 h-4"
                  />
                  Continue with Google
                </button>

                <p className="text-center text-sm text-[#6B7280] mt-6">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/")}
                    className="text-[#3658C9] font-medium cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
