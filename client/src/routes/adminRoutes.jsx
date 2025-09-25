<<<<<<< HEAD
import User from "../pages/admin/user";
import Vehicle from "../pages/admin/vehicle";

const AdminRoutes = [
    { path: "/admin/users", element: <User /> },
    { path: "/admin/vehicles", element: <Vehicle /> },
=======
import SlotManagement from  "../pages/admin/SlotManagement";
import ZoneManagement from  "../pages/admin/ZoneManagement";

const AdminRoutes = [
      { path: "/admin/slot-management", element: <SlotManagement /> },
      { path: "/admin/zone-management", element: <ZoneManagement /> },

>>>>>>> 42ac412b1a2656f44cb2574d7a5a4b1f1e758197
];

export default AdminRoutes;