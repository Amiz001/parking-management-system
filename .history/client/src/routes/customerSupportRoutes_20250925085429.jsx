// File: src/routes/CustomerSupportRoutes.jsx
import FeedbackForm from "../pages/customerSupport/FeedbackFormDashboard";
import ComplaintForm from "../pages/customerSupport/ComplaintForm";
import RefundForm from "../pages/customerSupport/RefundForm";
import Ticket from "../pages/customerSupport/Ticket";



const customerSupportRoutes = [
  { path: "/customersupport/dashboard", element: <CustomerDashboard /> },
  { path: "/customersupport/refund", element: <RefundForm /> },
  { path: "/customersupport/feedback", element: <FeedbackForm /> },
  { path: "/customersupport/complaint", element: <ComplaintForm /> },
  { path: "/customersupport/ticket", element: <Ticket /> },
];

export default customerSupportRoutes;
