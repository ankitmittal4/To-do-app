import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/todo/todoSlice";
import { setActiveUser } from "../features/todo/todoSlice";
import { setImageURL } from "../features/todo/todoSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://to-do-0j63.onrender.com/api/user/login",
        formData
      );
      const token = response.data.data.accessToken;
      const username = response.data.data.name;
      const imageURL = response.data.data.profilePicture;
      // console.log("Login successful : Token", token);
      console.log("Login successful", response.data);
      if (token) {
        setSuccessMsg(true);
        setErrorMsg(false);

        dispatch(setToken(token));
        localStorage.setItem("token", token);

        dispatch(setActiveUser(username));
        localStorage.setItem("username", username);
        if (imageURL) {
          dispatch(setImageURL(imageURL));
          localStorage.setItem("image", imageURL);
        }

        navigate("/");
      }
      // else {
      //   setErrorMsg(true);
      //   setSuccessMsg(false);
      // }

      //redirect or display success msg
    } catch (error) {
      console.error("Login Failed", error.response);

      if (error.response.request.status === 400) {
        setErrorMsg(true);
        setSuccessMsg(false);
      }
      //displays error msg to user
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {successMsg ? (
        <p className="text-xl font-medium text-green-600 inline-block">
          ---- Login Successful ----
          <Link
            to="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          ></Link>
        </p>
      ) : errorMsg ? (
        <p className="text-xl font-medium text-red-500  inline-block ">
          Account not found !!!
        </p>
      ) : (
        <p></p>
      )}
      <div className="flex justify-center">
        <div className="max-w-md w-full space-y-8 ">
          <div>
            <h2 className="mt-16 mb-16 text-center text-4xl font-extrabold text-gray-900">
              Welcome Back!
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-4"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-8"
              >
                Login
              </button>
            </div>
            <div>
              <span>New User? </span>

              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
