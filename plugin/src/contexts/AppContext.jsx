import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider(props) {
  // all languages
  const languages = {
    english: "english",
    arabic: "arabic"
  };
  // plugin current language (default is arabic)
  const [language, setLanguage] = useState(languages.arabic);

  // append text based on current language
  const getText = (arabicText, englishText) => {
    if (language === languages.arabic) return arabicText;
    if (language === languages.english) return englishText;
    return "";
  };

  const switchLang = () => {
    if (language === languages.english) setLanguage(languages.arabic);
    if (language === languages.arabic) setLanguage(languages.english);
  };

  const value = { language, setLanguage, getText, switchLang };
  return (
    // eslint-disable-next-line react/prop-types
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
