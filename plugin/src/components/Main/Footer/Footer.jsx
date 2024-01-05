import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import DiginoviaLogo from "../../../images/diginovia-logo.jpeg";
import "./Footer.scss"

const Footer = () => {
  const { getText } = useContext(AppContext);
  return (
    <footer className="footer">
      {/* more info link */}
      <p className="more-info">
        {getText("مزيد من المعلومات زور موقع", "For more info visit our website")}{" "}
        <a href="https://isharat.net" target="blank">
          https://isharat.net
        </a>
      </p>
      <hr className="hr" />
      {/* copyright text */}
      <p className="copyright">
        <a href="https://diginovia.com" target="blank" className="logo">
          <img src={DiginoviaLogo} alt="Owner Logo" />
        </a>
        {getText("جميع الحقوق مفوظة لشركة ديجينوفيا ©2023 احد شركات مجموعة خليفة للكمبيوتر", "©2023 All rights reserved to Diginovia (KCG Company)")}
      </p>
    </footer>
  );
};

export default Footer;
