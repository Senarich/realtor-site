import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import keys from "./images/keys.jpg";
import OAuth from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, { displayName: name });

      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      // toast.success("Sign up was successful");
      navigate("/");
    } catch (error) {
      toast.error("something went wrong with the registration");
    }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={keys} alt="keys" className="rounded-[18px]" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out mb-6"
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full Name"
            />
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out mb-6"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
            />
            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white rounded transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className=" absolute top-3 right-3 text-xl cursor-pointer"
                  onClick={() => setshowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className=" absolute top-3 right-3 text-xl cursor-pointer"
                  onClick={() => setshowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Have an account?
                <Link
                  to="/sign-in"
                  className="ml-[4px] text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                >
                  Sign In
                </Link>
              </p>
              <Link
                to="/forgotpassword"
                className="ml-[3px] text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
              >
                Forgot Password
              </Link>
            </div>
            <button
              className="w-full bg-blue-600 px-7 py-3 text-white text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 hover:shadow-lg active:bg-blue-900"
              type="submit"
            >
              Sign Up
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
