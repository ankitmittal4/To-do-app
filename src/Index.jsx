import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import Footer from "./components/Footer";
import Index2 from "./Index2";
import { setToken } from "./features/todo/todoSlice";
import { useSelector, useDispatch } from "react-redux";
function Index() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  useEffect(() => {
    dispatch(setToken(token));
  }, [token]);

  return (
    <>
      <Navbar />
      {token ? (
        <>
          <AddTodo />
          <Todo />
          <Footer />
        </>
      ) : null}
    </>
  );
}

export default Index;
