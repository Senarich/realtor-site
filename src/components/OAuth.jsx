import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <button className="w-full text-center flex justify-center items-center px-7 py-3 bg-red-700 rounded text-white uppercase text-sm font-medium hover:text-red-800 hover:shadow-lg active:text-red-900 active:shadow-lg transition duration-150 ease-in-out">
      <FcGoogle className="text-2xl bg-white rounded-full mr-2"/>
      Continue with google
    </button>
  );
}
