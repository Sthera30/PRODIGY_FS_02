import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./context/userContext.jsx";
import { FoodContextProvider } from "./context/foodContext.jsx";
import { CartContextProvider } from "./context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <FoodContextProvider>

        <CartContextProvider>

          <App />

        </CartContextProvider>

      </FoodContextProvider>

    </UserContextProvider>

  </React.StrictMode>
);
