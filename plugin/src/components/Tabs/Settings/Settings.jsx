import { useContext, useEffect, useState } from "react";
import "./Settings.scss";
import { AppContext } from "../../../contexts/AppContext";
import { PluginContext } from "../../../contexts/PluginContext";
import SelectBox from "../../SelectBox/SelectBox";
import contentControlsList from "../../../data/contentControls";
import translationControlsList from "../../../data/translationControls";

import translatorImg1 from "../../../images/translators/1.jpg";
import translatorImg2 from "../../../images/translators/2.jpg";
import translatorImg3 from "../../../images/translators/3.jpg";
import Switch from "../../Switch/Switch";

const translators = [
  {
    id: 1,
    country: "Egypt",
    img: translatorImg1,
    nameEn: "Ahmed",
    nameAr: "احمد"
  },
  {
    id: 2,
    country: "Egypt",
    img: translatorImg2,
    nameEn: "Yasser",
    nameAr: "ياسر"
  },
  {
    id: 3,
    country: "Egypt",
    img: translatorImg3,
    nameEn: "Adel",
    nameAr: "عادل"
  },
  {
    id: 4,
    country: "United States",
    img: translatorImg1,
    nameEn: "John",
    nameAr: "جون"
  },
  {
    id: 5,
    country: "United States",
    img: translatorImg3,
    nameEn: "Martin",
    nameAr: "مارتن"
  }
];
const dialects = [
  {
    id: 1,
    nameAr: "اللغة العربية",
    nameEn: "Standard Arabic"
  },
  {
    id: 2,
    nameAr: "المصرية",
    nameEn: "Egyptian"
  }
];
const countries = [
  {
    id: 1,
    nameEn: "Egypt",
    nameAr: "مصر"
  },
  {
    id: 2,
    nameEn: "United States",
    nameAr: "الولايات المتحدة"
  }
];

