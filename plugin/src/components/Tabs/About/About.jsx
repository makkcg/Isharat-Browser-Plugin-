import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import "./About.scss";

const About = () => {
  const { getText, setTab } = useContext(AppContext);

  return (
    <div className="tab about">
      <h2>About</h2>
      <div className="buttons">
        <button onClick={() => setTab("profile")} className="main-btn">
          <i className="fa-solid fa-arrow-right-to-bracket"></i>
          {getText("تسجيل الدخول", "Login")}
        </button>
        <button className="main-btn">
          <i className="fa-solid fa-plus-circle"></i>
          {getText("إتاحة موقعك", "Register Website")}
        </button>
      </div>
    </div>
  );
};

export default About;
