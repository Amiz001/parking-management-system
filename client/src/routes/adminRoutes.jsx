import User from "../pages/admin/user";
import Vehicle from "../pages/admin/vehicle";
import SlotManagement from  "../pages/admin/SlotManagement";
import ZoneManagement from  "../pages/admin/ZoneManagement";

const AdminRoutes = [
    { path: "/admin/users", element: <User /> },
    { path: "/admin/vehicles", element: <Vehicle /> },
    { path: "/admin/slot-management", element: <SlotManagement /> },
    { path: "/admin/zone-management", element: <ZoneManagement /> },
];

export default AdminRoutes;