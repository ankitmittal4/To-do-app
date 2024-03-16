import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import Footer from "./components/Footer";
import Index2 from "./Index2";
import { setToken } from "./features/todo/todoSlice";
import { useSelector, useDispatch } from "react-redux";
import NoLogin from "./components/NoLogin";
function Index() {
  // const token = localStorage.getItem("token");
  // const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  useEffect(() => {
    // dispatch(setToken(token));
  }, [token]);

  return (
    <>
      <Navbar />
      <Footer />
      {token ? (
        <>
          <AddTodo />
          <Todo />
        </>
      ) : (
        <>
          <NoLogin />
        </>
      )}
    </>
  );
}

export default Index;
