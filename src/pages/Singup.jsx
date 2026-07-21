import { ArrowRight, Bolt, User, Mail, Lock, Eye } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { MyShop } from "../context/MyContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const { registerUsers, setRegisterUsers } = useContext(MyShop);
  let {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
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

    toast.success("Account created successfully!", {
      position: "bottom-right",
      autoClose: 3000,
    });

    reset();

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}

        <div className="mb-10 flex justify-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400">
              <Bolt className="fill-black text-black" size={20} />
            </div>

            <h1 className="text-4xl font-bold text-white">
              Sky<span className="text-lime-400">Mart</span>
            </h1>
          </div>
        </div>

        {/* Card */}

        <div className="rounded-[30px] border border-[#2a2a2a] bg-[#151515] p-10 shadow-2xl">
          <h2 className="text-5xl font-bold text-white">Create account</h2>

          <p className="mt-2 text-lg text-gray-500">
            Join SkyMart and start shopping
          </p>

          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="relative mt-10">
              <User
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                autoComplete="name"
                placeholder="Full name"
                {...register("name", {
                  required: "Full name is required",
                  pattern: {
                    value: /^[A-Za-z ]{3,30}$/,
                    message: "Enter a valid full name",
                  },
                })}
                className="h-16 w-full rounded-2xl border border-[#343434] bg-[#1f1f1f] pl-14 pr-5 text-lg text-white outline-none placeholder:text-gray-500 focus:border-lime-400"
              />

              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div className="relative mt-5">
              <Mail
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                autoComplete="username"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                    message: "Please enter a valid email",
                  },
                })}
                className="h-16 w-full rounded-2xl border border-[#343434] bg-[#1f1f1f] pl-14 pr-5 text-lg text-white outline-none placeholder:text-gray-500 focus:border-lime-400"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div className="relative mt-5">
              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/,
                    message:
                      "Min 8 chars, uppercase, lowercase, number & special character",
                  },
                })}
                className="h-16 w-full rounded-2xl border border-[#343434] bg-[#1f1f1f] pl-14 pr-14 text-lg text-white outline-none placeholder:text-gray-500 focus:border-lime-400"
              />

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

              <Eye
                size={18}
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-1.5 flex-1 rounded-full bg-yellow-400"></div>

              <div className="h-1.5 flex-1 rounded-full bg-yellow-400"></div>

              <div className="h-1.5 flex-1 rounded-full bg-[#333333]"></div>

              <span className="text-yellow-400 font-medium">Medium</span>
            </div>

            <div className="relative mt-6">
              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="password"
                autoComplete="new-password"
                placeholder="Confirm password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="h-16 w-full rounded-2xl border border-[#343434] bg-[#1f1f1f] pl-14 pr-5 text-lg text-white outline-none placeholder:text-gray-500 focus:border-lime-400"
              />

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`mt-8 flex h-16 w-full items-center justify-center gap-3 rounded-2xl text-2xl font-semibold transition ${
                isValid
                  ? "bg-lime-400 text-black hover:bg-lime-300"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Create Account
              <ArrowRight size={24} />
            </button>
          </form>

          <div className="mt-8 text-center text-lg text-gray-500">
            Already have an account?
            <button
              onClick={() => navigate("/")}
              type="button"
              className="ml-2 cursor-pointer font-semibold text-lime-400 hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
