import React from "react";
import { DropdownButton, Form } from "react-bootstrap";

const MultiSelectDropdown = ({ options, selectedOptions, onChange }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const newSelectedOptions = checked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);
    onChange(newSelectedOptions);
  };

  return (
    <DropdownButton title="Assign Services" className="mb-3">
      {options.map((option) => (
        <Form.Check
          key={option.id}
          type="checkbox"
          label={option.name}
          value={option.id}
          checked={selectedOptions.includes(option.id)} // Check by service name
          onChange={handleCheckboxChange}
        />
      ))}
    </DropdownButton>
  );
};

export default MultiSelectDropdown;
