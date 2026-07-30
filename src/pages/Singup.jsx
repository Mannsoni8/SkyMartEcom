import {
  ArrowRight,
  Bolt,
  User,
  Mail,
  Lock,
  Eye,
  Zap,
  EyeOff,
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";
import { Slide, toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const { registerUsers, setRegisterUsers, showPassword, setShowPassword } =
    useContext(MyShop);
  let {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const pass = watch("password", "");
  const getPasswordStrength = () => {
    let strength = 0;

    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    return strength;
  };

  const ps = getPasswordStrength();

  const formSubmit = (data) => {
    const userExists = registerUsers.some((user) => user.email === data.email);

    if (userExists) {
      toast.error("Email already registered!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    delete data.confirmPassword;

    const arr = [...registerUsers, data];

    setRegisterUsers(arr);

    localStorage.setItem("registerUsers", JSON.stringify(arr));

    toast.success("Singup successfully", {
      position: "top-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

    reset();

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4 py-4">
      <div className="relative w-full max-w-lg rounded-[32px] border border-white/10 bg-[#151515]/90 backdrop-blur-xl p-10 shadow-[0_0_60px_rgba(0,0,0,0.4)]">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-lime-400 flex items-center justify-center">
              <Zap className="text-black fill-black" size={22} />
            </div>

            <h1 className="text-3xl font-bold text-white">
              Sky<span className="text-lime-400">Mart</span>
            </h1>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>

          <p className="mt-2 text-sm text-gray-400">
            Join thousands of shoppers around the world.
          </p>
        </div>

        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          <div className="relative">
            <User
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="w-full h-12 rounded-xl bg-[#1D1D1D] border border-white/10 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-lime-400 outline-none"
            />

            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <Mail
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              className="w-full h-12 rounded-xl bg-[#1D1D1D] border border-white/10 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-lime-400 outline-none"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Lock
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: (value) =>
                  /[A-Z]/.test(value) || "Must contain one uppercase letter",
              })}
              className="w-full h-12 rounded-xl bg-[#1D1D1D] border border-white/10 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-lime-400 outline-none"
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-[#9ca3af] hover:text-white transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-[#9ca3af] hover:text-white transition-colors" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className={`h-1 flex-1 rounded-full ${
                  item <= ps
                    ? ps <= 2
                      ? "bg-red-400"
                      : ps <= 3
                        ? "bg-yellow-400"
                        : "bg-lime-400"
                    : "bg-white/10"
                }`}
              ></div>
            ))}

            <span
              className={`text-sm ${
                ps <= 2
                  ? "text-red-400"
                  : ps <= 3
                    ? "text-yellow-400"
                    : "text-lime-400"
              }`}
            >
              {pass ? (ps <= 2 ? "Weak" : ps <= 3 ? "Medium" : "Strong") : ""}
            </span>
          </div>

          <div className="relative">
            <Lock
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="w-full h-14 rounded-xl bg-[#1D1D1D] border border-white/10 pl-14 pr-4 text-white placeholder:text-gray-500 focus:border-lime-400 outline-none"
            />

            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={!isValid}
            className={`mt-3 w-full h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition ${
              isValid
                ? "bg-lime-400 text-black hover:scale-[1.02]"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            Create Account
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/")}
            className="ml-2 text-lime-400 hover:underline font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
