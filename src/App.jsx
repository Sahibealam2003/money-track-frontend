import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RotateLoader } from "react-spinners";

// Lazy load pages
const Home = lazy(() => import("./pages/Dashboard/Home"));
const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Income = lazy(() => import("./pages/Dashboard/Income"));
const Expense = lazy(() => import("./pages/Dashboard/Expense"));

// Check login or not
const Root = () => {
  const isAuth = !!localStorage.getItem("token");
  return isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[90vh]">
            <RotateLoader color="#a47cd3" size={50} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </Suspense>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </>
  );
};

export default App;
