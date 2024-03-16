import React from "react";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";
import AddTodo from "./components/AddTodo";
import Footer from "./components/Footer";

function index() {
  return (
    <>
      <Navbar />
      <AddTodo />
      <Todo />
      <Footer />
    </>
  );
}

export default index;
