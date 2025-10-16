import Dashboard from "../pages/operator/Dashboard";
import BookingPhysicalForm from "../pages/operator/BookingPhysicalForm";
import BookingOnlineForm from "../pages/operator/BookingOnlineForm";
import PhysicalBooking from "../pages/operator/PhysicalBooking";
import UpdateBookingPhysical from "../pages/operator/UpdateBookingPhysical";
import OnlineBookingPage from "../pages/operator/OnlineBookingPage";
import Membership from "../pages/operator/Membership";
import PhysicalPayForm from "../pages/operator/PhysicalPayForm";
import PaymentManagement from "../pages/operator/PaymentManagement";
import OnlineBookPayForm from "../pages/operator/OnlineBookPayForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const OperatorRoutes = [
  { path: "/operator/dashboard", element: <Dashboard /> },
  { path: "/operator/bookingPhysicalform", element: <BookingPhysicalForm /> },
  { path: "/operator/bookingOnlineform", element: <BookingOnlineForm /> },
  { path: "/operator/physicalBooking", element: <PhysicalBooking /> },
  { path: "/operator/updatebookingPhysical/:id", element: <UpdateBookingPhysical /> }, 
  { path: "/operator/onlinebookingPage", element: <OnlineBookingPage /> },
  { path: "/operator/membership", element: <Membership /> },
  { path: "/operator/PhysicalPayForm/:id", element: <PhysicalPayForm /> },
  { path: "/operator/payment", element: <PaymentManagement/> },
  
  { 
    path: "/paymentform", 
    element: (
      <Elements stripe={stripePromise}>
        <OnlineBookPayForm />
      </Elements>
    ) 
  }
];

export default OperatorRoutes;
