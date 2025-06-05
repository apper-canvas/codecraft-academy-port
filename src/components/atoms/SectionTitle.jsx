import React from 'react';

      function SectionTitle({ children, className = '' }) {
        return (
          <h2 className={`text-2xl font-bold text-gray-900 ${className}`}>
            {children}
          </h2>
        );
      }

      export default SectionTitle;