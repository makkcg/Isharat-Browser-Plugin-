import "./Switch.scss";

export default function Switch({ color = "", id = "", active, changeSwitch }) {
  return (
    <span data-id={id} onClick={changeSwitch} className={`switch ${active ? "active" : ""} ${color}`}>
      Off
    </span>
  );
}
