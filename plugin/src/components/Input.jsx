import { useState } from "react";

const Input = ({ type = "text", name = "name", icon, title = "Enter Title", action = () => {}, value = "" }) => {
  const [showPassword, setShowPassword] = useState(false);
  let inputType = type;
  if (type === "password") inputType = showPassword ? "text" : "password";
  return (
    <div className="input-group">
      <label htmlFor={name}>{title}</label>
      {icon && (
        <div className="input">
          <div className="icon">
            <i className={icon}></i>
          </div>
          <input autoComplete="true" value={value} onChange={action} type={inputType} id={name} name={name} />
          {type === "password" && (
            <div onClick={() => setShowPassword(!showPassword)} className="show-password-btn">
              <i className="fa-solid fa-eye"></i>
            </div>
          )}
        </div>
      )}

      {!icon && <input autoComplete="true" value={value} onChange={action} type={inputType} id={name} name={name} />}
      <div className={`hint ${name}-hint`}></div>
    </div>
  );
};

export default Input;
