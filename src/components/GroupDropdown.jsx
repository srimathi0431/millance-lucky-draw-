import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const GroupDropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select Group',
  className = ''
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

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef} className={`relative ${className}`} style={{ zIndex: isOpen ? 9999 : 'auto' }}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[44px] lg:h-[46px] px-4 bg-slate-800 border border-slate-700 rounded-lg 
                   flex items-center justify-between text-white hover:bg-slate-700 hover:border-slate-600 
                   transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      >
        <span className="text-sm font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute w-full bg-slate-800 border border-slate-700 rounded-lg 
                     shadow-2xl overflow-hidden animate-dropdown"
          style={{
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 9999
          }}
        >
          <div className="max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-400 text-center">
                No groups available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors duration-150
                    ${value === option.value 
                      ? 'bg-purple-600 text-white font-semibold' 
                      : 'text-gray-300 hover:bg-slate-700'
                    }`}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDropdown;
