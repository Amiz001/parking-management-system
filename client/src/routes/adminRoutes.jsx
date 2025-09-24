import SlotManagement from  "../pages/admin/SlotManagement";
import ZoneManagement from  "../pages/admin/ZoneManagement";

const AdminRoutes = [
      { path: "/admin/slot-management", element: <SlotManagement /> },
      { path: "/admin/zone-management", element: <ZoneManagement /> },

];

export default AdminRoutes;