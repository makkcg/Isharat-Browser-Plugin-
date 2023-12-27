import { useContext, useState } from "react";
// Contexts
import { AppContext } from "./contexts/AppContext";
// Images
import IsharatLogo from "./images/isharat-logo.png";
import DiginoviaLogo from "./images/diginovia-logo.jpeg";

// Tabs
import About from "./components/Tabs/About/About";
import Websites from "./components/Tabs/Websites/Websites";
import Settings from "./components/Tabs/Settings/Settings";
import Login from "./components/Tabs/Login/Login";

// Buttons list that is used to switch tabs
const tabsButtons = [
  {
    tab: "login",
    icon: "fa-solid fa-arrow-right-to-bracket",
    name: {
      english: "Login",
      arabic: "دخول"
    }
  },
  {
    tab: "settings",
    icon: "fa-solid fa-gear",
    name: {
      english: "Settings",
      arabic: "الاعدادات"
    }
  },
  {
    tab: "websites",
    icon: "fa-solid fa-globe",
    name: {
      english: "Available Sites",
      arabic: "المواقع المتاحة"
    }
  },
  {
    tab: "about",
    icon: "fa-solid fa-info-circle",
    name: {
      english: "About",
      arabic: "عن إشارات"
    }
  }
];

function App() {
  const { language, getText, switchLang } = useContext(AppContext);
  // current selected tab
  const [tab, setTab] = useState("about");

  return (
    <div id={`${language}`} className="plugin">
      {/* Plugin card top */}
      <div className="plugin-top">
        {/* language switch button */}
        <button onClick={switchLang} className="language-btn">
          <i title={getText("Switch Language", "تغيير اللغة")} className="fa-solid fa-language"></i>
        </button>
        {/* Title & Logo */}
        <h1 className="plugin-title">
          <img className="isharat-logo" src={IsharatLogo} alt="Logo" /> {getText("إشارات", "Isharat")}
        </h1>
        {/* more info button */}
        <a href="https://google.com" target="blank" className="more-info-btn">
          <i title={getText("موقعنا", "Our Website")} className="fa-solid fa-question-circle"></i>
        </a>
      </div>
      <hr className="hr top-hr" />
      <div className="container">
        {/* buttons row */}
        <div className="tabs-btns">
          {tabsButtons.map((btn, index) => {
            return (
              <button
                key={index}
                onClick={() => setTab(btn.tab)}
                className={`tab-btn ${tabsButtons[index - 1] && tab === tabsButtons[index - 1].tab ? "prev" : ""} ${tabsButtons[index + 1] && tab === tabsButtons[index + 1].tab ? "next" : ""} ${
                  tab === tabsButtons[index].tab ? "active" : ""
                }`}
              >
                <i className={btn.icon}></i> {getText(btn.name.arabic, btn.name.english)}
              </button>
            );
          })}
        </div>
        {/* tabs (only selected one will show up) */}
        <div className="tab-box">
          {tab === "about" && <About />}
          {tab === "websites" && <Websites />}
          {tab === "settings" && <Settings />}
          {tab === "login" && <Login />}
        </div>
      </div>
      {/* more info link */}
      <p className="more-info">
        {getText("مزيد من المعلومات زور موقع", "For more info visit our website")}{" "}
        <a href="https://google.com" target="blank">
          https://google.com
        </a>
      </p>
      <hr className="hr" />
      {/* copyright text */}
      <p className="copyright">
        <span className="logo">
          <img src={DiginoviaLogo} alt="Owner Logo" />
        </span>
        {getText("جميع الحقوق مفوظة لشركة ديجينوفيا ©2023 احد شركات مجموعة خليفة للكمبيوتر", "©2023 All rights reserved to Diginovia (KCG Company)")}
      </p>
    </div>
  );
}

export default App;
