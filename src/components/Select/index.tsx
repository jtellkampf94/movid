import "./select.scss";

interface SelectProps {
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({ placeholder, children }) => {
  return (
    <div className="select-box">
      <div className="options-container">
        {children}
        <div className="selected">{placeholder}</div>
      </div>
    </div>
  );
};

export default Select;
