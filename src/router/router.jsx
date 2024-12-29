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
import PrivateRoute from './PrivateRoute';

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
        element: <PrivateRoute><AddCar></AddCar></PrivateRoute>,
      },
      {
        path: "/my-cars",
        element: <PrivateRoute><MyCars></MyCars></PrivateRoute>,
      },
      {
        path: "/car-details/:id",
        element: <PrivateRoute><CarDetails></CarDetails></PrivateRoute>,
      },
      {
        path: "/my-bookings",
        element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
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
