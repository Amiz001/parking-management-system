// File: src/routes/CustomerSupportRoutes.jsx
import FeedbackForm from "../pages/customerSupport/FeedbackFormDashboard";
import ComplaintForm from "../pages/customerSupport/ComplaintForm";
import RefundForm from "../pages/customerSupport/RefundForm";
import Ticket from "../pages/customerSupport/Ticket";
import CustomerDashboard from "../pages/customerSupport/CustomerDasboard";
import Customerpage from "../pages/customerSupport/Customer";


const customerSupportRoutes = [
  { path: "/customersupport/dashboard", element: <CustomerDashboard /> },
  { path: "/customersupport/refund", element: <RefundForm /> },
  { path: "/customersupport/feedback", element: <FeedbackForm /> },
  { path: "/customersupport/complaint", element: <ComplaintForm /> },
  { path: "/customersupport/ticket", element: <Ticket /> },
  {path: "/customersupport/customer", element: <Customerpage /> },
];

export default customerSupportRoutes;
