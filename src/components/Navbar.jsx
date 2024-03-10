import React from "react";
// import "./style.css";
const Header = () => {
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
            Sign/Up
          </button>
        </div>
      </nav>
    </>
  );
};
export default Header;
