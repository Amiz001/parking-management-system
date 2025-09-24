import Landing from "../pages/Landing";
import Home from "../pages/home";
import Home2 from "../pages/home2";
import Login from "../pages/Login";
import Register from "../pages/Register";

const UserRoutes = [
  { path: "/", element: <Landing /> },
  { path: "/new", element: <Home /> },
  { path: "/new2", element: <Home2 /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default UserRoutes;
