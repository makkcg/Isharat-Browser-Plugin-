import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Contexts
import AppContextProvider from "./contexts/AppContext.jsx";
import PluginContextProvider from "./contexts/PluginContext.jsx";
// Font Awesome
import "./assets/fa-6.2.1/css/all.min.css";
import "./assets/fa-6.2.1/css/fontawesome.min.css";
// Styles
import "./styles/App.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <PluginContextProvider>
        <App />
      </PluginContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
