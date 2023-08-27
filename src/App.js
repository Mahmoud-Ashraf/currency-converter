import { RouterProvider, createBrowserRouter, redirect } from "react-router-dom";
import LayoutWrapper from "./UI/LayoutWrapper/LayoutWrapper";
import Home from "./Views/Home/Home";
import CurrencyDetails from "./Views/CurrencyDetails/CurrencyDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutWrapper />,
      children: [
        {
          path: '/',
          loader: () => redirect("/home")
        },
        {
          path: '/home',
          element: <Home />
        },

        {
          path: '/details',
          element: <CurrencyDetails />,
        },
      ],
    },
    {
      path: "*",
      loader: () => redirect("/home")
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
