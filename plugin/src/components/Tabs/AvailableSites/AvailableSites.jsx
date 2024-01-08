import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import "./AvailableSites.scss";
import { have } from "../../../utils/search";

// Logos
import googleLogo from "../../../images/sites/google.jpg";
import facebookLogo from "../../../images/sites/facebook.png";
import youtubeLogo from "../../../images/sites/youtube.png";
import { PluginContext } from "../../../contexts/PluginContext";

const availableSebsitesList = [
  {
    id: 1,
    logo: googleLogo,
    domain: "google.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  },
  {
    id: 2,
    logo: youtubeLogo,
    domain: "youtube.com",
    categoryAr: "فيديو",
    categoryEn: "Video"
  },
  {
    id: 3,
    logo: facebookLogo,
    domain: "facebook.com",
    categoryAr: "تواصل اجتماعى",
    categoryEn: "Social Media"
  },
  {
    id: 4,
    logo: googleLogo,
    domain: "google.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  },
  {
    id: 5,
    logo: facebookLogo,
    domain: "facebook.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  },
  {
    id: 6,
    logo: youtubeLogo,
    domain: "youtube.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  },
  {
    id: 7,
    logo: googleLogo,
    domain: "google.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  },
  {
    id: 8,
    logo: facebookLogo,
    domain: "facebook.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  },
  {
    id: 9,
    logo: youtubeLogo,
    domain: "youtube.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  },
  {
    id: 10,
    logo: googleLogo,
    domain: "google.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  },
  {
    id: 11,
    logo: facebookLogo,
    domain: "facebook.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  },
  {
    id: 12,
    logo: youtubeLogo,
    domain: "youtube.com",
    categoryAr: "تقنيات مساعدة",
    categoryEn: "Assistive technologies"
  }
];

const AvailableSites = () => {
  const { getText } = useContext(AppContext);
  // get current website domain
  const { currentWebsite } = useContext(PluginContext);
  // available sites list
  const [availableSebsites, setAvailableSites] = useState(availableSebsitesList);
  // search value
  const [searchValue, setSearchValue] = useState("");

  function search() {
    let newList = [...availableSebsitesList];
    // find items by domain name or category
    newList = newList.filter(item => {
      if (have(item.domain, searchValue)) return true;
      else if (have(item.categoryAr, searchValue)) return true;
      else if (have(item.categoryEn, searchValue)) return true;
      else return false;
    });
    setAvailableSites(newList);
  }
  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);
  return (
    <div className="tab available-sites">
      <div className="card">
        <div className="top">
          {/* available sites count */}
          <p className="available-sites-count">
            <span>{availableSebsites.length}</span> {getText("موقع متاح لذوى الهمم", "Site available")}
          </p>
          {/* search */}
          <div className="search">
            <input
              onChange={e => setSearchValue(e.target.value)}
              type="search"
              name="search"
              placeholder={`${getText("بحث باسم الموقع او التصنيف", "Search by domain or category")}`}
            />
          </div>
        </div>
        {/* table head */}
        <div target="_blank" className={`website-row top-row`}>
          <p>{getText("اللوجو", "Logo")}</p>
          <p>{getText("التصنيف", "Category")}</p>
          <p>{getText("الرابط", "Domain")}</p>
        </div>
        {/* table list */}
        <div className="websites-list">
          {/* website row */}
          {availableSebsites.map(site => {
            let active = site.domain === currentWebsite ? "active" : "";
            return (
              <a key={site.id} href={`https://${site.domain}`} target="blank" className={`website-row ${active}`}>
                <div className="logo">
                  <img src={site.logo} alt={site.domain} />
                </div>
                <p className="category">{getText(site.categoryAr, site.categoryEn)}</p>
                <p className="domain">{site.domain}</p>
              </a>
            );
          })}
        </div>
      </div>
      {/* Buttons */}
      <div className="buttons">
        <a href="https://dashboard.isharat.net" target="blank" className="main-btn">
          <i className="fa-solid fa-circle-plus"></i>
          {getText("اضف موقعك", "Add your site")}
        </a>
        <a href="https://dashboard.isharat.net" target="blank" className="link-btn">
          <i className="fa-solid fa-award"></i>
          {getText("اسعار الباقات", "Packages Prices")}
        </a>
      </div>
    </div>
  );
};

export default AvailableSites;
