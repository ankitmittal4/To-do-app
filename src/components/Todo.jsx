import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { setTodos, removeTodo, updateTodo } from "../features/todo/todoSlice";
import axios from "axios";

function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const inputRef = useRef(null);
  const token = useSelector((state) => state.token);
  // console.log("Token: ", token);

  const fetchUserTodos = async () => {
    try {
      const response = await axios.post(
        "https://to-do-0j63.onrender.com/api/todo/list/",
        {
          page: 1,
          limit: 50,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        console.log("Todos Listing: ", response.data);
        const todos = response.data.data.map((todo) => ({
          id: todo.todoId,
          text: todo.text,
        }));
        dispatch(setTodos(todos));
      } else {
        console.log("Failed in Listing: ");
      }
    } catch (error) {
      console.log("Error in Listing", error);
    }
  };
  useEffect(() => {
    fetchUserTodos();
  }, []);
  const updateHandler = (id, text) => {
    setEditingTodoId(id);
    setEditedText(text);
  };

  const saveEditHandler = async (id) => {
    dispatch(updateTodo({ id, newText: editedText }));
    setEditingTodoId(null);
    setEditedText("");
    console.log("Todo id: ", id);
    try {
      const response = await axios.post(
        "https://to-do-0j63.onrender.com/api/todo/update/",
        { todoId: id, text: editedText },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Update Todo: ", response.data);
        // dispatch(updateTodo({ id, newText: editedText }));
        // setEditingTodoId(null);
        // setEditedText("");
      } else {
        throw new Error("Failed in Update!!!");
      }
    } catch (error) {
      console.log("Error in Update: ", error.response.data);
    }
  };
  // const deleteHandler = async (id) => {
  //   dispatch(removeTodo(id));
  // };
  const deleteHandler = async (id) => {
    dispatch(removeTodo(id));
    console.log("Todo id: ", id);
    try {
      const response = await axios.post(
        "https://to-do-0j63.onrender.com/api/todo/delete",
        { todoId: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Delete Todo: ", response.data);
      } else {
        throw new Error("Failed in Delete!!!");
      }
    } catch (error) {
      console.log("Error in Delete: ", error.response.data);
    }
  };

  const setUpdateOnEnter = (e, todoId) => {
    if (e.key === "Enter") {
      saveEditHandler(todoId);
    }
  };

  // useEffect(() => {
  //   const todosJSON = localStorage.getItem("todos");
  //   if (todosJSON) {
  //     const parsedTodos = JSON.parse(todosJSON);

  //     dispatch(setTodos(parsedTodos));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);

  useEffect(() => {
    if (editingTodoId != null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodoId]);
  return (
    <>
      <ul className="list-none mb-16">
        {todos.map((todo) => (
          <li
            className="mt-4 mx-3 md:mx-36 flex  md:flex-row md:justify-between items-center bg-zinc-800 px-1.5 py-2 md:py-2 rounded justify-between  "
            key={todo.id}
          >
            {editingTodoId === todo.id ? (
              <input
                ref={inputRef}
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => setUpdateOnEnter(e, todo.id)}
                className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out editField md:w-auto lg:w-4/5"
              />
            ) : (
              <div className="text-white w-auto lg:ml-3 sm:ml-2">
                {todo.text}
              </div>
            )}
            <div className="flex  md:flex-row md:flex-wrap md:items-center justify-center ">
              {editingTodoId === todo.id ? (
                <button
                  type="button"
                  onClick={() => saveEditHandler(todo.id)}
                  className="text-white bg-green-500  hover:bg-green-600 focus:ring-green-300 dark:focus:ring-green-800 justify-end sm-justify-end  bg-gradient-to-r    hover:bg-gradient-to-br focus:ring-4 focus:outline-none   text-sm text-center me-3.5 mb-0 md:mb-0 align-middle   font-bold sm-py-2 px-1.5  py-1.5 rounded md:py-2 md:px-4 sm-justify-end ml-2.5"
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => updateHandler(todo.id, todo.text)}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-sm text-center me-3.5 mb-0 md:mb-0 align-middle  bg-blue-500 hover:bg-blue-700 font-bold sm-py-2 px-2.5  py-1 rounded md:py-2 md:px-4 sm-justify-end "
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteHandler(todo.id)}
                className="text-white bg-red-500 border-0   focus:outline-none hover:bg-red-600  text-md md:ml-2 sm-py-0  pt-0 pb-0  sm-my-2 sm-mx-1 sm-justify-end text-center me-0.5 mb-0 md:mb-0 align-middle    font-bold sm-py-2 px-2 py-1 rounded md:py-2 md:px-4 sm-justify-end lg:mr-3 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;
