import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import "./About.scss";
import { PluginContext } from "../../../contexts/PluginContext";

const About = () => {
  const { getText, setTab } = useContext(AppContext);
  const { sendMessage } = useContext(PluginContext);
  const [currentWebsite, setCurrentWebsite] = useState("");
  useEffect(() => {
    sendMessage("get-current-domain", "", setCurrentWebsite);
  }, []);

  return (
    <div className="tab about">
      <h2>About</h2>
      <p>
        {getText("الموقع الحالى", "Current Website is")} {currentWebsite}
      </p>
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
