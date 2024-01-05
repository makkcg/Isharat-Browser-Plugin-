import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import "./About.scss";

const About = () => {
  const { getText, setTab } = useContext(AppContext);
  return (
    <div className="tab about">
      About
      <div className="buttons">
        <button onClick={() => setTab("profile")} className="main-btn">
          {getText("تسجيل الدخول", "Login")}
        </button>
        <button className="main-btn">{getText("إتاحة موقعك", "Register Website")}</button>
      </div>
    </div>
  );
};

export default About;
