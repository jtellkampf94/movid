import "./option.scss";

interface OptionProps {
  name: string;
  id: string;
  label: string;
}

const Option: React.FC<OptionProps> = ({ name, id, label }) => {
  return (
    <div className="option">
      <input type="radio" className="radio" id={id} name={name} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Option;
