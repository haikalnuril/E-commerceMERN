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

//loader
import { loader as HomeLoader } from "./page/HomeView";

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
        path: "order",
        element: <OrderView />,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  }
])

function App() {
    return (
        
        <RouterProvider router={router} />
    );
}

export default App;
