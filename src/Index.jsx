import React from "react";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";
import AddTodo from "./components/AddTodo";

function index() {
  return (
    <>
      <Navbar />
      <AddTodo />
      <Todo />
    </>
  );
}

export default index;
