import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./TabsButtons.scss";

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

const TabsButtons = ({ tab, setTab }) => {
  const { getText } = useContext(AppContext);
  return (
    <>
      {/* buttons row */}
      <div className="tabs-btns">
        {tabsButtons.map((btn, index) => {
          return (
            <button
              key={index}
              onClick={() => setTab(btn.tab)}
              className={`tab-btn ${tabsButtons[index - 1] && tab === tabsButtons[index - 1].tab ? "prev" : ""} ${
                tabsButtons[index + 1] && tab === tabsButtons[index + 1].tab ? "next" : ""
              } ${tab === tabsButtons[index].tab ? "active" : ""}`}
            >
              <i className={`text-gradient ${btn.icon}`}></i> {getText(btn.name.arabic, btn.name.english)}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TabsButtons;
