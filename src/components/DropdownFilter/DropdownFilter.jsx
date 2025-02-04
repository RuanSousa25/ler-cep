import { useEffect, useState } from "react";
import "./DropdownFilter.css";
import { MdArrowDropDown } from "react-icons/md";
export default function DropdownFilter({ label, options, setFilteredOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log(options);
    const filteredOptions = options.filter((option) => {
      return option.toLowerCase().includes(query.toLowerCase);
    });
  }, []);

  return (
    <div
      className="filter-dropdown"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <label>{label}</label>
      <MdArrowDropDown className="icon" />

      {isOpen && (
        <div className="expanded">
          {options.map((value) => (
            <p>{value}</p>
          ))}
        </div>
      )}
    </div>
  );
}
