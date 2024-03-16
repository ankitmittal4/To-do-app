import React, { useEffect, useState } from "react";
// import "./style.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../features/todo/todoSlice";
const Header = () => {
  const [profilePicture, setProfilePicture] = useState(
    "https://i.pinimg.com/736x/b1/88/c6/b188c6801ad1d71d3c962c6e4aa2d0cf.jpg"
  );
  const [username, setUsername] = useState("Ankit");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const tokenId = localStorage.getItem("token");
    if (tokenId) {
      dispatch(setToken(tokenId));
    }
  }, []);
  // console.log("Token in Navbar : ", token);

  // const imageURL = useSelector((state) => state.imageURL);
  useEffect(() => {
    const profileImageURL = localStorage.getItem("image");
    if (profileImageURL) {
      // console.log("Image in Navbar: ", profileImageURL);
      setProfilePicture(profileImageURL);
    }
  }, [profilePicture]);

  useEffect(() => {
    const activeUser = localStorage.getItem("username");
    if (activeUser) {
      // console.log("Image in Navbar: ", profileImageURL);
      setUsername(activeUser);
    }
  }, []);

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://user-images.githubusercontent.com/1711854/28282651-29665d66-6af9-11e7-96d1-e9346a836007.png"
            alt="Project Logo"
            className="h-8 mr-2"
          />
          <span className="text-white text-lg font-bold">To-Do App</span>
        </div>
        <div>
          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Sign/Up
              </Link>
            </>
          ) : (
            <div className="flex justify-center mb-1 items-center">
              <img
                src={profilePicture}
                // src="http://res.cloudinary.com/video-tube/image/upload/v1710526120/zvvckjcwowhg98lzo4nu.png"
                alt="Random Profile"
                className="w-8 h-8 rounded-full"
              />
              <p className="text-white justify-center text-center max-w-md w-full pl-2 pr-8">
                Hello, {username}
              </p>
              <Link
                to="/logout"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default Header;
