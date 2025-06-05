import React from 'react';
      import Button from '@/components/atoms/Button';
      import ApperIcon from '@/components/ApperIcon';

      function TabNavigation({ items, activeItem, onSelect, className = '' }) {
        return (
          <div className={`grid grid-cols-2 lg:grid-cols-4 bg-white/60 backdrop-blur-md rounded-xl p-2 mb-8 border border-white/20 ${className}`}>
            {items.map((item) => (
              <Button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`py-2 px-4 rounded-lg text-center transition-all duration-300 ${
                  activeItem === item.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-transparent text-gray-700 hover:bg-white/70'
                }`}
                variant="text"
              >
                <ApperIcon name={item.icon} className="h-5 w-5 mr-2" />
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        );
      }

      export default TabNavigation;