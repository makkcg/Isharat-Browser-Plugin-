"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import "./page.scss";
// Images
import successImg from "@/images/success.png";
import invalidImage from "@/images/invalid.png";

const VerifyEmail = () => {
  // get token
  const { token } = useParams();
  console.log("token: ", token);
  // email verified state
  const [emailVerified, setEmailVerified] = useState(true);
  return (
    <div className={`verify-email-page ${emailVerified ? "" : "invalid"}`}>
      <div className="card">
        <div className="card-body">
          {/* image */}
          <div className="image">
            <Image priority={true} src={emailVerified ? successImg : invalidImage} alt="Success" />
          </div>
          {/* title */}
          <h1 className="title">{emailVerified ? "تم بنجاح" : "404"}</h1>
          <hr />
          {/* description */}
          {emailVerified ? (
            <>
              <p className="description">تم التحقق من الايميل بنجاح</p>
              <p className="description">يمكنك الان تسجيل الدخول الى حسابك واغلاق هذه الصفحة</p>
            </>
          ) : (
            <>
              <p className="description">الرابط غير متاح</p>
              <p className="description">هذا الرابط غير متاح او انتهت صلاحيته</p>
            </>
          )}
          {/* buttons */}
          <div className="buttons">
            <Link href="/" className={`main-btn ${emailVerified ? "green" : "gray"}`}>
              الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
