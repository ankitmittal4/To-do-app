import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  todos: [],
  edititngTodoId: null,
  // todos: [{ id: 1, text: "Hello World!!!" }],
};

export const todoSlice = createSlice({
  name: "Ankit",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = updatedTodo.text;
      }
    },
    setEditingTodoId: (state, action) => {
      state.edititngTodoId = action.payload;
    },
  },
});
export const { addTodo, removeTodo, setEditingTodoId, updateTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
