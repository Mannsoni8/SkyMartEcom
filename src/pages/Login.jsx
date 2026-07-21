import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, ArrowRight, Zap } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const { registerUsers, setLoggedInUser } = useContext(MyShop);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    let user = registerUsers.find((val) => {
      return val.email === data.email && val.password === data.password;
    });
    if (!user) {
      toast.error("Invalid credentials!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      reset();
      return;
    }

    setLoggedInUser(user);
    localStorage.setItem("loggedinUser", JSON.stringify(user));

    toast.success("Login successful!", {
      position: "bottom-right",
      autoClose: 3000,
    });

    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  return (
    // Main container uses flex-row on large screens for a strict side-by-side layout
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans text-[#f3f4f6] bg-[#0a0a0a]">
      {/* Left Column - Hero Section */}
      {/* Added border-r for the divider line and relative positioning for the gradient glow */}
      <div className="relative w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24 lg:border-r lg:border-[#1e1e1e] overflow-hidden">
        {/* Subtle Background Gradient/Glow Effect */}
        <div className="absolute top-1/4 -left-32 w-[40rem] h-[40rem] bg-[#befd26] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />

        {/* Content Container (z-10 to stay above the glow) */}
        <div className="relative z-10 w-full max-w-xl mx-auto lg:mx-0">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-[#befd26] rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" fill="black" />
            </div>
            <span className="text-3xl font-semibold text-[#f3f4f6]">
              SkyMart
            </span>
          </div>

          {/* Main Text */}
          <div className="mb-10 space-y-4">
            <p className="text-sm font-semibold text-[#befd26] tracking-widest uppercase">
              Welcome Back
            </p>
            <h1 className="text-5xl md:text-[4rem] font-bold leading-tight">
              Shop the future. <br />
              <span className="text-[#befd26]">Today.</span>
            </h1>
          </div>

          {/* Paragraph Text */}
          <p className="text-lg text-[#9ca3af] max-w-md mb-16 leading-relaxed">
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
          </p>

          {/* Stats Boxes */}
          <div className="grid grid-cols-3 gap-4 md:gap-5">
            {[
              { value: "20K+", label: "Products" },
              { value: "50K+", label: "Users" },
              { value: "4.9★", label: "Rating" },
            ].map((stat, index) => (
              <div
                key={index}
                className="border border-[#262626] rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm"
              >
                <span className="text-2xl md:text-3xl font-bold text-[#befd26] mb-1">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-[#9ca3af]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16 md:px-16 bg-[#0a0a0a]">
        <div className="bg-[#111111] border border-[#262626] rounded-[2rem] p-8 md:p-12 w-full max-w-[28rem]">
          {/* Form Header */}
          <h2 className="text-[2rem] font-semibold text-[#f3f4f6] mb-3">
            Sign in
          </h2>
          <p className="text-[#9ca3af] mb-10 text-base">
            Enter your credentials to continue
          </p>

          {/* Form using React Hook Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#9ca3af] group-focus-within:text-[#f3f4f6] transition-colors" />
              </div>
              <input
                type="email"
                autoComplete="username"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-[#262626] rounded-xl text-[#f3f4f6] placeholder-[#6b7280] focus:outline-none focus:ring-1 focus:ring-[#befd26] focus:border-[#befd26] transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 absolute -bottom-6 left-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative group !mt-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#9ca3af] group-focus-within:text-[#f3f4f6] transition-colors" />
              </div>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number, and special character",
                  },
                })}
                className="w-full pl-12 pr-12 py-4 bg-[#1a1a1a] border border-[#262626] rounded-xl text-[#f3f4f6] placeholder-[#6b7280] focus:outline-none focus:ring-1 focus:ring-[#befd26] focus:border-[#befd26] transition-all"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <Eye className="h-5 w-5 text-[#9ca3af] hover:text-[#f3f4f6] transition-colors" />
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 absolute -bottom-6 left-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#befd26] text-black font-semibold py-4 rounded-xl flex items-center justify-center gap-2.5 mt-10 transition-all hover:bg-[#d4ff59] active:scale-[0.98]"
            >
              <span className="text-base">Sign in</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          {/* Bottom Link */}
          <div className="text-center text-[#9ca3af] mt-10 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#befd26] font-medium hover:underline ml-1"
            >
              Create one
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
