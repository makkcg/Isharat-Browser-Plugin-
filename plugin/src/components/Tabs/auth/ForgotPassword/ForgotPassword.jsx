import { useContext, useState } from "react";
import { AppContext } from "../../../../contexts/AppContext";
import "./ForgotPassword.scss";
import { emailValid } from "../../../../utils/validations";
import Input from "../../../Form/Input";
import { FormContext } from "../../../../contexts/FormContext";

const ForgotPassword = () => {
  const { getText, setNestedProfileTab } = useContext(AppContext);
  const { setHint, updateFormData } = useContext(FormContext);
  const [userData, setUserData] = useState({});

  const updateData = e => updateFormData(e, userData, setUserData, validate);

  function validate() {
    // Validate email
    let emailInput = document.getElementById("email");
    if (!emailInput.value) return setHint("email", getText("برجاء ادخال الايميل", "Please enter email"));
    else if (!emailValid(emailInput.value)) return setHint("email", getText("الايميل غير صحيح, مثال email@email.com", "Invalid Email, example email@email.com"));
    else setHint("email", "");

    return true;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate(e)) return;
    console.log("send data");
  }

  return (
    <div className="tab forgot-password">
      <form className="form">
        <h1 className="tab-title">{getText("نسيت كلمة المرور", "Forgot Password")}</h1>
        <hr className="hr" />
        <div className="info-box">
          <p className="description">{getText("برجاء كتابة الايميل لتغيير كلمة المرور", "Please enter your email to change password")}</p>
          <p className="description">{getText("سيتم ارسال رسالة تحقق الى صندوق البريد الخاص بك", "A verification email will be sent to your mail inbox")}</p>
        </div>
        {/* Email */}
        <Input required={true} title={getText("الايميل", "Email")} type="email" name="email" icon="fa-solid fa-envelope" value={userData.email} action={updateData} />

        {/* Submit */}
        <button onClick={submit} type="submit" className="submit main-btn">
          {getText("إرسال", "Send")}
        </button>
        <hr className="hr form-hr" />
        {/* Back to Login */}
        <p onClick={() => setNestedProfileTab("login")} className="form-text center login-btn">
          {getText("العودة لتسجيل الدخول", "Back to login")}
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
