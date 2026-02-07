// SignUp Page
import React, { useContext, useState } from "react";
import AuthLayout from "../../Components/AuthLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Input.jsx";
import { validateEmail } from "../../Utils/helper.js";
import axiosInstance from "../../Utils/axiosInstance.js";
import { API_PATHS } from "../../Utils/apiPath.js";
import { UserContext } from "../../context/userContext.jsx";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md -mt-4 mx-auto w-full px-6 flex flex-col">
        <div className="text-center">
          <h3 className="text-3xl mt-10 font-semibold text-gray-900 tracking-tight">
            Create an Account
          </h3>
          <p className="mt-1 mb-10 text-sm text-gray-500">
            Sign up to start tracking your income and expenses.
          </p>
        </div>

        <form onSubmit={handleOnSignUp} className="space-y-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Full Name"
                placeholder="Enter full name"
                type="text"
              />
            </div>

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="text"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-md text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white text-sm font-medium shadow-md
              ${
                loading
                  ? "bg-violet-400 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700"
              }
            `}
          >
            {loading ? "Creating Account..." : "SIGN UP"}
          </button>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 font-medium text-violet-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
