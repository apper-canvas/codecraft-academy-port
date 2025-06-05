import React from 'react';
      import Input from '@/components/atoms/Input';
      import ApperIcon from '@/components/ApperIcon';

      function SearchBar({ placeholder, value, onChange, className = '' }) {
        return (
          <div className={`hidden md:block ${className}`}>
            <Input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              icon={ApperIcon.Search}
              className="w-64"
            />
          </div>
        );
      }

      export default SearchBar;