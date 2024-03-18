import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../features/todo/todoSlice";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  // console.log("Token: ", token);
  const addTodoHandler = async (e) => {
    e.preventDefault();
    if (input.trim().length === 0) return;
    setInput("");
    dispatch(addTodo({ text: input, todoId: nanoid() }));

    try {
      const response = await axios.post(
        "https://to-do-0j63.onrender.com/api/todo/add/",
        { text: input },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        console.log("Added Todo: ", response.data);
        dispatch(updateTodo({ id: response.data.data.todoId, newText: input }));
      } else {
        throw new Error("Failed to add Todo");
      }
    } catch (error) {
      console.log("Error in Adding Todo: ", error);
    }
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12 mb-8">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded text-lg font-medium"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;
