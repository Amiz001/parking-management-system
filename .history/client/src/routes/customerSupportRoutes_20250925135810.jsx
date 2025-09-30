// File: src/routes/CustomerSupportRoutes.jsx
// This file defines all the routes for the customer support section of the app.

// Importing React components for different customer support pages
import FeedbackForm from "../pages/customerSupport/FeedbackFormDashboard"; // Feedback form page component
import ComplaintForm from "../pages/customerSupport/ComplaintForm";        // Complaint form page component
import RefundForm from "../pages/customerSupport/RefundForm";              // Refund form page component
import Ticket from "../pages/customerSupport/Ticket";                      // Ticket page component
import CustomerDashboard from "../pages/customerSupport/CustomerDashboard";// Main dashboard component
import Customer from "../pages/customerSupport/CustomerDashboard";

// Defining an array of route objects for React Router
// Each object has a 'path' (the URL) and an 'element' (the React component to render)
const customerSupportRoutes = [
  { path: "/customersupport/dashboard", element: <CustomerDashboard /> }, // Dashboard route
  { path: "/customersupport/refund", element: <RefundForm /> },           // Refund page route
  { path: "/customersupport/feedback", element: <FeedbackForm /> },       // Feedback page route
  { path: "/customersupport/complaint", element: <ComplaintForm /> },     // Complaint page route
  { path: "/customersupport/ticket", element: <Ticket /> },               // Ticket page route
];

// Exporting the routes array so it can be imported and used in the main router setup
export default customerSupportRoutes;
