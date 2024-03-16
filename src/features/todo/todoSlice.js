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
      const { id, newText } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.text = newText;
      }
    },
    setEditingTodoId: (state, action) => {
      state.edititngTodoId = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
    setActiveUser: (state, action) => {
      state.name = action.payload;
    },
  },
});
export const {
  addTodo,
  removeTodo,
  setEditingTodoId,
  updateTodo,
  setTodos,
  setToken,
  setImageURL,
  setActiveUser,
} = todoSlice.actions;
export default todoSlice.reducer;
