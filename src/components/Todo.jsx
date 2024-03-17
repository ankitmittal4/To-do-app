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
        "https://to-do-0j63.onrender.com/api/todo/List/",
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
        dispatch(setTodos(response.data.data));
      } else {
        console.log("Failed in Listing: ");
      }
    } catch (error) {
      console.log("Error in Listing", error);
    }
  };
  useEffect(() => {
    // fetchUserTodos();
  }, []);
  const updateHandler = (id, text) => {
    setEditingTodoId(id);
    setEditedText(text);
  };

  const saveEditHandler = async (id) => {
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
        dispatch(updateTodo({ id, newText: editedText }));
        setEditingTodoId(null);
        setEditedText("");
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
        dispatch(removeTodo(id));
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
            className="mt-4 mx-36 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
            // key={nanoid()}
          >
            {editingTodoId === todo.id ? (
              <input
                ref={inputRef}
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onKeyDown={(e) => setUpdateOnEnter(e, todo.id)}
                className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out editField"
              />
            ) : (
              <div className="text-white">{todo.text}</div>
            )}
            <div className="flex">
              {editingTodoId === todo.id ? (
                <button
                  type="button"
                  onClick={() => saveEditHandler(todo.id)}
                  className="text-white bg-green-500  text-sm  text-center me-7 mb-0 focus:outline-none align-middle hover:bg-green-600 justify-end font-bold py-2 px-5 rounded"
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => updateHandler(todo.id, todo.text)}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  text-sm  text-center me-7 mb-0 align-middle justify-end bg-blue-500 hover:bg-blue-700 font-bold py-2 px-5 rounded"
                >
                  Edit
                </button>
              )}

              <button
                // onClick={() => dispatch(removeTodo(todo.id))}
                onClick={() => deleteHandler(todo.id)}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
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
