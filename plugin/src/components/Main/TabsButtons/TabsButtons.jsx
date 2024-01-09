import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import "./TabsButtons.scss";

const TabsButtons = () => {
  const { getText, tab, setTab, userLoggedIn, nestedProfileTab } = useContext(AppContext);

  // Buttons list that is used to switch tabs
  const tabsButtons = [
    {
      tab: "profile",
      icon: "fa-solid fa-user-circle",
      name: {
        english: "Profile",
        arabic: "حسابى"
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
      tab: "available-sites",
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
  {
    tabsButtons.forEach(btn => {
      if (btn.tab === "profile") {
        if (!userLoggedIn) {
          console.log(nestedProfileTab);
          if (nestedProfileTab !== "profile") {
            btn.icon = "fa-solid fa-arrow-right-to-bracket";
            btn.name = {
              english: "Login",
              arabic: "دخول"
            };
          }
        }
      }
    });
  }
  return (
    <>
      {/* buttons row */}
      <div className="tabs-btns">
        {tabsButtons.map((btn, index) => {
          return (
            <button key={index} onClick={() => setTab(btn.tab)} className={`tab-btn ${tab === tabsButtons[index].tab ? "active" : ""}`}>
              <i className={btn.icon}></i> {getText(btn.name.arabic, btn.name.english)}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TabsButtons;
