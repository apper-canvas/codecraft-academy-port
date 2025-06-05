import React from 'react';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';

      function SidebarNavLink({ item, active, onClick }) {
        return (
          <Button
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              active
                ? 'bg-primary text-white shadow-lg'
                : item.functional
                ? 'text-gray-700 hover:bg-white/60'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            disabled={!item.functional}
            variant={active ? 'primary' : 'text'}
          >
            <ApperIcon name={item.icon} className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
            {!item.functional && (
              <ApperIcon name="Lock" className="h-3 w-3 ml-auto" />
            )}
          </Button>
        );
      }

      export default SidebarNavLink;