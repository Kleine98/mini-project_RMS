import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserAndEmp from "./Components/UserAndEmp";
import Home from "./Components/Home";
import Emplogin from "./Components/Emplogin";
import Userlogin from "./Components/Userlogin";
import About from "./Components/About";
import Job from "./Components/Job";
import Contact from "./Components/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Job",
    element: <Job />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/UserAndEmp",
    element: <UserAndEmp />,
  },
  {
    path: "/Emplogin",
    element: <Emplogin />,
  },
  {
    path: "/Userlogin",
    element: <Userlogin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
