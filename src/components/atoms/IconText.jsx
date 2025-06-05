import React from 'react';
      import ApperIcon from '@/components/ApperIcon';

      function IconText({ icon, text, className = '' }) {
        return (
          <div className={`flex items-center space-x-2 ${className}`}>
            <ApperIcon name={icon} className="h-4 w-4" />
            <span>{text}</span>
          </div>
        );
      }

      export default IconText;