import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import allRoutes from "./routes";
import customerSupportRoutes from "./routes/customerSupportRoutes";


function App() {
  return (
    <Router>
      <Routes>
        {allRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
