import { useContext, useEffect, useState } from "react";
import contentControlsList from "../../../../data/contentControls";
import { PluginContext } from "../../../../contexts/PluginContext";
import { AppContext } from "../../../../contexts/AppContext";
import "./ContentControlsSection.scss";

const ContentControlsSection = () => {
  const { getText } = useContext(AppContext);
  const { sendMessage } = useContext(PluginContext);
  const [contentControls, setContentControls] = useState(contentControlsList);

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
        key: control.key,
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
        let foundItem = listFromLocalStorage.find(item => item.key === control.key);
        if (foundItem) {
          control.currentValue = foundItem.currentValue;
          control.active = foundItem.active;
        }
      });
      setContentControls(newControls);
    }
  }, []);

  return (
    <div>
      <section className="section content-control-section">
        <h2 className="section-title">{getText("إعدادات تعديلات المحتوى", "Content Style Settings")}</h2>
        <div className="content-control-cards">
          {contentControls.map((card, index) => {
            let active = card.active ? "active" : "";
            let currentValueView = card.currentValue;
            if (card.currentValue || card.currentValue === 0) {
              if (card.key === "large_font") currentValueView = `X${card.currentValue}`;
              if (card.key === "font_weight") currentValueView = card.currentValue === "default" ? "" : `${card.currentValue}`;
              if (card.key === "line_height") currentValueView = `X${card.currentValue}`;
              if (card.key === "text_spacing") currentValueView = `${card.currentValue}px`;
              if (card.key === "text_align") currentValueView = "";
              if (card.key === "contrast") currentValueView = ``;
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
                <i className={`icon ${card.icon}`}></i>
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
    </div>
  );
};

export default ContentControlsSection;
