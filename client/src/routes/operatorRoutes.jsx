import Dashboard from "../pages/operator/Dashboard";
import BookingPhysicalForm from "../pages/operator/BookingPhysicalForm";
import BookingOnlineForm from "../pages/operator/BookingOnlineForm";
import PhysicalBooking from "../pages/operator/PhysicalBooking";
import UpdateBookingPhysical from "../pages/operator/UpdateBookingPhysical";
import OnlineBookingPage from "../pages/operator/OnlineBookingPage";
import OnlineBooking from "../pages/operator/OnlineBooking";
import PhysicalPayForm from "../pages/operator/PhysicalPayForm";
import OnlinePayment from "../pages/operator/OnlinePayment";
import Membership from "../pages/operator/Membership";

const OperatorRoutes = [
    {path: "/operator/dashboard", element: <Dashboard />},
    {path: "/operator/bookingPhysical", element: <BookingPhysical />},
    {path: "/operator/bookingOnline", element: <BookingOnline />},
    {path: "/operator/bookingPhysicalform", element: <BookingPhysicalForm />},
    {path: "/operator/bookingOnlineform", element: <BookingOnlineForm />},
    {path: "/operator/physicalBooking", element: <PhysicalBooking />},
    {path: "/operator/updatebookingPhysical/:id", element: <UpdateBookingPhysical />}, 
    {path: "/operator/onlinebookingPage", element: <OnlineBookingPage />},
    {path: "/operator/physicalpayform/:id", element: <PhysicalPayForm />},
    {path:"/operator/online-payment", element:<OnlinePayment/>},
    {path: "/operator/membership", element: <Membership />},
];

export default OperatorRoutes;