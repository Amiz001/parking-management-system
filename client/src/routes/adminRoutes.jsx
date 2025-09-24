import User from "../pages/admin/user";
import Vehicle from "../pages/admin/vehicle";

const AdminRoutes = [
    { path: "/admin/users", element: <User /> },
    { path: "/admin/vehicles", element: <Vehicle /> },
];

export default AdminRoutes;