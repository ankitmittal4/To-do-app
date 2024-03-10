import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <AddTodo />
      <Todo />
    </>
  );
}

export default App;
