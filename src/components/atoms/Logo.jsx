import React from 'react';
      import ApperIcon from '@/components/ApperIcon';

      function Logo({ className = '' }) {
        return (
          <div className={`flex items-center space-x-2 ${className}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
              <ApperIcon name="Code2" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CodeCraft Academy</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Learn. Code. Create.</p>
            </div>
          </div>
        );
      }

      export default Logo;