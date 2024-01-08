"use client";

import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider(props) {
  // current selected tab
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [languageLoaded, setLanguageLoaded] = useState(false);
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
  // plugin current language (default is arabic)
  const [language, setLanguage] = useState("arabic");

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
    localStorage.setItem("language", JSON.stringify(getLanguage(lang).key));
  };

  // get saved language from local storage
  useEffect(() => {
    if (localStorage.getItem("language") !== null) {
      // get language from local storage
      let languageFromLS = JSON.parse(localStorage.getItem("language"));
      // if language exist change current language to it
      let foundLanguage = getLanguage(languageFromLS);
      if (foundLanguage) setLanguage(foundLanguage.key);
      // if language doesn't exist or not saved in local storage make default language arabic
      else {
        setLanguage(defaultLanguage);
        localStorage.setItem("language", JSON.stringify(defaultLanguage));
      }
    } else {
      localStorage.setItem("language", JSON.stringify(defaultLanguage));
      setLanguage(defaultLanguage);
    }
    setLanguageLoaded(true);
  }, []);

  useEffect(() => {
    document.body.id = language;
  }, [language]);

  const value = {
    languages,
    language,
    getLanguage,
    setLanguage,
    getText,
    changeLanguage,
    languageLoaded,
    // login & logout
    userLoggedIn,
    login,
    logout
  };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
