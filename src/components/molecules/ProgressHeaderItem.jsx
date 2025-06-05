import React from 'react';
      import ApperIcon from '@/components/ApperIcon';

      function ProgressHeaderItem({ icon, iconBg, count, label }) {
        return (
          <div className="text-center">
            <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <ApperIcon name={icon} className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{count}</h3>
            <p className="text-gray-600">{label}</p>
          </div>
        );
      }

      export default ProgressHeaderItem;