// Images
import { useContext } from "react";
import IsharatLogo from "../../images/isharat-logo.png";
import { AppContext } from "../../contexts/AppContext";
import "./Header.scss";

const Header = () => {
  const { getText, switchLang } = useContext(AppContext);
  return (
    <header className="header">
      {/* language switch button */}
      <button onClick={switchLang} className="language-btn">
        <i title={getText("Switch Language", "تغيير اللغة")} className="text-gradient fa-solid fa-language"></i>
      </button>
      {/* Title & Logo */}
      <h1 className="plugin-title">
        <img className="isharat-logo" src={IsharatLogo} alt="Logo" /> {getText("إشارات", "Isharat")}
      </h1>
      {/* more info button */}
      <a href="https://google.com" target="blank" className="more-info-btn">
        <i title={getText("موقعنا", "Our Website")} className="text-gradient fa-solid fa-question-circle"></i>
      </a>
    </header>
  );
};

export default Header;
