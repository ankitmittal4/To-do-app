import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import "./style.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Index from "./Index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  //   <App />
  // </Provider>

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
