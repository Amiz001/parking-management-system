import Landing from "../pages/Landing";
import Home from "../pages/home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../components/profile";


const UserRoutes = [
  { path: "/", element: <Home /> },
  { path: "/new", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
];

export default UserRoutes;
