import { useContext, useEffect, useState } from "react";
import "./Settings.scss";
import { AppContext } from "../../../contexts/AppContext";
import SelectBox from "../../SelectBox/SelectBox";

import translationControlsList from "../../../data/translationControls";

import translatorImg from "../../../images/translators/1.jpg";

import Switch from "../../Switch/Switch";
import ContentControlsSection from "./contentControlsSection/ContentControlsSection.jsx";
import { QueryContext } from "../../../contexts/QueryContext.jsx";
import { PluginContext } from "../../../contexts/PluginContext.jsx";

const Settings = () => {
  const { getText } = useContext(AppContext);
  const { sendMessage } = useContext(PluginContext);
  const { GetAllQuery } = useContext(QueryContext);
  const [selectedData, setSelectedData] = useState({ translationSettings: {} });
  const lsSettingsName = "settings";

  // Languages
  const languages = GetAllQuery("Languages");
  const [selectedLanguage, setSelectedLanguage] = useState({});

  // countries
  const countries = GetAllQuery("Countries");
  const [selectedCountry, setSelectedCountry] = useState({});

  // translators
  const translators = GetAllQuery("Translators");
  const [selectedTranslator, setSelectedTranslator] = useState({});
  const [filteredTranslators, setFilteredTranslators] = useState([]);

  // Dialects
  const dialects = GetAllQuery("Slangs");
  const [dialectsList, setDialectsList] = useState([]);
  const [selectedDialect, setSelectedDialect] = useState({});

  const [translationControls, setTranslationControls] = useState(translationControlsList);

  // Default Language (العربية)
  useEffect(() => {
    if (languages.data && !selectedLanguage.id) {
      let arabicLanguage = languages.data.data.find(language => language.LanguageName === "العربية");
      if (arabicLanguage) setSelectedLanguage(arabicLanguage);
    }
  }, [languages.data, selectedLanguage.id]);

  // Default Country (Egypt)
  useEffect(() => {
    if (countries.data && !selectedCountry.id) {
      let egyptCountry = countries.data.data.find(country => country.Alpha3 === "EGY");
      if (egyptCountry) setSelectedCountry(egyptCountry);
    }
  }, [countries.data, selectedCountry.id]);

  // Default Country (Egypt)
  useEffect(() => {
    if (countries.data && !selectedCountry.id) {
      let egyptCountry = countries.data.data.find(country => country.Alpha3 === "EGY");
      if (egyptCountry) setSelectedCountry(egyptCountry);
    }
  }, [countries.data, dialects.data, selectedCountry.id]);

  // filter dialects when selected language change
  useEffect(() => {
    // new dialects
    let newDialecs = [...dialects.list];
    // filter dialects by current selected language
    newDialecs = newDialecs.filter(dialect => dialect.LanguageID.id === selectedLanguage.id);
    setDialectsList(newDialecs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage, dialects.data]);

  // get translators by country
  useEffect(() => {
    setFilteredTranslators(
      translators.list.filter(translator => {
        if (translator.CountryID.id === selectedCountry.id) return true;
        // get egypt country
        let egyptCountry = countries.list.find(country => country.Alpha3 === "EGY");
        // always show translators from egypt
        if (egyptCountry && translator.CountryID.id === egyptCountry.id) return true;
        return false;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translators.data, selectedCountry]);

  useEffect(() => {
    // add settings in local storage once if not found
    if (localStorage.getItem(lsSettingsName) === null) localStorage.setItem(lsSettingsName, JSON.stringify({ translationSettings: {} }));
    if (localStorage.getItem(lsSettingsName) !== null) {
      // get data from local storage
      let newSelectedData = JSON.parse(localStorage.getItem(lsSettingsName));
      if (newSelectedData) setSelectedData(newSelectedData);
    }
  }, []);

  // when any selected item change store it in local storage
  useEffect(() => {
    if (localStorage.getItem(lsSettingsName) !== null) {
      // get old data
      let newSelectedData = JSON.parse(localStorage.getItem(lsSettingsName));
      // update data
      if (selectedCountry.id) newSelectedData.selectedCountryId = selectedCountry.id;
      if (selectedLanguage.id) newSelectedData.selectedLanguageId = selectedLanguage.id;
      if (selectedTranslator.id) newSelectedData.selectedTranslatorId = selectedTranslator.id;
      if (selectedDialect.id) newSelectedData.selectedDialectId = selectedDialect.id;
      // store data in local storage
      localStorage.setItem(lsSettingsName, JSON.stringify(newSelectedData));
    }
  }, [selectedCountry, selectedTranslator, selectedDialect, selectedLanguage]);

  // Translation Controls switchs
  useEffect(() => {
    if (selectedData.translationSettings) {
      let newTranslationControlsList = [...translationControls];
      // update each control switch based on settings data stored in local storage
      newTranslationControlsList.forEach(control => {
        if (selectedData.translationSettings[control.key]) control.active = selectedData.translationSettings[control.key];
      });
    }
  }, [selectedData, translationControls]);

  // get selected item object
  function getSelectedItem(id, query, setSelectedItem) {
    if (!id) return;
    let newSelectedItem = query.list.find(item => item.id === id);
    if (newSelectedItem) setSelectedItem(newSelectedItem);
  }

  useEffect(() => {
    // get selected items object
    getSelectedItem(selectedData.selectedCountryId, countries, setSelectedCountry);
    getSelectedItem(selectedData.selectedLanguageId, languages, setSelectedLanguage);
    getSelectedItem(selectedData.selectedDialectId, dialects, setSelectedDialect);
    getSelectedItem(selectedData.selectedTranslatorId, translators, setSelectedTranslator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries.data, languages.data, dialects.data, translators.data, selectedData]);

  useEffect(() => {}, []);

  return (
    <div className="tab settings">
      <section className="section sections-group top">
        <section className="section language-section">
          {/* language select */}
          <SelectBox
            text={getText("اللغة", "Language")}
            nameField={getText("LanguageName", "LanguageName")}
            list={languages.list}
            isLoading={languages.isLoading}
            isError={languages.isError}
            refetch={languages.refetch}
            selectedItem={selectedLanguage}
            setSelectedItem={setSelectedLanguage}
          />
        </section>
        <hr className="section-hr" />
        <ContentControlsSection />
      </section>
      <section className="section sections-group translation-settings">
        <h2 className="section-title">{getText("إعدادات ترجمة لغة الإشارة", "Translation Settings")}</h2>
        {/* Translators container */}
        <div className="translators-container">
          <h3>{getText("إختر المترجم المفضل", "Select Favorite Translator")}</h3>
          {/* country select */}
          <SelectBox
            text={getText("الدولة", "Country")}
            nameField={getText("CountryName_en", "CountryName_en")}
            list={countries.list}
            isLoading={countries.isLoading}
            isError={countries.isError}
            refetch={countries.refetch}
            selectedItem={selectedCountry}
            setSelectedItem={setSelectedCountry}
          />
          {/* Translators list */}
          {!translators.isLoading && !translators.isError && !countries.isLoading && !filteredTranslators.length && (
            <div className="no-translators">{getText("لا يوجد مترجمين برجاء تغيير الدولة", "No translators, Please change Country")}</div>
          )}
          {translators.isError && (
            <div className="error-box">
              {getText("عذرا حدث خطأ!", "Sorry, Something went wrong!")}
              {/* Retry button */}
              <button className="main-btn" onClick={translators.refetch}>
                {getText("إعادة المحاولة", "Retry")}
              </button>
            </div>
          )}
          <div className="translators-list">
            {/* show 3 empty cards when loading translators */}
            {translators.isLoading && ["", "", ""].map((_t, i) => <div key={i} className={`loading`}></div>)}
            {/* translators list */}
            {filteredTranslators.map((translator, index) => {
              let active = selectedTranslator.id === translator.id ? "active" : "";
              return (
                <div key={index} onClick={() => setSelectedTranslator(translator)} className={`translator-card ${active}`}>
                  <div className="card-body">
                    <div className="image">
                      <img src={translatorImg} alt={translator.nameEn} />
                    </div>
                    <div className="name">{getText(translator.NameAr, translator.NameEn)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="translation-controls-list">
          {/* Translation Control Card */}
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
                    let newSelectedData = { ...selectedData };
                    newList.forEach(item => {
                      if (item.id === control.id) {
                        item.active = !item.active;
                      }
                      newSelectedData.translationSettings[control.key] = control.active;
                    });
                    sendMessage(control.key, { active: control.active });
                    localStorage.setItem(lsSettingsName, JSON.stringify(newSelectedData));
                    setTranslationControls(newList);
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* country select */}
        {selectedData.translationSettings.enable_dialect && (
          <SelectBox
            text={`${getText("اللهجة", "Dialect")}`}
            nameField={getText("Slang", "Slang")}
            list={dialectsList}
            isLoading={dialects.isLoading}
            noResultMsg={getText("لا يوجد نتائج برجاء تغيير اللغة", "No results, Please change language")}
            isError={dialects.isError}
            refetch={dialects.refetch}
            selectedItem={selectedDialect}
            setSelectedItem={setSelectedDialect}
          />
        )}
      </section>
    </div>
  );
};

export default Settings;
