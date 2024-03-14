import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

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
    console.log("Usrrname:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("profile Picture:", profilePicture);
    console.log("Image URL :", imageUrl);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profilePicture", profilePicture);

      const response = await axios.post(
        "https://to-do-0j63.onrender.com/",
        formData,
        {
          Headers: {
            "content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Signup successful", response.data);
      //redirect or display success msg
    } catch (error) {
      console.error("Signup Failed", error);
      //displays error msg to user
    }
  };
  return (
    <div className="min-h-screen flex justify-evenly bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="flex flex-col justify-top w-1/3">
        <h2 className="mt-16 mb-16 text-center text-5xl font-extrabold text-gray-900 ">
          Create an Account
        </h2>
        <div className="flex justify-evenly">
          <img
            src="https://images.pexels.com/photos/10718307/pexels-photo-10718307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full h-4/5 rounded-md"
          />
        </div>
      </div>
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center mb-1">
            <img
              src={imageUrl}
              alt="Random Profile"
              className="w-24 h-24 rounded-full"
            />
          </div>

          <div className="flex flex-col">
            {/* <span className="text-gray-500 text-sm mb-1">No file chosen</span> */}
            <label
              htmlFor="profile-picture"
              className="cursor-pointer  px-3 py-2 focus:outline-none mt-0 text-blue-600"
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

          {/* <h2 className="mt-14 mb-16 text-center text-4xl font-extrabold text-gray-900">
            Create an Account
          </h2> */}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-8"
            >
              Sign Up
            </button>
          </div>
          <div>
            <span>Already have an account? </span>

            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
