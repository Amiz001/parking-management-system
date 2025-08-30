import UserRoutes from "./userRoutes";
import AdminRoutes from "./adminRoutes";
import OperatorRoutes from "./operatorRoutes";
import CustomerSupportRoutes from "./customerSupportRoutes";

const allRoutes = [
  ...UserRoutes,
  ...AdminRoutes,
  ...OperatorRoutes,
  ...CustomerSupportRoutes
];

export default allRoutes;
