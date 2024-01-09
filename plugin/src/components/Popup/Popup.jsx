import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import "./Popup.scss";
import Header from "../Main/Header/Header";
import Footer from "../Main/Footer/Footer";
import SelectBox from "../Form/SelectBox/SelectBox";
import Switch from "../Form/Switch/Switch";
import { isEnglish } from "../../utils/validations";

const Popup = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const textParam = urlParams.get("text");
  const [text, setText] = useState(textParam);
  const { getText } = useContext(AppContext);
  const [showMoreOptions, setShowMoreOptions] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [isEnglishText, setIsEnglishText] = useState(false);
  const [suggestedWords] = useState([
    {
      id: 1,
      word: "أدخل"
    },
    {
      id: 2,
      word: "إدخل"
    },
    {
      id: 3,
      word: "أدخلً"
    }
  ]);

  function handleInput(e) {
    let value = e.target.value;
    setText(value);
  }

  useEffect(() => {
    if (text !== null) setIsEnglishText(isEnglish(text));
  }, [text]);
  return (
    <div className="translation-popup">
      <div className="card">
        <div className="card-body">
          <Header />
          <hr className="hr" />
          <div className="video">
            <video src="" controls></video>
          </div>
          <div className="text-to-translate-input">
            <textarea onChange={handleInput} name="text" defaultValue={textParam} placeholder={getText("ضع هنا نص للترجمة", "Put text here to translate")} ></textarea>
          </div>
          <div className={`more-options-container ${showMoreOptions ? "active" : ""}`}>
            <button onClick={() => setShowMoreOptions(!showMoreOptions)} className="main-btn more-options-btn">
              <i className="fa-solid fa-chevron-down"></i> {getText("خيارات", "Options")}
            </button>
            <div className={`more-options-box `}>
              <div className="top">
                <div className="left">
                  <button className="main-btn">
                    <i className="fa-solid fa-hand-scissors"></i>
                    {getText("ترجم النص", "Translate Text")}
                  </button>
                  <SelectBox removeSearch={true} text={getText("كلمات مقترحة", "Suggested Words")} nameField="word" list={suggestedWords} />
                </div>
                {isEnglishText && (
                  <div className="right">
                    <div className="text-box english-text">{text}</div>
                    <div className="text-box english-text">asdasdasds</div>
                  </div>
                )}
              </div>
              <div className="bottom">
                <Switch active={autoTranslate} changeSwitch={() => setAutoTranslate(!autoTranslate)} />{" "}
                {getText("شغل الترجمة الالية للنص مباشرة", "Turn on auto translation of the text directly")}
              </div>
            </div>
          </div>

          <hr className="hr" />
          <Footer renderFor="popup" />
        </div>
      </div>
    </div>
  );
};

export default Popup;
