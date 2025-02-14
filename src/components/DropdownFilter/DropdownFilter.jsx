import { useEffect, useState } from "react";
import "./DropdownFilter.css";
import { MdArrowDropDown } from "react-icons/md";
export default function DropdownFilter({
  label,
  options,
  selectedValues,
  setSelectedValue,
  dependenteFilter,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if (!options) return;

    const newFilteredOptions = options.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredOptions(newFilteredOptions);
  }, [query, options]);

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
        <div
          className="expanded"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="text"
            placeholder="pesquisar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {filteredOptions.map((value) => (
            <span>
              <input type="checkbox" />
              <p>{value}</p>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
