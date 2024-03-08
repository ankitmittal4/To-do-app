import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  updateTodo,
  setEditingTodoId,
} from "../features/todo/todoSlice";
function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const editingTodoId = useSelector((state) => state.edititngTodoId);

  useEffect(() => {
    if (!editingTodoId) {
      setInput("");
    } else {
      const editedTodo = todos.find((todo) => todo.id === editingTodoId);
      setInput(editedTodo.text);
    }
  }, [editingTodoId, todos]);
  const addUpdateTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim().length === 0) return;
    if (editingTodoId) {
      dispatch(
        updateTodo({
          id: editingTodoId,
          updatedTodo: { text: input },
        })
      );
      dispatch(setEditingTodoId(null));
    } else {
      dispatch(addTodo(input));
    }
    setInput("");
  };

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos)); //Localstorage receives/takes data in stribng form so we have to convert it into string form
  }, [todos]);
  return (
    <form onSubmit={addUpdateTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {editingTodoId ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
}

export default AddTodo;
