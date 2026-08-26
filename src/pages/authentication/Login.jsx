import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/newcep.png";
import Button from "../../components/Button";
import { fontFamily } from "../../styles/theme";
import { useAuthStore } from "../../stores/auth.store";
import api from "../../api/axios"; // Adjust path to your axios instance

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (localErrors[name] || localErrors._global)
      setLocalErrors((prev) => ({
        ...prev,
        [name]: undefined,
        _global: undefined,
      }));
  };

  const getFieldError = (fieldName) => {
    if (localErrors[fieldName]) return localErrors[fieldName];
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

  const validate = () => {
    const errors = {};
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      errors.email = "Enter a valid email";
    if (!form.password) errors.password = "Password is required";
    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Connect to your backend login endpoint
      const response = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      const { access_token, user } = response.data;

      // 🔒 STRICT CHECK: Reject if user is not an AGENT
      if (user.role !== "AGENT") {
        logout();
        setLocalErrors({
          _global: "Access restricted. Only Agent accounts can log in here.",
        });
        setIsLoading(false);
        return;
      }

      setAuth(user, access_token);
      navigate("/app", { replace: true });
    } catch (error) {
      setIsLoading(false);
      setLocalErrors({
        _global:
          error.response?.data?.message ||
          "Invalid login credentials. Please try again.",
      });
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 ${fontFamily.main}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-36 w-full lg:w-auto">
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={logo}
            alt="Cepromas Logo"
            className="w-[280px] lg:w-[500px] object-contain"
          />
        </div>

        <div className="bg-white w-full max-w-[520px] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#F1F1F1] px-6 sm:px-10 py-10 sm:py-12">
          <div className="text-center mb-10">
            <h2 className="text-[22px] font-semibold text-[#111827]">
              Agent Portal Login
            </h2>
            <p className="text-[#6B7280] text-[13px] leading-5 mt-2">
              Log in to manage properties, investments,
              <br />
              and track platform analytics.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {getFieldError("_global") && (
              <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {getFieldError("_global")}
              </div>
            )}

            <div className="mb-5">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="enter email"
                className={getInputClass("email")}
                value={form.email}
                onChange={handleChange}
              />
              {getFieldError("email") && (
                <p className="text-xs text-red-600 mt-1">
                  {getFieldError("email")}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  className={getInputClass("password") + " pr-10"}
                  value={form.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
              </div>
              {getFieldError("password") && (
                <p className="text-xs text-red-600 mt-1">
                  {getFieldError("password")}
                </p>
              )}
            </div>

            <div className="flex justify-end mt-3 mb-8">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-[13px] text-[#2540A8] font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              text={isLoading ? "Logging in..." : "Login"}
              bgColor="bg-[#02024D]"
              width="100%"
              height="48px"
              rounded="md"
              className="text-white text-sm font-medium hover:opacity-90 transition"
              type="submit"
              disabled={!form.email.trim() || !form.password || isLoading}
            />

            <p className="text-center text-sm text-[#6B7280] mt-6">
              Don't have an agent account?{" "}
              <span
                onClick={() => navigate("/sign-up")}
                className="text-[#3658C9] font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
