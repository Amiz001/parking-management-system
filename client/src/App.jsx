import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import allRoutes from "./routes";
<<<<<<< HEAD
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
=======
import customerSupportRoutes from "./routes/customerSupportRoutes.jsx";

>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f

function App() {
  return (
    <Router>
      <Routes>
        {allRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </Router>
  );
}

export default App;
