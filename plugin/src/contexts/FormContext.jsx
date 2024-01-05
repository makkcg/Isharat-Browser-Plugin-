import { createContext } from "react";

export const FormContext = createContext();

export default function FormContextProvider(props) {
  function updateFormData(e, data, setData, validate) {
    if (e.target.type === "checkbox") setData({ ...data, [e.target.name]: e.target.checked });
    else setData({ ...data, [e.target.name]: e.target.value });
    validate();
  }

  const setHint = (hintClass, msg) => {
    let allHints = document.querySelectorAll(".hint");
    allHints.forEach(hint => (hint.innerHTML = ""));
    let hint = document.querySelector(`.hint.${hintClass}-hint`);
    if (!msg) return (hint.innerHTML = "");
    hint.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${msg}`;
  };
  const value = { setHint, updateFormData };
  return <FormContext.Provider value={value}>{props.children}</FormContext.Provider>;
}
