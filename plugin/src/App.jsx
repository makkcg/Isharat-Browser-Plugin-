import { useContext } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
// Contexts
import { AppContext } from "./contexts/AppContext";

// Tabs
import About from "./components/Tabs/About/About";
import AvailableSites from "./components/Tabs/AvailableSites/AvailableSites";
import Settings from "./components/Tabs/Settings/Settings";
import Login from "./components/Tabs/auth/Login/Login";
import ForgotPassword from "./components/Tabs/auth/ForgotPassword/ForgotPassword";
import Profile from "./components/Tabs/Profile/Profile";
import Register from "./components/Tabs/auth/Register/Register";
// Components
import Header from "./components/Main/Header/Header";
import TabsButtons from "./components/Main/TabsButtons/TabsButtons";
import Footer from "./components/Main/Footer/Footer";

const queryClient = new QueryClient();
function App() {
  const { tab, language, languageSet, userLoggedIn, nestedProfileTab } = useContext(AppContext);
  console.log();
  if (!tab || !language || !languageSet) return "";
  return (
    <QueryClientProvider client={queryClient}>
      <div className="plugin">
        {/* Header */}
        <Header />
        <div className="container">
          <TabsButtons />
          {/* tabs (only selected one will show up) */}
          {tab === "about" && <About />}
          {tab === "available-sites" && <AvailableSites />}
          {tab === "settings" && <Settings />}
          {tab === "profile" && nestedProfileTab === "login" && <Login />}
          {tab === "profile" && nestedProfileTab === "register" && <Register />}
          {tab === "profile" && nestedProfileTab === "forgot-password" && <ForgotPassword />}
          {tab === "profile" && nestedProfileTab === "profile" && userLoggedIn && <Profile />}
        </div>
        <Footer />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </QueryClientProvider>
  );
}

export default App;
