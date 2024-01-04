import "./Switch.scss";

export default function Switch({ id, active, changeSwitch }) {
  return (
    <span data-id={id} onClick={changeSwitch} className={`switch ${active ? "active" : ""}`}>
      Off
    </span>
  );
}
