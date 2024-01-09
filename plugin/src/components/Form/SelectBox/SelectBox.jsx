import { useContext, useEffect, useState } from "react";
import { have } from "../../../utils/search";
import { AppContext } from "../../../contexts/AppContext";
import "./SelectBox.scss";
import Loading from "../../Loading/Loading";

const SelectBox = ({
  text = "",
  nameField = "",
  secNameField = "",
  list = [],
  isLoading = false,
  noResultMsg = "",
  isError = false,
  refetch = () => {},
  selectedItem = {},
  removeSearch = false,
  setSelectedItem,
  forForm,
  icon
}) => {
  const { getText } = useContext(AppContext);
  // show & hide dropdown state
  const [dropdownActive, setDropdownActive] = useState(false);
  // search input value state
  const [SearchValue, setSearchValue] = useState("");

  // reset search value when dropdown is closed
  useEffect(() => {
    if (!dropdownActive) {
      setTimeout(() => {
        setSearchValue("");
      }, 200);
    }
  }, [dropdownActive]);

  return (
    <div className={`select-box ${dropdownActive ? "active" : ""} ${forForm ? "for-form" : ""}`}>
      {/* Selected item button */}
      <button
        onClick={e => {
          e.preventDefault();
          setDropdownActive(!dropdownActive);
        }}
        className="selected-item"
      >
        <div className="text">
          {forForm && icon && (
            <span className="icon">
              <i className={icon}></i>
            </span>
          )}
          {!forForm && `${text}:`} {selectedItem[nameField]} {secNameField && selectedItem[secNameField] ? `(${selectedItem[secNameField]})` : ""}
        </div>{" "}
        <div className="icons">
          {isLoading && <Loading size={25} />}
          <i className="fa-solid fa-sort-down"></i>
        </div>
      </button>
      {/* dropdown */}
      <div className="select-dropdown">
        {/* search bar */}
        {!removeSearch && (
          <div className="dropdown-search-box">
            <input
              value={SearchValue}
              name="search"
              onChange={e => setSearchValue(e.target.value)}
              className="search-input"
              type="search"
              placeholder={getText("بحث...", "Search...")}
            />
          </div>
        )}
        {/* Loading & Error Boxs */}
        {isLoading && <div className="loading-box">{<Loading type="three-dots" size={15} />}</div>}
        {isError && (
          <div className="error-box">
            <i className="fa-solid fa-exclamation-circle"></i>
            {getText("عذرا حدث خطأ!", "Sorry, Something went wrong!")}
            {/* Retry button */}
            <button className="link-btn" onClick={refetch}>
              {getText("إعادة المحاولة", "Retry")}
            </button>
          </div>
        )}
        {/* No Result Msg */}
        {!isLoading && !isError && list.length < 1 && <div className="no-result-box">{noResultMsg ? noResultMsg : `${getText("لا يوجد نتائج", "No Results")}`}</div>}
        {/* Select List */}
        {!isLoading && !isError && list.length > 0 && (
          <div className="list-box">
            <ul className="dropdown-list">
              {list.map((item, index) => {
                // detect selected item
                let active = selectedItem.id === item.id ? "active" : "";
                // remove items that doesn't match search value
                if (!have(item[nameField], SearchValue)) return;
                return (
                  <li
                    onClick={() => {
                      if (item.id === selectedItem.id) return;
                      setSelectedItem(item);
                      setDropdownActive(false);
                    }}
                    key={index}
                    className={`dropdown-item ${active}`}
                  >
                    {item[nameField]} {secNameField ? `(${item[secNameField]})` : ""} {selectedItem.id === item.id && <i className="fa-solid fa-circle-check"></i>}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBox;
