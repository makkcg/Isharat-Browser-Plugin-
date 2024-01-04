import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import "./About.scss";

const About = ({ setTab }) => {
  const { getText } = useContext(AppContext);
  return (
    <div className="tab about">
      About
      <div className="buttons">
        <button onClick={() => setTab("login")} className="main-btn">
          {getText("تسجيل الدخول", "Login")}
        </button>
        <button onClick={() => setTab("login")} className="main-btn">
          {getText("إتاحة موقعك", "Register Website")}
        </button>
      </div>
    </div>
  );
};

export default About;
