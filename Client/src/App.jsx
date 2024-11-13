import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AboutView from "./page/AboutView";
import HomeView from "./page/HomeView";
import CartView from "./page/CartView";
import ProductView from "./page/ProductView";
import OrderView from "./page/OrderView";
import LoginView from "./page/auth/LoginView";
import RegisterView from "./page/auth/RegisterView";
import PublicLayout from "./Layouts/PublicLayout";
import DetailProductView from "./page/DetailProductView";
import CheckoutView from "./page/CheckoutView";

//loader
import { loader as HomeLoader } from "./page/HomeView";
import { loader as ProductLoader } from "./page/ProductView";

//action
import { action as LoginAction } from "./page/auth/LoginView";
import { action as RegisterAction } from "./page/auth/RegisterView";

//storage
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader,
      },
      {
        path: "products",
        element: <ProductView />,
        loader: ProductLoader,
      },
      {
        path: "product/:id",
        element: <DetailProductView />,
      },
      {
        path: "about",
        element: <AboutView />,
      },
      {
        path: "cart",
        element: <CartView />,
      },
      {
        path: "orders",
        element: <OrderView />,
      },
      {
        path: "checkout",
        element: <CheckoutView />,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginView />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterView />,
    action: RegisterAction,
  }
])

function App() {
    return (
        
        <RouterProvider router={router} />
    );
}

export default App;
