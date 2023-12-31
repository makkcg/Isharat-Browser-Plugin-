import { useContext, useState } from "react";
import { have } from "../../utils/search";
import { AppContext } from "../../contexts/AppContext";
import "./SelectBox.scss";

const SelectBox = ({ text, nameField, secNameField, list, selectedItem, setSelectedItem }) => {
  const { getText } = useContext(AppContext);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [SearchValue, setSearchValue] = useState("");
  return (
    <div onMouseLeave={() => setDropdownActive(false)} className={`select-box ${dropdownActive ? "active" : ""}`}>
      <span onClick={() => setDropdownActive(!dropdownActive)} className="selected-item">
        <div className="text">
          {text}: {selectedItem[nameField]} {secNameField ? `(${selectedItem[secNameField]})` : ""}
        </div>{" "}
        <i className="fa-solid fa-sort-down"></i>
      </span>
      <div className="select-dropdown">
        <div className="dropdown-search-box">
          <input name="search" onChange={e => setSearchValue(e.target.value)} className="search-input" type="search" placeholder={getText("بحث...", "Search...")} />
        </div>
        <ul className="dropdown-list">
          {list.map((item, index) => {
            let active = selectedItem.id === item.id ? "active" : "";
            if (!have(item[nameField], SearchValue)) return;
            return (
              <li
                onClick={() => {
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
    </div>
  );
};

export default SelectBox;
