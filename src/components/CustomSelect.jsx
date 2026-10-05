import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CustomSelect = ({ 
  value, 
  onChange, 
  options, 
  label, 
  placeholder = 'Select option',
  type = 'default' // 'team' or 'group'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      {label && <label className="custom-select-label">{label}</label>}
      
      {/* Trigger */}
      <button
        type="button"
        className={`custom-select-trigger ${type === 'team' ? 'custom-select-team' : 'custom-select-group'} ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-select-text">{displayText}</span>
        {isOpen ? (
          <ChevronUp className="custom-select-icon" />
        ) : (
          <ChevronDown className="custom-select-icon" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`custom-select-menu ${isOpen ? 'custom-select-menu-open' : ''}`}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`custom-select-option ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
