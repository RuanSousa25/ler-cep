import { useEffect, useState } from "react";

export default function DropdownFilter({ label, options, setFilteredOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filteredOptions = options.filter((option) => {
      return option.toLowerCase().includes(query.toLowerCase);
    });
  }, []);

  return (
    <div className="filter-dropdown">
      <label>{label}</label>
    </div>
  );
}
