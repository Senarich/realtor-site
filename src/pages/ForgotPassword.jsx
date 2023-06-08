import React, { useState } from "react";
import { Link } from "react-router-dom";
import keys from "./images/keys.jpg";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password </h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={keys} alt="keys" className="rounded-[18px]" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form action="" onSubmit={onSubmit}>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out mb-6"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="ml-[4px] text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                >
                  Register
                </Link>
              </p>
              <Link
                to="/sign-in"
                className="ml-[3px] text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
              >
                Sing in instead
              </Link>
            </div>
            <button
              className="w-full bg-blue-600 px-7 py-3 text-white text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 hover:shadow-lg active:bg-blue-900"
              type="submit"
            >
              Reset Password
            </button>
            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300  after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center mx-4 font-semibold">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
