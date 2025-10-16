import Dashboard from "../pages/operator/Dashboard";
import BookingPhysicalForm from "../pages/operator/BookingPhysicalForm";
import BookingOnlineForm from "../pages/operator/BookingOnlineForm";
import PhysicalBooking from "../pages/operator/PhysicalBooking";
import UpdateBookingPhysical from "../pages/operator/UpdateBookingPhysical";
import OnlineBookingPage from "../pages/operator/OnlineBookingPage";

<<<<<<< HEAD

const OperatorRoutes = [
    {path: "/operator/dashboard", element: <Dashboard />},
    {path: "/operator/bookingPhysicalform", element: <BookingPhysicalForm />},
    {path: "/operator/bookingOnlineform", element: <BookingOnlineForm />},
=======
const CustomerSupportRoutes = [
    {path: "/h", element: <Dashboard />},
    {path: "/operator/bookingPhysical", element: <BookingPhysical />},
    {path: "/operator/bookingOnline", element: <BookingOnline />},
>>>>>>> origin/feature/refund-feedback
    {path: "/operator/physicalBooking", element: <PhysicalBooking />},
    {path: "/operator/updatebookingPhysical/:id", element: <UpdateBookingPhysical />}, 
    {path: "/operator/onlinebookingPage", element: <OnlineBookingPage />},
];

export default OperatorRoutes;