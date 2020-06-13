import React from "react";
import "./styles.css";

interface Props {
  label: string;
  checked: boolean;
  onChange(): void;
}

const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <label id="checkbox-container">
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
