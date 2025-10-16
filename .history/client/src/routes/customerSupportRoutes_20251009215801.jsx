import Custome from "../pages/customerSupport/Custome"; 
import FeedbackForm from "../pages/customerSupport/FeedbackFormDashboard"; 
import ComplaintForm from "../pages/customerSupport/ComplaintForm";        
import RefundForm from "../pages/customerSupport/RefundForm";              
import Ticket from "../pages/customerSupport/Ticket";                      
import CustomerDashboard from "../pages/customerSupport/CustomerDashboard";
import Refund from "../pages/customerSupport/Refunddash";


const customerSupportRoutes = [
  { path: "/customersupport/custome", element: <Custome /> }, 
  { path: "/customersupport/dashboard", element: <CustomerDashboard /> }, 
  { path: "/customersupport/refund", element: <RefundForm /> },          
  { path: "/customersupport/feedback", element: <FeedbackForm /> },       
  { path: "/customersupport/complaint", element: <ComplaintForm /> },     
  { path: "/customersupport/ticket", element: <Ticket /> }, 
  { path: "/customersupport/refunddashboard", element: <Refund /> },               
              
];

export default customerSupportRoutes;
