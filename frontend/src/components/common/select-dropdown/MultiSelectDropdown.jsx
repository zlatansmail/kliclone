import React from "react";
import AsyncSelect from "react-select/async";

const MultiSelectDropdown = ({ defaultValue = [], loadOptions, onChange }) => {
  return (
    <AsyncSelect
      defaultValue={defaultValue}
      defaultOptions={true}
      isMulti={true}
      loadOptions={loadOptions}
      className="multi-select-dropdown"
      onChange={onChange}
    />
  );
};

export default MultiSelectDropdown;