const Settings = () => {
  const { getText, languages } = useContext(AppContext);
  const { sendMessage } = useContext(PluginContext);

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedTranslator, setSelectedTranslator] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedDialect, setSelectedDialect] = useState(dialects[0]);

  const [contentControls, setContentControls] = useState(contentControlsList);
  const [translationControls, setTranslationControls] = useState(translationControlsList);

  function handleContentControl(key) {
    const newControls = [...contentControls];
    let newCurrentValue;
    newControls.forEach(item => {
      if (item.key === key) {
        if (item.values) {
          let changed = false;
          item.values.forEach((value, index) => {
            if (changed) return;
            if (index === item.values.length - 1) {
              item.currentValue = item.values[0];
              return;
            }
            if (value === item.currentValue) {
              item.currentValue = item.values[index + 1];
              changed = true;
            }
          });
          item.active = item.currentValue !== item.values[0];
        }
        if (!item.values) item.active = !item.active;
        newCurrentValue = item.currentValue;
      }
    });
    let listForLocalStorage = [];
    newControls.forEach(control => {
      listForLocalStorage.push({
        id: control.id,
        active: control.active,
        currentValue: control.currentValue
      });
    });
    localStorage.setItem("contentControls", JSON.stringify(listForLocalStorage));
    setContentControls(newControls);
    return newCurrentValue;
  }
  useEffect(() => {
    if (localStorage.getItem("contentControls") !== null) {
      let listFromLocalStorage = JSON.parse(localStorage.getItem("contentControls"));
      let newControls = [...contentControls];
      newControls.forEach(control => {
        let foundItem = listFromLocalStorage.find(item => item.id === control.id);
        if (foundItem) {
          control.currentValue = foundItem.currentValue;
          control.active = foundItem.active;
        }
      });
      setContentControls(newControls);
    }
  }, []);

  return (
    <div className="tab settings">
      <section className="section sections-group top">
        <section className="section language-section">
          {/* language select */}
          <SelectBox
            text={getText("اللغة", "Language")}
            nameField={getText("arabic", "english")}
            secNameField={getText("english", "arabic")}
            list={languages}
            selectedItem={selectedLanguage}
            setSelectedItem={setSelectedLanguage}
          />
        </section>
        <hr className="section-hr" />
        <section className="section content-control-section">
          <h2 className="section-title">{getText("إعدادات تعديلات المحتوى", "Content Style Settings")}</h2>
          <div className="content-control-cards">
            {contentControls.map((card, index) => {
              let active = card.active ? "active" : "";
              let currentValueView = card.currentValue;
              if (card.currentValue || card.currentValue === 0) {
                if (card.key === "large_font") currentValueView = `X${card.currentValue}`;
                if (card.key === "line_height") currentValueView = `X${card.currentValue}`;
                if (card.key === "text_spacing") currentValueView = `${card.currentValue}px`;
                if (card.key === "text_align") currentValueView = "";
                if (card.key === "contrast") currentValueView = `${card.currentValue}%`;
                if (card.key === "saturation") currentValueView = `X${card.currentValue}`;
              }
              return (
                <div
                  onClick={() => {
                    let newCurrentValue = handleContentControl(card.key);

                    sendMessage(card.key, { active: card.active, currentValue: newCurrentValue });
                  }}
                  key={index}
                  className={`content-control-card ${active}`}
                >
                  <i className={`icon text-gradient ${card.icon}`}></i>
                  <p className="text">
                    {getText(card.name.arabic, card.name.english)} {(currentValueView || currentValueView === 0) && `(${currentValueView})`}{" "}
                    {card.key === "text_align" && <i className={`fa-solid fa-align-${card.currentValue}`}></i>}
                  </p>
                  {card.values && (
                    <div className="levels">
                      {card.values.map((value, index) => {
                        let active = value === card.currentValue ? "active" : "";
                        return <span key={index} className={`level ${active}`}></span>;
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </section>
      <section className="section sections-group translation-settings">
        <h2 className="section-title">{getText("إعدادات ترجمة لغة الإشارة", "Translation Settings")}</h2>
        {/* Translators container */}
        <div className="translators-container">
          <h3>{getText("إختر المترجم المفضل", "Select Favorite Translator")}</h3>
          {/* country select */}
          <SelectBox
            text={getText("الدولة", "Country")}
            nameField={getText("nameAr", "nameEn")}
            list={countries}
            selectedItem={selectedCountry}
            setSelectedItem={setSelectedCountry}
          />
          {/* Translators list */}
          <div className="translators-list">
            {translators.map((translator, index) => {
              let active = selectedTranslator.id === translator.id ? "active" : "";
              if (translator.country !== selectedCountry.nameEn) return;
              return (
                <div key={index} onClick={() => setSelectedTranslator(translator)} className={`translator-card ${active}`}>
                  <div className="card-body">
                    <div className="image">
                      <img src={translator.img} alt={translator.nameEn} />
                    </div>
                    <div className="name">{getText(translator.nameAr, translator.nameEn)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="translation-controls-list">
          {translationControls.map(control => {
            return (
              <div key={control.id} className="translation-control-card">
                <div className="text">
                  <h2 className="title">{getText(control.nameAr, control.nameEn)}</h2>
                  <p className="description">{getText(control.descriptionAr, control.descriptionEn)}</p>
                </div>
                <Switch
                  id={control.id}
                  active={control.active}
                  changeSwitch={() => {
                    let newList = [...translationControls];
                    newList.forEach(item => {
                      if (item.id === control.id) item.active = !item.active;
                    });
                    setTranslationControls(newList);
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* country select */}
        {translationControls[6].active && (
          <SelectBox
            text={getText("اللهجة", "Dialect")}
            nameField={getText("nameAr", "nameEn")}
            list={dialects}
            selectedItem={selectedDialect}
            setSelectedItem={setSelectedDialect}
          />
        )}
      </section>
    </div>
  );
};

export default Settings;
