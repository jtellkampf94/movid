import React, { useState, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import "./dropdown.scss";

interface Item {
  id: number | string;
  name: string;
}

interface DropdownProps {
  title: string;
  items: Item[];
  setState: React.Dispatch<React.SetStateAction<string | null>>;
}

const Dropdown: React.FC<DropdownProps> = ({ title, items, setState }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | Item>(null);
  const ref = useRef(null);

  const handleClick = (item: Item): void => {
    setSelected(item);
    setState(item.id.toString());
    setOpen(false);
  };

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);
  return (
    <div
      ref={ref}
      onClick={e => e.stopPropagation()}
      className={`dropdown ${open ? "active" : ""}`}
    >
      <div
        tabIndex={0}
        className="dropdown-header"
        role="button"
        onKeyPress={() => setOpen(!open)}
        onClick={() => setOpen(!open)}
      >
        <p className={`dropdown-header-title ${selected ? "active" : ""}`}>
          {selected ? selected.name : title}
        </p>
      </div>
      <ul className={`dropdown-list ${open ? "active" : ""}`}>
        {items.map(item => (
          <li
            className="dropdown-list-item"
            key={item.id}
            onClick={() => handleClick(item)}
          >
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
