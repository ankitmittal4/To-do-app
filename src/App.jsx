import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
function App() {
  return (
    <>
      {/* <Navbar />
      <AddTodo />
      <Todo /> */}
      {/* <Login /> */}
      <Signup />
    </>
  );
}

export default App;
