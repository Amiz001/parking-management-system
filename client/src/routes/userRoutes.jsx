import Landing from "../pages/home2";
import Home from "../pages/home2";
import Login from "../pages/login3";
import Register from "../pages/Register2";
import Profile from "../components/profile3";
import ProtectedRoute from "../components/ProtectedRoute"
import ResetPassword from "../pages/resetPassword2"
import ResetPassword2 from "../pages/resetPassword2"


const UserRoutes = [
  { path: "/", element: <Home /> },
  { path: "/new", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/reset-password2", element: <ResetPassword2 /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute>},
];

export default UserRoutes;
