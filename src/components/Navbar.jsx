import React, { useEffect, useState } from "react";
// import "./style.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../features/todo/todoSlice";
import { setActiveUser } from "../features/todo/todoSlice";
import { setImageURL } from "../features/todo/todoSlice";
import { setTodos } from "../features/todo/todoSlice";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const [profilePicture, setProfilePicture] = useState(
    "https://i.pinimg.com/736x/b1/88/c6/b188c6801ad1d71d3c962c6e4aa2d0cf.jpg"
  );
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  useEffect(() => {
    const tokenId = localStorage.getItem("token");
    if (tokenId) {
      dispatch(setToken(tokenId));
    }
  }, [token]);
  // console.log("Token in Navbar : ", token);

  const profilename = useSelector((state) => state.name);
  useEffect(() => {
    const activeUser = localStorage.getItem("username");
    if (activeUser) {
      dispatch(setActiveUser(activeUser));
      setUsername(activeUser);
    }
  }, [profilename]);

  const imageURL = useSelector((state) => state.imageURL);
  useEffect(() => {
    const profileImageURL = localStorage.getItem("image");
    if (profileImageURL) {
      dispatch(setImageURL(profileImageURL));
      setProfilePicture(profileImageURL);
    }
  }, [imageURL]);

  const handleLogout = () => {
    dispatch(setToken(null));
    localStorage.setItem("token", "");

    dispatch(setActiveUser(null));
    localStorage.setItem("username", "");

    dispatch(setImageURL(null));
    localStorage.setItem("image", "");

    dispatch(setTodos([]));
    localStorage.setItem("todos", []);
  };

  return (
    <>
      <nav className="bg-gray-800 p-2 sm:p-3 flex justify-between items-center mb-0 ">
        <div className="flex items-center">
          <img
            src="https://user-images.githubusercontent.com/1711854/28282651-29665d66-6af9-11e7-96d1-e9346a836007.png"
            alt="Project Logo"
            className="h-6 sm:h-8 mr-2"
          />
          <span className="text-white text-base sm:text-lg font-bold">
            To-Do App
          </span>
          {/* <LogoutIcon className="text-white" /> */}
        </div>
        <div>
          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded text-xs sm:text-base"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded ml-2 sm:ml-4 text-xs sm:text-base"
              >
                Sign/Up
              </Link>
            </>
          ) : (
            <div className="flex  items-center">
              <img
                src={profilePicture}
                alt="Random Profile"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              />
              <p className="text-white ml-1 sm:ml-2 text-sm sm:text-base">
                <span className="hidden md:inline">Hello,</span>{" "}
                <span className="md:hidden lg:hidden">Hi,</span> {username}
              </p>
              <Link to="/" onClick={() => handleLogout()} className="">
                <span className="hidden md:inline bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded ml-2 sm:ml-4 text-xs sm:text-base">
                  Logout
                </span>{" "}
                <span className="md:hidden lg:hidden text-white  hover:bg-gray-700 font-bold ml-2 p-1 rounded pb-2">
                  <LogoutIcon />
                </span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default Header;
