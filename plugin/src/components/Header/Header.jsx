// Images
import { useContext } from "react";
import IsharatLogo from "../../images/isharat-logo.jpg";
import { AppContext } from "../../contexts/AppContext";
import "./Header.scss";

const Header = () => {
  const { getText, switchLang } = useContext(AppContext);
  return (
    <header className="header">
      {/* language switch button */}
      <button onClick={switchLang} className="language-btn">
        <i title={getText("Switch Language", "تغيير اللغة")} className="fa-solid fa-language"></i>
      </button>
      {/* Title & Logo */}
      <h1 className="plugin-title">
        <div className="isharat-logo">
          <img src={IsharatLogo} alt="Logo" />
        </div>{" "}
        {getText("إشارات", "Isharat")}
      </h1>
      {/* more info button */}
      <a href="https://isharat.net" target="blank" className="more-info-btn">
        <i title={getText("موقعنا", "Our Website")} className="fa-solid fa-question-circle"></i>
      </a>
    </header>
  );
};

export default Header;
