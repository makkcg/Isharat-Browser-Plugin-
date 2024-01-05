import { useContext, useState } from "react";
import { AppContext } from "../../../../contexts/AppContext";
import "./Login.scss";
import { emailValid, haveSpecialChar } from "../../../../utils/validations";
import Input from "../../../Form/Input";
import { FormContext } from "../../../../contexts/FormContext";
import Switch from "../../../Form/Switch/Switch";

const Login = () => {
  const { getText, login, setNestedProfileTab } = useContext(AppContext);
  const { setHint, updateFormData } = useContext(FormContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [userData, setUserData] = useState({});

  const updateData = e => updateFormData(e, userData, setUserData, validate);

  function validate() {
    // Validate email
    let emailInput = document.getElementById("email");
    if (!emailInput.value) return setHint("email", getText("برجاء ادخال الايميل", "Please enter email"));
    else if (!emailValid(emailInput.value)) return setHint("email", getText("الايميل غير صحيح, مثال email@email.com", "Invalid Email, example email@email.com"));
    else setHint("email", "");

    // Validate password
    let passwordInput = document.getElementById("password");
    if (!passwordInput.value) return setHint("password", getText("برجاء ادخال كلمة المرور", "Please enter password"));
    if (passwordInput.value.length < 8) return setHint("password", getText("طول كلمة المرور يجب ان يكون 8 او اكثر", "Password length should be 8 characters or more"));
    else if (!haveSpecialChar(passwordInput.value)) return setHint("password", getText("برجاء ادخال على الاقل رمز # $ %", "Please enter at least 1 special character, # $ %"));
    else setHint("password", "");

    return true;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate(e)) return;
    login();
  }

  return (
    <div className="tab login">
      <form className="form">
        <h1 className="tab-title">{getText("تسجيل الدخول", "Login")}</h1>
        <hr className="hr" />
        {/* Email */}
        <Input required={true} title={getText("الايميل", "Email")} type="email" name="email" icon="fa-solid fa-envelope" value={userData.email} action={updateData} />

        {/* Password */}
        <Input required={true} title={getText("كلمة المرور", "Password")} type="password" name="password" icon="fa-solid fa-key" value={userData.password} action={updateData} />

        {/* Remember me */}
        <div className="input-group align">
          <Switch color="blue" active={rememberMe} changeSwitch={() => setRememberMe(!rememberMe)} />
          <p>{getText("تذكرنى", "Remember me")}</p>
        </div>
        {/* Submit */}
        <button onClick={submit} type="submit" className="submit main-btn">
          {getText("تسجيل الدخول", "Login")}
        </button>
        <hr className="hr form-hr" />
        {/* Forgot Password */}
        <p onClick={() => setNestedProfileTab("forgot-password")} className="form-text center forgot-password-btn">
          {getText("نسيت كلمة المرور؟", "Forgot Password?")}
        </p>

        {/* To Register */}
        <p className="form-text center">
          {getText("ليس لديك حساب؟", "Don't have an account?")}{" "}
          <span onClick={() => setNestedProfileTab("register")} className="link-btn">
            {getText("إنشاء حساب", "Register")}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
