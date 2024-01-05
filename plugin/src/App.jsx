import { useContext } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
// Contexts
import { AppContext } from "./contexts/AppContext";

// Tabs
import About from "./components/Tabs/About/About";
import Websites from "./components/Tabs/Websites/Websites";
import Settings from "./components/Tabs/Settings/Settings";
import Login from "./components/Tabs/Login/Login";
import ForgotPassword from "./components/Tabs/ForgotPassword/ForgotPassword";
import Profile from "./components/Tabs/Profile/Profile";
// Components
import Header from "./components/Header/Header";
import TabsButtons from "./components/TabsButtons/TabsButtons";
import Footer from "./components/Footer/Footer";
import Register from "./components/Tabs/Register/Register";

const queryClient = new QueryClient();
function App() {
  const { language, tab, nestedProfileTab } = useContext(AppContext);
  
  return (
    <QueryClientProvider client={queryClient}>
      <div id={`${language}`} className="plugin">
        {/* Header */}
        <Header />
        <div className="container">
          <TabsButtons />
          {/* tabs (only selected one will show up) */}
          {tab === "about" && <About />}
          {tab === "websites" && <Websites />}
          {tab === "settings" && <Settings />}
          {tab === "profile" && nestedProfileTab === "login" && <Login />}
          {tab === "profile" && nestedProfileTab === "register" && <Register />}
          {tab === "profile" && nestedProfileTab === "forgot-password" && <ForgotPassword />}
          {tab === "profile" && nestedProfileTab === "profile" && <Profile />}
        </div>
        <Footer />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </QueryClientProvider>
  );
}

export default App;
