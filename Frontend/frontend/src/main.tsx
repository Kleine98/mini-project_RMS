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
import HomeEmp from "./Components/HomeEmp";
import EmpRequest from "./Components/EmpRequest";
import EmpUser from "./Components/EmpUser";
import HrHome from "./Components/HrHome";
import HrEmployee from "./Components/HrEmployee";
import HrRequest from "./Components/HrRequest";
import HrUser from "./Components/HrUser";
import SuperHome from "./Components/SuperHome";
import SuperEmployee from "./Components/SuperEmployee";
import SuperRequest from "./Components/SuperRequest";
import SuperUser from "./Components/SuperUser";
import EmployeeManagement from "./Components/EmployeeManagement";

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
  {
    path: "/HomeEmp",
    element: <HomeEmp />,
  },
  {
    path: "/Request",
    element: <EmpRequest />,
  },
  {
    path: "/User",
    element: <EmpUser />,
  },
  {
    path: "/HrHome",
    element: <HrHome />,
  },
  {
    path: "/HrEmployee",
    element: <HrEmployee />,
  },
  {
    path: "/HrRequest",
    element: <HrRequest />,
  },
  {
    path: "/HrUser",
    element: <HrUser />,
  },
  {
    path: "/SuperHome",
    element: <SuperHome />,
  },
  {
    path: "/SuperEmployee",
    element: <SuperEmployee />,
  },
  {
    path: "/SuperRequest",
    element: <SuperRequest />,
  },
  {
    path: "/SuperUser",
    element: <SuperUser />,
  },
  {
    path: "/EmployeeManagement",
    element: <EmployeeManagement />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
