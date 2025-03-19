import { useEffect, useMemo, useState } from "react";
import "./DropdownFilter.css";
import {
  MdArrowDropDown,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
} from "react-icons/md";
export default function DropdownFilter({
  label,
  options,
  selectedValues = [],
  setSelectedValues,
  dependenteFilter,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!options) return;
    let optionsClone = [...options];
    let newFilteredOptions = [];
    selectedValues.forEach((value) => {
      newFilteredOptions.push({ value, isSelected: true });
      optionsClone.splice(optionsClone.indexOf(value), 1);
    });

    optionsClone.forEach((option) => {
      if (option.toLowerCase().includes(query.toLowerCase())) {
        newFilteredOptions.push({ value: option, selected: false });
      }
    });
    return newFilteredOptions;
  }, [query, options, selectedValues]);

  function handleSelect(value) {
    let newSelectedValues = selectedValues;
    let index = newSelectedValues.indexOf(value);
    if (index === -1) {
      setSelectedValues([...newSelectedValues, value]);
      return;
    }
    newSelectedValues.splice(index, 1);
    setSelectedValues([...newSelectedValues]);
  }
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
          {filteredOptions.map(({ value, isSelected }, index) => (
            <span
              onClick={() => {
                handleSelect(value, index);
              }}
            >
              <span>
                {isSelected ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank />
                )}
              </span>
              <p> {value}</p>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
