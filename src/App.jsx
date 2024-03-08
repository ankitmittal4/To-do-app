import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Header from "./components/Header";
function App() {
  return (
    <>
      {/* <Header /> */}
      <h1>Redux Toolkit</h1>
      <AddTodo />
      <Todo />
    </>
  );
}

export default App;
