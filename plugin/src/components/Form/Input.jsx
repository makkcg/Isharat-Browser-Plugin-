import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";

const Input = ({ type = "text", name = "name", icon, title = "Enter Title", action = () => {}, value = "", element, required = false, onWheel = () => {} }) => {
  const { getText } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  let inputType = type;
  if (type === "password") inputType = showPassword ? "text" : "password";
  const requiredSpan = required ? (
    <span data-title-center data-title={getText("مطلوب", "Required")} className="required">
      *
    </span>
  ) : (
    ""
  );
  return (
    <div className="input-group">
      {type !== "select" && !element ? (
        <label htmlFor={name}>
          {title} {requiredSpan}
        </label>
      ) : (
        <p className="input-group-label">
          {title} {requiredSpan}
        </p>
      )}
      {icon && (
        <div className="input">
          <div className="icon">
            <i className={icon}></i>
          </div>
          {type !== "select" && <input onWheel={onWheel} autoComplete="true" value={value} onChange={action} type={inputType} id={name} name={name} />}

          {type === "password" && (
            <div data-title={getText("عرض", "Show")} onClick={() => setShowPassword(!showPassword)} className="show-password-btn">
              <i className="fa-solid fa-eye"></i>
            </div>
          )}
        </div>
      )}

      {type !== "select" && !icon && <input onWheel={onWheel} autoComplete="true" value={value} onChange={action} type={inputType} id={name} name={name} />}
      {type === "select" && element && element}
      <div className={`hint ${name}-hint`}></div>
    </div>
  );
};

export default Input;
