import FeedbackForm from "../pages/customerSupport/FeedbackFormDashboard"; 
import ComplaintForm from "../pages/customerSupport/ComplaintForm";        
import RefundForm from "../pages/customerSupport/RefundForm";              
import Ticket from "../pages/customerSupport/Ticket";                      
import CustomerDashboard from "../pages/customerSupport/CustomerDashboard";
import Request from "../pages/customerSupport/RefundRequestList";
import FeedbackRequestsPage from "../pages/customerSupport/feedbackRequest";
import Settings from "../pages/customerSupport/CustomSettings";
import Fetch from "../pages/customerSupport/Complain-requests";
import Tick from "../pages/customerSupport/Ticket-request";




const customerSupportRoutes = [
  { path: "/customersupport/dash", element: <CustomerDashboard /> }, 
  { path: "/customersupport/refund", element: <RefundForm /> },          
  { path: "/customersupport/feedback", element: <FeedbackForm /> },       
  { path: "/customersupport/complaint", element: <ComplaintForm /> },     
  { path: "/customersupport/ticket", element: <Ticket /> },             
  { path: "/customerSupport/refundrequestlist", element: <Request /> }, 
  { path: "/customersupport/feedback-requests" ,element:<FeedbackRequestsPage/>},
  { path: "/customersupport/setting" ,element:<Settings/>},
  { path: "/customersupport/comfetch" ,element:<Fetch/>} ,
  { path: "/customersupport/teckset" ,element:<Tick/>} ,
  
  

];

export default customerSupportRoutes;
