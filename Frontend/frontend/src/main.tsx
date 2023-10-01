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
import Signup from "./Components/Signup";
import Requestsearchnormal from "./Components/Requestsearchnormal";
import EmpAndHr from "./Components/EmpAndHr";
import Requestsearchsuper from "./Components/Requestsearchsuper";
import Requestsearchhr from "./Components/Requestsearchhr";
import Requestnorm from "./Components/Requestnorm";
import Requeststatus from "./Components/Requeststatus";
import Emppersonalinfonorm from "./Components/Emppersonalinfonorm";
import Examsummary from "./Components/Examsummary";
import Empaddhr from "./Components/Empaddhr";
import Requestsearch from "./Components/Requestsearch";

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
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/Requestsearchnormal",
    element: <Requestsearchnormal />,
  },
  {
    path: "/Requestsearchhr",
    element: <Requestsearchhr />,
  },
  {
    path: "/EmpAndHr",
    element: <EmpAndHr />,
  },
  {
    path: "/Requestsearchsuper",
    element: <Requestsearchsuper />,
  },
  {
    path: "/Requestnorm",
    element: <Requestnorm />,
  },
  {
    path: "/Requeststatus",
    element: <Requeststatus />,
  },
  {
    path: "/Emppersonalinfonorm",
    element: <Emppersonalinfonorm />,
  },
  {
    path: "/Examsummary",
    element: <Examsummary />,
  },
  {
    path: "/Empaddhr",
    element: <Empaddhr />,
  },
  {
    path: "/Requestsearch",
    element: <Requestsearch />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
