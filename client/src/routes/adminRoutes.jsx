import User from "../pages/admin/user";
import Dashboard from "../pages/admin/dashboard";
import Vehicle from "../pages/admin/vehicle";
import SlotManagement from  "../pages/admin/SlotManagement";
import ZoneManagement from  "../pages/admin/ZoneManagement";
import MembershipManagement from "../pages/admin/MembershipManagement";
import MembershipPackage from "../pages/MembershipPackage";
import ProtectedRoute from "../components/ProtectedRoute"


const AdminRoutes = [
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/admin/users", element: <ProtectedRoute><User /></ProtectedRoute> },
    { path: "/admin/vehicles", element: <Vehicle /> },
    { path: "/admin/slot-management", element: <SlotManagement /> },
    { path: "/admin/zone-management", element: <ZoneManagement /> },
    {path:"/admin/membership-management", element: <MembershipManagement/>},
    {path:"/membership-pack", element:<MembershipPackage/>},
    
];

export default AdminRoutes;