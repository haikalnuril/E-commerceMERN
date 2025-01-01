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
import UnauthorizedView from "./page/UnauthorizedView";
import NotFoundView from "./page/NotFoundView";

//loader
import { loader as HomeLoader } from "./page/HomeView";
import { loader as ProductLoader } from "./page/ProductView";
import { loader as OrderLoader } from "./page/OrderView";

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
        loader: OrderLoader
      },
      {
        path: "checkout",
        element: <CheckoutView />,
      },
      {
        path: "unauthorized",
        element: <UnauthorizedView />,
      },
      {
        path: "*",
        element: <NotFoundView />,
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
