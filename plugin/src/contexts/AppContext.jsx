import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider(props) {
  // current selected tab
  const tabs = ["about", "available-sites", "settings", "profile"];
  const nestedProfileTabs = ["login", "register", "forgot-password", "profile"];
  const [tab, setTab] = useState("");
  const [nestedProfileTab, setNestedProfileTab] = useState("login");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [languageSet, setLanguageSet] = useState(false);

  const logout = () => {
    setUserLoggedIn(false);
    setNestedProfileTab("login");
  };

  const login = () => {
    setUserLoggedIn(true);
    setNestedProfileTab("profile");
  };

  // all languages
  const languages = [
    {
      id: 1,
      key: "arabic",
      english: "Arabic",
      arabic: "العربية"
    },
    {
      id: 2,
      key: "english",
      english: "English",
      arabic: "الانجليزية"
    }
  ];

  // local storage names
  const languageNameLS = "language";
  const tabNameLS = "tab";
  const nestedProfileTabNameLS = "nested-tab";

  // plugin current language (default is arabic)
  const [language, setLanguage] = useState("");

  const getLanguage = key => languages.find(la => la.key === key);
  const defaultLanguage = getLanguage("arabic").key;

  // show text based on current language
  const getText = (arabicText, englishText) => {
    if (language === getLanguage("arabic").key) return arabicText;
    if (language === getLanguage("english").key) return englishText;
    return "";
  };

  const changeLanguage = lang => {
    setLanguage(getLanguage(lang).key);
    localStorage.setItem(languageNameLS, JSON.stringify(getLanguage(lang).key));
  };

  // get saved language from local storage
  useEffect(() => {
    if (localStorage.getItem(languageNameLS) !== null) {
      // get language from local storage
      let languageFromLS = JSON.parse(localStorage.getItem(languageNameLS));
      // if language exist change current language to it
      let foundLanguage = getLanguage(languageFromLS);
      if (foundLanguage) setLanguage(foundLanguage.key);
      // if language doesn't exist or not saved in local storage make default language arabic
      else {
        setLanguage(defaultLanguage);
        localStorage.setItem(languageNameLS, JSON.stringify(defaultLanguage));
      }
    } else setLanguage(defaultLanguage);

    // get tab from local storage
    if (localStorage.getItem(tabNameLS) !== null) {
      // get tab from local storage
      let tabFromLS = JSON.parse(localStorage.getItem(tabNameLS));
      let foundTab = tabs.find(t => t === tabFromLS);
      if (foundTab) setTab(tabFromLS);
      else setTab("about");
    } else setTab("about");
    // get nested profile tab from local storage
    if (localStorage.getItem(nestedProfileTabNameLS) !== null) {
      // get nested profile tab from local storage
      let nestedProfileTabFromLS = JSON.parse(localStorage.getItem(nestedProfileTabNameLS));
      let foundNestedProfileTab = nestedProfileTabs.find(t => t === nestedProfileTabFromLS);
      if (foundNestedProfileTab) setNestedProfileTab(nestedProfileTabFromLS);
      else setNestedProfileTab("login");
    } else setNestedProfileTab("login");
  }, []);

  // when language changes apply language in body (for styling)
  useEffect(() => {
    if (language) {
      document.body.id = language;
      setLanguageSet(true);
    }
  }, [language]);

  // when tab changes store in local storage
  useEffect(() => {
    if (tab) localStorage.setItem(tabNameLS, JSON.stringify(tab));
  }, [tab]);

  // when nested profile tab changes store in local storage
  useEffect(() => {
    if (nestedProfileTab) localStorage.setItem(nestedProfileTabNameLS, JSON.stringify(nestedProfileTab));
    if (nestedProfileTab === "profile") setUserLoggedIn(true);
  }, [nestedProfileTab]);

  const value = {
    languages,
    language,
    getLanguage,
    setLanguage,
    getText,
    changeLanguage,
    languageSet,
    // Tab
    tab,
    setTab,
    // nested profile tab
    nestedProfileTab,
    setNestedProfileTab,
    // login & logout
    userLoggedIn,
    login,
    logout
  };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
