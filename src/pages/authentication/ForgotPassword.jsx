import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/newcep.png";
import { useNavigate } from "react-router-dom";
import { fontSize, fontWeight, fontFamily, textColor } from "../../styles/theme";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const isOtpComplete = otp.every((value) => value.trim().length === 1);
  const canResetPassword =
    password.trim().length >= 6 &&
    confirmPassword.trim().length >= 6 &&
    password === confirmPassword;

  // Reusable utility class for your blue primary buttons to keep styles consistent
  const primaryButtonClass =
    "w-full h-12 bg-[#02024d] text-white rounded mt-10 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-[#040480] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none";

  return (
    <div className={`min-h-screen bg-[#f3f3f3] flex ${fontFamily.main}`}>
      {/* Left Side */}
      <div className="w-[45%] hidden lg:flex items-center justify-center">
        <img src={logo} alt="CEPROMAS" className="w-[320px] object-contain" />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-5">
        <div className="bg-white w-full max-w-[500px] min-h-[560px] rounded-[10px] shadow-lg p-7">
          <button
            className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600 transition-colors duration-200 hover:bg-gray-200"
            onClick={() => step > 1 && setStep(step - 1)}
          >
            <ArrowLeft size={12} />
          </button>

          {/* Step 1: Forgot Password */}
          {step === 1 && (
            <div className="mt-16">
              <div className="text-center">
                <h2 className="text-[20px] font-semibold text-[#111]">
                  Forgot Password
                </h2>
                <p className="text-[13px] text-gray-500 mt-3 leading-5">
                  We'll send you an OTP to reset your
                  <br />
                  password and get you moving again.
                </p>
              </div>

              <div className="mt-14">
                <label className="block text-[13px] text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="enter email"
                  className="w-full h-12 bg-[#f8f9fb] px-4 rounded outline-none text-sm border border-transparent focus:border-gray-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={() => {
                  if (!email.trim()) return;
                  // Backend submission removed — this is now a purely local,
                  // front-end-only flow. Wire this up to a request later if needed.
                  setStep(2);
                }}
                disabled={!email.trim()}
                className={primaryButtonClass}
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="mt-16">
              <div className="text-center">
                <h2 className="text-[20px] font-semibold text-[#111]">OTP</h2>
                <p className="text-[13px] text-gray-500 mt-3 leading-5">
                  Enter the 6-digit code we sent to your email
                  <br />
                  to continue.
                </p>
              </div>

              <div className="mt-14">
                <label className="block text-[13px] text-gray-600 mb-2">
                  OTP
                </label>

                <div className="flex gap-2">
                  {otp.map((val, idx) => (
                    <input
                      key={idx}
                      maxLength={1}
                      inputMode="numeric"
                      type="text"
                      value={val}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(-1);
                        setOtp((prev) => {
                          const copy = [...prev];
                          copy[idx] = v;
                          return copy;
                        });
                        setOtpError("");
                      }}
                      className="w-full h-12 bg-[#f8f9fb] rounded text-center outline-none border border-transparent focus:border-gray-200"
                    />
                  ))}
                </div>
                {otpError && (
                  <p className="mt-2 text-sm text-red-500">{otpError}</p>
                )}
              </div>

              <button
                onClick={() => {
                  if (!isOtpComplete) {
                    setOtpError("Enter the full 6-digit OTP code.");
                    return;
                  }
                  setStep(3);
                }}
                disabled={!isOtpComplete}
                className={primaryButtonClass}
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <div className="mt-16">
              <div className="text-center">
                <h2 className="text-[20px] font-semibold text-[#111]">
                  Reset Password
                </h2>
                <p className="text-[13px] text-gray-500 mt-3 leading-5">
                  Create a strong, secure password to keep
                  <br />
                  your account safe.
                </p>
              </div>

              <div className="mt-10">
                <label className="block text-[13px] text-gray-600 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="enter password"
                    className="w-full h-12 bg-[#f8f9fb] px-4 pr-12 rounded outline-none text-sm border border-transparent focus:border-gray-200"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-[13px] text-gray-600 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="confirm password"
                    className="w-full h-12 bg-[#f8f9fb] px-4 pr-12 rounded outline-none text-sm border border-transparent focus:border-gray-200"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError("");
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {passwordError && (
                <p className="mt-3 text-sm text-red-500">{passwordError}</p>
              )}

              <button
                onClick={() => {
                  if (!password.trim() || password !== confirmPassword) {
                    setPasswordError(
                      "Passwords must match and be at least 6 characters long.",
                    );
                    return;
                  }

                  // Backend submission removed — this is now a purely local,
                  // front-end-only flow. The collected data (email, otp, password)
                  // is available here if you need to wire it up to a request later.
                  navigate("/", { replace: true });
                }}
                disabled={!canResetPassword}
                className={primaryButtonClass}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;