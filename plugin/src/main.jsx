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
import QueryContextProvider from "./contexts/QueryContext.jsx";
import FormContextProvider from "./contexts/FormContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AppContextProvider>
      <FormContextProvider>
        <QueryContextProvider>
          <PluginContextProvider>
            <App />
          </PluginContextProvider>
        </QueryContextProvider>
      </FormContextProvider>
    </AppContextProvider>
  // </React.StrictMode>
);
