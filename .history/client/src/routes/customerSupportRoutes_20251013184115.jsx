import FeedbackForm from "../pages/customerSupport/FeedbackFormDashboard"; 
import ComplaintForm from "../pages/customerSupport/ComplaintForm";        
import RefundForm from "../pages/customerSupport/RefundForm";              
import Ticket from "../pages/customerSupport/Ticket";                      
import CustomerDashboard from "../pages/customerSupport/CustomerDashboard";
import Refund from "../pages/customerSupport/Refunddash";
import Request from "../pages/customerSupport/RefundRequestList";
import feed from "../pages/customerSupport/feedbackRequest";



const customerSupportRoutes = [
  { path: "/customersupport/dash", element: <CustomerDashboard /> }, 
  { path: "/customersupport/refund", element: <RefundForm /> },          
  { path: "/customersupport/feedback", element: <FeedbackForm /> },       
  { path: "/customersupport/complaint", element: <ComplaintForm /> },     
  { path: "/customersupport/ticket", element: <Ticket /> }, 
  { path: "/customersupport/refunddash", element: <Refund /> },               
  { path: "/customerSupport/refundrequestlist", element: <Request /> }, 
  { path: "/customerSupport/feedbackreq", element: <feed /> },               
              
           
];

export default customerSupportRoutes;
