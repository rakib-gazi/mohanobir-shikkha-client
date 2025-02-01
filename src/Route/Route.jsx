import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import EmRequestAsset from "../Pages/EmRequestAsset";
import ErrorPage from "../Pages/ErrorPage";
import Application from "../Pages/Application";
import ApplicantProfile from "../Pages/ApplicantProfile";
import IdRecovery from "../Pages/idRecovery";

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
      {
        path: "/profile/:id",
        element: <ApplicantProfile></ApplicantProfile>,
      },
      {
        path: "/recovery",
        element:<IdRecovery></IdRecovery> ,
      },
      
    ],
  },
]);

export default router;