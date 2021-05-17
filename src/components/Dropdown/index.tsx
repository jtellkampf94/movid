import { useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface Item {
  id: number;
  name: string;
}

interface DropdownProps {
  title: string;
  items: Item[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | Item>(null);
  const ref = useRef(null);

  const handleClick = (item: Item): void => {
    setSelected(item);
    setOpen(false);
  };

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);
  return (
    <div ref={ref} onClick={e => e.stopPropagation()} className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => setOpen(!open)}
        onClick={() => setOpen(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">
            {selected ? selected.name : title}
          </p>
        </div>
        <div className="dd-header__action">
          <p>{open ? "Close" : "Open"}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => handleClick(item)}>
                select
              </button>
              <span>{item.name}</span>
              <span>{selected && item.id === selected.id && "selected"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
