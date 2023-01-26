import { Orders } from "./components/Orders";
import { NewOrders } from "./components/NewOrders";
import { Order } from "./components/Order";

const AppRoutes = [
  {
    index: true,
    element: <Orders />
  },
  {
    path: '/neworder',
    element: <NewOrders />
  },
  {
    path: '/order/:orderid',
    element: <Order />
  }
];

export default AppRoutes;
