import React from "react";
import { Link } from "react-router-dom";
function NoLogin() {
  return (
    <div className="mt-12">
      <p className="text-xl font-medium text-gray-800 inline-block mb-0">
        <span>Please </span>
        <Link
          to="/signup"
          className="font-medium text-blue-300 hover:text-blue-500 underline"
        >
          SignUp
        </Link>
        <span> / </span>
        <Link
          to="/login"
          className="font-medium text-blue-300 hover:text-blue-500 underline"
        >
          Login
        </Link>
      </p>

      <div className="flex justify-evenly mt-12 ">
        <img
          src="https://www.stock-app.info/media/wp-content/uploads/2022/06/ToDo-%E3%83%AA%E3%82%B9%E3%83%88-%E7%B6%9A%E3%81%8B%E3%81%AA%E3%81%84.jpg"
          className=" rounded-md h-auto w-10/12 sm:w-1/3 lg:w-1/3 md:w-1/3"
        />
      </div>
    </div>
  );
}

export default NoLogin;
