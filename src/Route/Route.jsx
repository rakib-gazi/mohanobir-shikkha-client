import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import JoinAsEmployee from "../Pages/JoinAsEmployee";
import JoinAsHR from "../Pages/JoinAsHR";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import EmRequestedAsset from "../Pages/EmRequestedAsset";
import EmRequestAsset from "../Pages/EmRequestAsset";
import EmTeam from "../Pages/EmTeam";
import EmHome from "../Pages/EmHome";
import Profile from "../Pages/Profile";
import HrHome from "../Pages/HrHome";
import HrAssetList from "../Pages/HrAssetList";
import HrAddAsset from "../Pages/HrAddAsset";
import HrAllRequest from "../Pages/HrAllRequest";
import HrMyEmployeeList from "../Pages/HrMyEmployeeList";
import HrAddAnEmployee from "../Pages/HrAddAnEmployee";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";
import PaymentPage from "../Pages/PaymentPage";
import Application from "../Pages/Application";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "*",
        element:<ErrorPage></ErrorPage> , 
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/form",
        element: <Application></Application>,
      },
      {
        path: "/admin",
        element: <EmRequestAsset></EmRequestAsset>,
      },
      
    ],
  },
]);

export default router;