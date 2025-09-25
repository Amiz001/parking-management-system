import Landing from "../pages/Landing";
import Home from "../pages/home";
import Home2 from "../pages/home2";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../components/profile";

const UserRoutes = [
  { path: "/", element: <Landing /> },
  { path: "/new", element: <Home /> },
  { path: "/new2", element: <Home2 /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/profile", element: <Profile /> },
];

export default UserRoutes;
