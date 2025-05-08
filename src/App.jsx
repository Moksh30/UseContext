import "./App.css";
import Login from "../src/Component/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Component/Dashboard.jsx";
import MainProfile from "./Component/Mainprofile.jsx";
import LoginMain from "./Component/LoginMain.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginMain />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/profile",
      element: <MainProfile />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
