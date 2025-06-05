import React from 'react';
      import Input from '@/components/atoms/Input';
      import ApperIcon from '@/components/ApperIcon';

function SearchBar({ placeholder, value, onChange, className = '' }) {
  return (
    <div className={`hidden sm:block ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        icon={ApperIcon.Search}
        className="w-48 sm:w-56 md:w-64 lg:w-72"
      />
    </div>
  );
}

export default SearchBar;