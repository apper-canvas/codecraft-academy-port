import React from 'react';

      function Input({ type = 'text', placeholder, value, onChange, className = '', icon: Icon, ...props }) {
        return (
          <div className="relative">
            {Icon && (
              <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            )}
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className={`pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
              {...props}
            />
          </div>
        );
      }

      export default Input;