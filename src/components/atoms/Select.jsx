import React from 'react';

      function Select({ options, value, onChange, className = '', ...props }) {
        return (
          <select
            value={value}
            onChange={onChange}
            className={`text-sm border border-gray-200 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      }

      export default Select;