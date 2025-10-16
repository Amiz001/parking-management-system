import Landing from "../pages/home2";
import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../components/profile";
import ProtectedRoute from "../components/ProtectedRoute"
import ResetPassword from "../pages/resetPassword"


const UserRoutes = [
  { path: "/", element: <Home /> },
  { path: "/new", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute>},
];

export default UserRoutes;
