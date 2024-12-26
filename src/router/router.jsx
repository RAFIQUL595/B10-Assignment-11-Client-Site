import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddCar from "../pages/AddCar/AddCar";
import MyCars from "../pages/MyCars/MyCars";
import AvailableCars from "../pages/AvailableCars/AvailableCars";
import CarDetails from "../pages/CarDetails/CarDetails";
import MyBookings from "../pages/MyBookings/MyBookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-cars",
        element: <AvailableCars></AvailableCars>,
      },
      {
        path: "/add-car",
        element: <AddCar></AddCar>,
      },
      {
        path: "/my-cars",
        element: <MyCars></MyCars>,
      },
      {
        path: "/car-details/:id",
        element: <CarDetails></CarDetails>,
      },
      {
        path: "/my-bookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
    ],
  },
]);
export default router;
