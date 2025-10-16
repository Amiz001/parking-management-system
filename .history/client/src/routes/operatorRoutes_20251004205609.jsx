import Dashboard from "../pages/operator/Dashboard";
import BookingPhysical from "../pages/operator/BookingPhysical";
import BookingOnline from "../pages/operator/BookingOnline";
import PhysicalBooking from "../pages/operator/PhysicalBooking";
import UpdateBookingPhysical from "../pages/operator/UpdateBookingPhysical";
import OnlineBookingPage from "../pages/operator/OnlineBookingPage";
import OnlineBooking from "../pages/operator/OnlineBooking";
import PhysicalPayForm from "../pages/operator/PhysicalPayForm";
import OnlinePayment from "../pages/operator/OnlinePayment";

const CustomerSupportRoutes = [
    {path: "/h", element: <Dashboard />},
    {path: "/operator/bookingPhysical", element: <BookingPhysical />},
    {path: "/operator/bookingOnline", element: <BookingOnline />},
    {path: "/operator/physicalBooking", element: <PhysicalBooking />},
    {path: "/operator/onlineBooking", element: <OnlineBooking />},
    {path: "/operator/updatebookingPhysical/:id", element: <UpdateBookingPhysical />}, 
    {path: "/operator/onlinebookingPage", element: <OnlineBookingPage />},
    {path: "/operator/physicalpayform/:id", element: <PhysicalPayForm />},
    {path:"/operator/online-payment", element:<OnlinePayment/>}
];

export default CustomerSupportRoutes;