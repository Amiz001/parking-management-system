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
import Account  from "../pages/customerSupport/AccountSettingsPage";
import  Vehicles from "../pages/customerSupport/VehicleSettingsPage";
import Payments  from "../pages/customerSupport/PaymentSettingsPage";
import Notifications  from "../pages/customerSupport/NotificationSettingsPage";
import Privacy  from "../pages/customerSupport/PrivacySettingsPage";
import Help  from "../pages/customerSupport/HelpCenterPage";



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
  { path: "/customersupport/account" ,element:<Account/>} ,              
  { path: "/customersupport/vehicles" ,element:<Vehicles/>} ,              
  { path: "/customersupport/payments" ,element:<Payments/>} ,              
  { path: "/customersupport/notifications" ,element:<Notifications/>} ,              
  { path: "/customersupport/privacy" ,element:<Privacy/>} ,              
  { path: "/customersupport/help" ,element:<Help/>} ,              
  

];

export default customerSupportRoutes;
