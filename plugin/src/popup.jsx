import ReactDOM from "react-dom/client";
// Contexts
import AppContextProvider from "./contexts/AppContext.jsx";
// Font Awesome
import "./assets/fa-6.5.1/css/all.min.css";
import "./assets/fa-6.5.1/css/fontawesome.min.css";
// Styles
import "./styles/App.scss";
import QueryContextProvider from "./contexts/QueryContext.jsx";
import FormContextProvider from "./contexts/FormContext.jsx";
import Popup from "./components/Popup/Popup.jsx";

ReactDOM.createRoot(document.getElementById("popup-root")).render(
  // <React.StrictMode>
  <AppContextProvider>
    <FormContextProvider>
      <QueryContextProvider>
        <Popup />
      </QueryContextProvider>
    </FormContextProvider>
  </AppContextProvider>
  // </React.StrictMode>
);
