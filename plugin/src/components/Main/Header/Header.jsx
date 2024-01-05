// Images
import { useContext, useState } from "react";
import IsharatLogo from "../../../images/isharat-logo.jpg";
import { AppContext } from "../../../contexts/AppContext";
import "./Header.scss";

const Header = () => {
  const { getText, language, changeLanguage, languages } = useContext(AppContext);
  const [showLanguagesDropdown, setShowLanguagesDropdown] = useState(false);
  return (
    <>
      {showLanguagesDropdown && <div onClick={() => setShowLanguagesDropdown(false)} className="lang-bg"></div>}
      <header className="header">
        {/* language select box */}
        <div className="language-box">
          {/* button to show language dropdown */}
          <button onClick={() => setShowLanguagesDropdown(!showLanguagesDropdown)} className="language-btn">
            <i data-title={getText("Switch Language", "تغيير اللغة")} className="fa-solid fa-language"></i>
          </button>
          {/* language dropdown */}
          <div className={`languages-dropdown ${showLanguagesDropdown ? "show" : ""}`}>
            {/* close button */}
            <button onClick={() => setShowLanguagesDropdown(false)} className="close-dropdown-btn">
              <i className="fa-solid fa-x"></i>
            </button>
            <h4 className="title">Language / اللغة</h4>
            {/* languages list */}
            <ul className="languages-list">
              {languages.map(lang => {
                let active = lang.key === language ? "active" : "";
                return (
                  <li
                    className={`language-item ${active}`}
                    onClick={() => {
                      if (lang.key === language) return;
                      changeLanguage(lang.key);
                      setShowLanguagesDropdown(false);
                    }}
                    key={lang.id}
                  >
                    {getText(lang.arabic, lang.english)} ({getText(lang.english, lang.arabic)})
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Title & Logo */}
        <h1 className="plugin-title">
          <div className="isharat-logo">
            <img src={IsharatLogo} alt="Logo" />
          </div>{" "}
          {getText("إشارات", "Isharat")}
        </h1>
        {/* more info button */}
        <a href="https://isharat.net" target="blank" className="more-info-btn">
          <i data-title-left="true" data-title={getText("مزيد من المعلومات", "More Info")} className="fa-solid fa-question-circle"></i>
        </a>
      </header>
    </>
  );
};

export default Header;
