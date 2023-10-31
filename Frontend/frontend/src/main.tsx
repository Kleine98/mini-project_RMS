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
import EmployeeDetailPage from "./Components/EmployeeDetailPage";
import AddEmployeePage from "./Components/AddEmployeePage";
import ProfilePage from "./Components/ProfilePage";
import InterviewPage from "./Components/InterviewPage";
import InterviewReportPage from "./Components/InterviewReportPage";
import CandidateProfilePage from "./Components/CandidateProfilePage";
import CandidateInterviewPage from "./Components/CandidateInterviewPage";
import EnterInterviewPage from "./Components/EnterInterviewPage";
import PermissionManagement from "./Components/PermissionManagement";
import InterviewReportAVG from "./Components/InterviewReportAVG";
import ReportPage from "./Components/ReportPage";
import JobRequests from "./Components/JobRequests";
import AddJobRequests from "./Components/AddJobRequests";
import JobDetails from "./Components/JobDetails";
import CandidateSchedule from "./Components/CandidateSchedule";

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
  {
    path: "/EmployeeDetailPage/:id",
    element: <EmployeeDetailPage />,
  },
  {
    path: "/addEmployee",
    element: <AddEmployeePage />,
  },
  {
    path: "/ProfilePage/:userID",
    element: <ProfilePage />,
  },
  {
    path: "/InterviewPage/:managerId",
    element: <InterviewPage />,
  },
  {
    path: "/InterviewReportPage",
    element: <InterviewReportPage />,
  },
  {
    path: "/CandidateProfilePage/:candidateID",
    element: <CandidateProfilePage />,
  },
  {
    path: "/CandidateInterviewPage/:candidateID",
    element: <CandidateInterviewPage />,
  },
  {
    path: "/EnterInterviewPage",
    element: <EnterInterviewPage />,
  },
  {
    path: "/PermissionManagement",
    element: <PermissionManagement />,
  },
  {
    path: "/InterviewReportAVG",
    element: <InterviewReportAVG />,
  },
  {
    path: "/ReportPage",
    element: <ReportPage />,
  },
  {
    path: "/JobRequests",
    element: <JobRequests />,
  },
  {
    path: "/AddJobRequests",
    element: <AddJobRequests />,
  },
  {
    path: "/JobDetails",
    element: <JobDetails />,
  },
  {
    path: "/CandidateSchedule",
    element: <CandidateSchedule />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
