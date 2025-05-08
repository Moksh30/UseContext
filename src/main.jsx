import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Loginprovider } from "./Context/Login2.jsx";
import Modal from "./Component/ProductDetailpage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Loginprovider>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
        }}
      >
        <App />
      </div>
    </Loginprovider>
  </StrictMode>
);
