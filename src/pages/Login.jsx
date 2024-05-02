import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../features/todo/todoSlice";
import { setActiveUser } from "../features/todo/todoSlice";
import { setImageURL } from "../features/todo/todoSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loginError, setLoginError] = useState("Account Not Found!!!");

  const [showMessage, setShowMessage] = useState(false);

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    // console.log("Email:", email);
    // console.log("Password:", password);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://to-do-u5b3.onrender.com/api/user/login",
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
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate("/");
        }, 1000);
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
        setLoginError(error.response.data.message);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      }
      //displays error msg to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen   bg-gray-300 py-1 px-4 sm:px-6 lg:px-4">
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-white text-4xl"
            />
          </div>
        )}

        {/* Animation message */}
        {showMessage && (
          <div className="fixed top-0 right-0 mx-auto w-full max-w-sm mt-4 z-10 flex justify-center max-h-20">
            {successMsg ? (
              <p className="text-1xl font-medium text-white sm-text-center mt-4 animate-slide-in-right">
                <span className="px-4 py-3 rounded bg-green-500 shadow-lg  shadow-green-500/50">
                  Login Successful
                </span>
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:text-blue-500"
                ></Link>
              </p>
            ) : errorMsg ? (
              <p className="text-1xl font-medium text-white sm-text-center mt-4 animate-slide-in-right ">
                <span className="bg-red-500 px-12 py-3 rounded shadow-lg  shadow-red-500/50 ">
                  {loginError}
                </span>
              </p>
            ) : (
              <p></p>
            )}
          </div>
        )}

        {/* Login div starts*/}
        <div className="flex justify-center mt-20">
          <div className="w-full sm:max-w-md space-y-8">
            <div>
              <h2 className="mt-7 mb-16 text-center text-4xl font-extrabold text-gray-900">
                Welcome Back!
              </h2>
            </div>
            <form className="mt-7 space-y-6" onSubmit={handleSubmit}>
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
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-4"
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
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end text-sm">
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-8"
                >
                  Login
                </button>
              </div>
              <div className="text-center">
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
    </>
  );
};

export default Login;
