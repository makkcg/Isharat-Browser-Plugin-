import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider(props) {
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
  const getLanguage = key => languages.find(la => la.key === key);
  // plugin current language (default is arabic)
  const [language, setLanguage] = useState();

  // append text based on current language
  const getText = (arabicText, englishText) => {
    if (language === getLanguage("arabic").key) return arabicText;
    if (language === getLanguage("english").key) return englishText;
    return "";
  };

  const switchLang = () => {
    if (language === getLanguage("english").key) {
      setLanguage(getLanguage("arabic").key);
      localStorage.setItem("language", JSON.stringify(getLanguage("arabic").key));
    }
    if (language === getLanguage("arabic").key) {
      setLanguage(getLanguage("english").key);
      localStorage.setItem("language", JSON.stringify(getLanguage("english").key));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("language") !== null) {
      let languageFromLS = JSON.parse(localStorage.getItem("language"));
      let foundLanguage = getLanguage(languageFromLS);
      if (foundLanguage) setLanguage(foundLanguage.key);
      else setLanguage(getLanguage("arabic").key);
    } else setLanguage(getLanguage("arabic").key);
  }, []);

  const value = { languages, language, getLanguage, setLanguage, getText, switchLang };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
