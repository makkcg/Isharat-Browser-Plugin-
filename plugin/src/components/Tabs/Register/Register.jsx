import { useContext, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import "./Register.scss";
import { emailValid, isMobilePhoneNumber, haveSpecialChar, nameIsValid, nameLengthOk } from "../../../utils/validations";
import Input from "../../Input";
import { FormContext } from "../../../contexts/FormContext";
import Switch from "../../Switch/Switch";

const Register = () => {
  const { getText, setNestedProfileTab } = useContext(AppContext);
  const { setHint, updateFormData } = useContext(FormContext);
  const [userData, setUserData] = useState({});
  const [confirmTerms, setConfirmTerms] = useState(false);
  const updateData = e => updateFormData(e, userData, setUserData, validate);

  function validate() {
    // Validate First Name
    let firstNameInput = document.getElementById("firstName");
    if (!firstNameInput.value) return setHint("firstName", getText("برجاء ادخال الاسم الاول", "Please enter First Name"));
    else if (!nameLengthOk(firstNameInput.value, 2, 10)) return setHint("firstName", getText("عدد الحروف يجب ان يكون بين 2 و 10 حروف", "length between 2 and 10 characters"));
    else if (!nameIsValid(firstNameInput.value)) return setHint("firstName", getText("يمكن ادخال حروف فقط", "Only letters accepted"));
    else setHint("firstName", "");

    // Validate Last Name
    let lastNameInput = document.getElementById("lastName");
    if (!lastNameInput.value) return setHint("lastName", getText("برجاء ادخال اسم العائلة", "Please enter Last Name"));
    else if (!nameLengthOk(lastNameInput.value, 2, 10)) return setHint("lastName", getText("عدد الحروف يجب ان يكون بين 2 و 10 حروف", "length between 2 and 10 characters"));
    else if (!nameIsValid(lastNameInput.value)) return setHint("lastName", getText("يمكن ادخال حروف فقط", "Only letters accepted"));
    else setHint("lastName", "");

    // Validate mobile
    let mobileInput = document.getElementById("mobile");
    if (!mobileInput.value) return setHint("mobile", getText("برجاء ادخال الموبايل", "Please enter mobile"));
    if (!isMobilePhoneNumber(mobileInput.value)) return setHint("mobile", getText("رقم الموبايل غير صالح", "Mobile number is invalid"));
    else setHint("mobile", "");

    // Validate email
    let emailInput = document.getElementById("email");
    if (!emailInput.value) return setHint("email", getText("برجاء ادخال الايميل", "Please enter email"));
    else if (!emailValid(emailInput.value)) return setHint("email", getText("الايميل غير صالح, مثال email@email.com", "Invalid Email, example email@email.com"));
    else setHint("email", "");

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

    // Validate Terms & Policies confirm
    if (!confirmTerms) return setHint("general", getText("برجاء الموافقة على الشروط والاحكام", "Please confirm Terms & Policies"));
    else setHint("general", "");

    return true;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate(e)) return;
    setNestedProfileTab("login");
  }

  console.log(userData);
  return (
    <div className="tab register">
      <form className="form">
        <h1 className="tab-title">{getText("إنشاء حساب جديد", "Register")}</h1>
        <hr className="hr" />
        {/* First Name */}
        <Input title={getText("الاسم الاول", "First Name")} type="text" name="firstName" icon="fa-solid fa-user-circle" value={userData.firstName} action={updateData} />
        {/* Last Name */}
        <Input title={getText("اسم العائلة", "Last Name")} type="text" name="lastName" icon="fa-solid fa-user-circle" value={userData.lastName} action={updateData} />
        {/* Mobile */}
        <Input title={getText("الموبايل", "Mobile")} type="number" name="mobile" icon="fa-solid fa-phone" value={userData.mobile} action={updateData} />
        {/* Email */}
        <Input title={getText("الايميل", "Email")} type="email" name="email" icon="fa-solid fa-envelope" value={userData.email} action={updateData} />
        {/* Password */}
        <Input title={getText("كلمة المرور", "Password")} type="password" name="password" icon="fa-solid fa-key" value={userData.password} action={updateData} />
        {/* Confirm Password */}
        <Input
          title={getText("تاكيد كلمة المرور", "Confirm Password")}
          type="password"
          name="confirmPassword"
          icon="fa-solid fa-lock"
          value={userData.confirmPassword}
          action={updateData}
        />

        {/* Confirm Terms & Policy */}
        <div className="input-group align">
          <Switch
            color="blue"
            active={confirmTerms}
            changeSwitch={() => {
              setConfirmTerms(!confirmTerms);
            }}
          />
          <p>{getText("اوافق على", "I accept the")}</p>
          <span className="link-btn">{getText("الشروط والاحكام", "Terms & Policies")}</span>
        </div>
        {/* general hint */}
        <div className={`hint general-hint`}></div>
        {/* Submit */}
        <button onClick={submit} type="submit" className="submit main-btn">
          {getText("إنشاء الحساب", "Register")}
        </button>
        {/* To Register */}
        <p className="form-text center">
          {getText("لديك حساب؟", "Already have an account?")}{" "}
          <span onClick={() => setNestedProfileTab("login")} className="link-btn">
            {getText("تسجيل الدخول", "Login")}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
