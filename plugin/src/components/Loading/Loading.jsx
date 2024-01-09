import "./Loading.scss";
// Custom Loading Spinner
const Loading = ({ size = 30, type = "default" }) => {
  // Circle Notch Spiner
  if (type === "circle-notch") return <i style={{ fontSize: size, width: size }} className="loading circle-notch fa-solid fa-circle-notch"></i>;
  // Arrow Spinner
  else if (type === "arrow-spinner") return <i style={{ fontSize: size, width: size }} className="loading arrow-spinner fa-solid fa-rotate-right"></i>;
  // Spinner Donts
  else if (type === "spinner-dots") return <i style={{ fontSize: size, width: size }} className="loading loading-spinner-dots fa-solid fa-spinner"></i>;
  // Three dots
  else if (type === "three-dots")
    return (
      <div className="loading three-dots">
        <span style={{ width: size }} className="dot dot-1"></span>
        <span style={{ width: size }} className="dot dot-2"></span>
        <span style={{ width: size }} className="dot dot-3"></span>
      </div>
    );
  // Default Type
  else return <div style={{ width: size }} className="loading default-loading"></div>;
};

export default Loading;
