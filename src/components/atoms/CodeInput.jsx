import React from 'react';

      function CodeInput({ value, onChange, placeholder, className = '', ...props }) {
        return (
          <textarea
            value={value}
            onChange={onChange}
            className={`w-full h-64 p-4 bg-surface-800 text-green-300 font-mono text-sm resize-none focus:outline-none code-editor ${className}`}
            placeholder={placeholder}
            spellCheck={false}
            {...props}
          />
        );
      }

      export default CodeInput;