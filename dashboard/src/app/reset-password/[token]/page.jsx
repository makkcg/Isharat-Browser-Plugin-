"use client";

import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import "./page.scss";
import { haveSpecialChar } from "@/utils/validations";
import Input from "@/components/form/Input";
import { FormContext } from "@/context/FormContext";

const ResetPassword = () => {
  const { getText, languageLoaded } = useContext(AppContext);
  const { setHint, updateFormData } = useContext(FormContext);
  const [userData, setUserData] = useState({});
  const updateData = e => updateFormData(e, userData, setUserData, validate);

  function validate() {
    // Validate password
    let passwordInput = document.getElementById("password");
    if (!passwordInput.value) return setHint("password", getText("برجاء ادخال كلمة المرور", "Please enter password"));
    else if (passwordInput.value.length < 8) return setHint("password", getText("طول كلمة المرور يجب ان يكون 8 او اكثر", "Password length should be 8 characters or more"));
    else if (!haveSpecialChar(passwordInput.value)) return setHint("password", getText("برجاء ادخال على الاقل رمز # $ %", "Please enter at least 1 special character, # $ %"));
    else setHint("password", "");

    // Validate confirm password
    let confirmpasswordInput = document.getElementById("confirmPassword");
    if (!confirmpasswordInput.value) return setHint("confirmPassword", getText("برجاء ادخال كلمة المرور", "Please enter confirmPassword"));
    else if (confirmpasswordInput.value !== passwordInput.value) return setHint("confirmPassword", getText("كلمة المرور والتاكيد غير متطابقتين", "Password and confirm not match"));
    else setHint("confirmPassword", "");

    return true;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate(e)) return;
    console.log("send");
  }

  if (!languageLoaded) return "";
  return (
    <div className="reset-password-page">
      <div className="card">
        <form className="form">
          <h1 className="tab-title">{getText("تغيير كلمة المرور", "Reset Password")}</h1>
          <hr className="hr" />
          <p className="form-text center">{getText("مرحبا", "Welcome")} Fady Magdy</p>
          {/* Password */}
          <Input
            required={true}
            title={getText("كلمة المرور الجديدة", "New Password")}
            type="password"
            name="password"
            icon="fa-solid fa-key"
            value={userData.password}
            action={updateData}
          />
          {/* Confirm Password */}
          <Input
            required={true}
            title={getText("تاكيد كلمة المرور الجديدة", "Confirm New Password")}
            type="password"
            name="confirmPassword"
            icon="fa-solid fa-lock"
            value={userData.confirmPassword}
            action={updateData}
          />

          {/* general hint */}
          <div className={`hint general-hint`}></div>
          {/* Submit */}
          <button onClick={submit} type="submit" className="submit main-btn">
            {getText("تغيير كلمة المرور", "Reset Password")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
