const FormText = ({ icon, title = "Enter Title", value = "", classes = "" }) => {
  return (
    <div className={`input-group form-input-text-group ${classes}`}>
      <p className="input-group-label">{title}</p>
      {icon && (
        <div className="input">
          <div className="icon">
            <i className={icon}></i>
          </div>
          <p className="form-input-text">{value}</p>
        </div>
      )}

      {!icon && <p className="form-input-text">{value}</p>}
      <div className={`hint ${name}-hint`}></div>
    </div>
  );
};

export default FormText;
