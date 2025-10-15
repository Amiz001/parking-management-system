import Dashboard from "../pages/operator/Dashboard";
import BookingPhysicalForm from "../pages/operator/BookingPhysicalForm";
import BookingOnlineForm from "../pages/operator/BookingOnlineForm";
import PhysicalBooking from "../pages/operator/PhysicalBooking";
import UpdateBookingPhysical from "../pages/operator/UpdateBookingPhysical";
import OnlineBookingPage from "../pages/operator/OnlineBookingPage";
import Membership from "../pages/operator/Membership";

const OperatorRoutes = [
    {path: "/operator/dashboard", element: <Dashboard />},
    {path: "/operator/bookingPhysicalform", element: <BookingPhysicalForm />},
    {path: "/operator/bookingOnlineform", element: <BookingOnlineForm />},
    {path: "/operator/physicalBooking", element: <PhysicalBooking />},
    {path: "/operator/updatebookingPhysical/:id", element: <UpdateBookingPhysical />}, 
    {path: "/operator/onlinebookingPage", element: <OnlineBookingPage />},
    {path: "/operator/membership", element: <Membership />},
];

export default OperatorRoutes;