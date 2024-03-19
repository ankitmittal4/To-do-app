import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../features/todo/todoSlice";
import { setImageURL } from "../features/todo/todoSlice";
import { setActiveUser } from "../features/todo/todoSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    console.log("File : ", file);
    setProfilePicture(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("profile Picture:", profilePicture);
    // console.log("Image URL :", imageUrl);

    try {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profilePicture", profilePicture);

      const response = await axios.post(
        "https://to-do-0j63.onrender.com/api/user/signup",
        formData,
        {
          Headers: {
            "content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Signup successful : ", response.data);
      // console.log("Signup Token : ", response.data.data.token);

      const imageURL = response.data.data.profilePicture;
      console.log("Signup Profile picture : ", imageURL);

      const token = response.data.data.accessToken;
      console.log("Signup successful : Token : ", token);

      const name = response.data.data.name;
      console.log("Signup successful : Username : ", name);

      if (name) {
        // dispatch(setActiveUser(name));
        localStorage.setItem("username", name);
      }

      if (imageURL) {
        dispatch(setImageURL(imageURL));
        localStorage.setItem("image", imageURL);
      }
      if (response.data) {
        setSuccessMsg(true);
        setErrorMsg(false);
        dispatch(setToken(token));
        localStorage.setItem("token", token);
        navigate("/");
      }

      //redirect or display success msg
    } catch (error) {
      console.error("Signup Failed", error.response);

      if (error.response.request.status === 400) {
        setErrorMsg(true);
        setSuccessMsg(false);
      }
      //displays error msg to user
    }
  };
  return (
    <div className="min-h-screen bg-gray-300 px-4 sm:px-6 lg:px-8 py-3">
      {successMsg ? (
        <p className="text-xl font-medium text-green-600 inline-block">
          ---- Sign Up Successful ----
          <Link
            to="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          ></Link>
        </p>
      ) : errorMsg ? (
        <p className="text-xl font-medium text-red-500  inline-block">
          Email already exists !!!
        </p>
      ) : (
        <p></p>
      )}
      <div className="flex flex-col lg:flex-row justify-evenly bg-gray-300 py-3">
        <div className="flex flex-col justify-top lg:w-1/3 lg:ml-12">
          <h2 className="mt-0 lg:mt-10 mb-10 lg:mb-12 text-center lg:text-center text-3xl lg:text-5xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <div className="flex justify-center lg:justify-start">
            <img
              src="https://images.pexels.com/photos/10718307/pexels-photo-10718307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="w-full h-4/5 lg:w-auto lg:h-auto rounded-md hidden lg:block"
            />
          </div>
        </div>
        <div className="max-w-md w-full space-y-1 mx-auto">
          <div className="flex justify-center lg:justify-center mb-1">
            <img
              src={imageUrl}
              alt="Random Profile"
              className="w-24 h-24 mx-auto lg:mx-auto rounded-full mb-0"
            />
          </div>

          <div className="flex flex-col mb-24">
            {/* <span className="text-gray-500 text-sm mb-1">No file chosen</span> */}
            <label
              htmlFor="profile-picture"
              className="cursor-pointer px-3 py-2 focus:outline-none mt-0 text-blue-600"
            >
              Upload Image
            </label>
            <input
              id="profile-picture"
              name="profile-picture"
              type="file"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>

          <form className="mt-8 space-y-9" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={handleUsernameChange}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-4"
                  placeholder="Username"
                />
              </div>
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
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-4"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt"
              >
                Sign Up
              </button>
            </div>
            <div>
              <span>Already have an account? </span>

              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
