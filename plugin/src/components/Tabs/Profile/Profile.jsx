import "./Profile.scss";
import cover from "../../../images/cover.jpg";
import profilePicture from "../../../images/translators/1.jpg";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";

function GetUserInfoItem({ title, value, icon }) {
  return (
    <div className="user-info-item">
      <div className="icon">
        <i className={icon}></i>
      </div>
      <div className="text">
        <div className="title">{title}</div>
        <div className="value">{value}</div>
      </div>
    </div>
  );
}
const Profile = () => {
  const { getText, logout } = useContext(AppContext);
  return (
    <div className="tab profile">
      {/* Cover Photo */}
      <div className="cover">
        <img src={cover} alt="cover" />
      </div>
      <div className="profile-cards">
        {/* Top Card */}
        <div className="profile-card top-card">
          <div className="profile-picture">
            <img src={profilePicture} alt="profile picture" />
          </div>
          <h2 className="welcome">
            {getText("مرحبا", "Welcome")}! <span className="user-name">Fady Magdy</span>
          </h2>
          <hr className="hr" />
          {/* Manage Buttons */}
          <div className="buttons">
            <button className="main-btn dashboard-btn">
              <i className="fa-solid fa-paper-plane"></i>
              {getText("إدارة الحساب", "Manage Account")}
            </button>
            <button onClick={logout} className="main-btn logout">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              {getText("تسجيل خروج", "Logout")}
            </button>
          </div>
        </div>
        {/* Subscription Expire Card */}
        <div className="profile-card subscription-expire-card">
          <div className="user-info-item">
            <div className="icon">
              <i className="fa-solid fa-warning"></i>
            </div>
            <div className="text">
              <div className="title">{getText("قارب اشتراكك على الانتهاء", "Your subscription is about to end")}!</div>
              <div className="value">
                {getText("ينتهى اشتراكك خلال", "Your subscription will expire within")} <span>{getText("30 يوم", "30 Days")}, </span>{" "}
                {getText("يرجى تجديد الاشتراك لاستمرار الخدمة!", "Please renew subscription to continue the service")} <a href="/">{getText("جدد الان", "Renew now")}</a>
              </div>
            </div>
          </div>
        </div>
        {/* Subscription Details */}
        <div className="profile-card">
          <h1 className="card-title">{getText("معلومات الباقة", "Subscription Details")}</h1>
          <GetUserInfoItem title={getText("الباقة", "Package")} value={getText("الباقة لمجانية (30 يوم)", "Free (30 Days)")} icon="fa-solid fa-wand-magic-sparkles" />
          <GetUserInfoItem
            title={getText("تاريح الاشتراك", "Subscription Date")}
            value={getText("من 1/1/2024 الى 30/1/2024", "From 1/1/2024 to 30/1/2024")}
            icon="fa-solid fa-clock"
          />
          <GetUserInfoItem title={getText("الكلمات المرتجمة للغة الاشارة", "Translated words")} value={244} icon="fa-solid fa-hands" />
          <button className="link-btn rate-btn">{getText("تقييمك ومقترحك يهمنا اضغط هنا", "Your rating is important to us. Click here!")}</button>
        </div>
        {/* Personal Info */}
        <div className="profile-card">
          <h1 className="card-title">{getText("البيانات الشخصية", "Personal Info")}</h1>
          <GetUserInfoItem title={getText("الاسم الاول", "First Name")} value={"Fady"} icon="fa-solid fa-user" />
          <GetUserInfoItem title={getText("اسم العائلة", "Last Name")} value={"Magdy"} icon="fa-solid fa-user" />
          <GetUserInfoItem title={getText("موبايل", "Mobile")} value={"+200412422442"} icon="fa-solid fa-phone" />
          <GetUserInfoItem title={getText("الايميل", "Email")} value={"fady@gmail.com"} icon="fa-solid fa-envelope" />
          <GetUserInfoItem title={getText("الدولة", "Country")} value={"Egypt"} icon="fa-solid fa-earth-americas" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
