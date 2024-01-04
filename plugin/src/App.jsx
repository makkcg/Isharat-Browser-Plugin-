import { useContext, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// Contexts
import { AppContext } from "./contexts/AppContext";

// Tabs
import About from "./components/Tabs/About/About";
import Websites from "./components/Tabs/Websites/Websites";
import Settings from "./components/Tabs/Settings/Settings";
import Login from "./components/Tabs/Login/Login";
// Components
import Header from "./components/Header/Header";
import TabsButtons from "./components/TabsButtons/TabsButtons";
import Footer from "./components/Footer/Footer";

const queryClient = new QueryClient();
function App() {
  const { language } = useContext(AppContext);
  // current selected tab
  const [tab, setTab] = useState("about");

  return (
    <QueryClientProvider client={queryClient}>
      <div id={`${language}`} className="plugin">
        {/* Header */}
        <Header />
        <hr className="hr top-hr" />
        <div className="container">
          <TabsButtons tab={tab} setTab={setTab} />
          {/* tabs (only selected one will show up) */}
          {tab === "about" && <About setTab={setTab} />}
          {tab === "websites" && <Websites />}
          {tab === "settings" && <Settings />}
          {tab === "login" && <Login />}
        </div>
        <Footer />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
    </QueryClientProvider>
  );
}

export default App;
