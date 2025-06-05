import React from 'react';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';

      function MobileNav({ activeSection, onSectionChange }) {
        const navItems = [
          { id: 'courses', icon: 'BookOpen' },
          { id: 'challenges', icon: 'Target' },
          { id: 'projects', icon: 'Folder' },
          { id: 'settings', icon: 'Settings' }
        ];

return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 z-50 safe-area-bottom">
      <div className="grid grid-cols-4 gap-1 p-2 sm:p-3">
        {navItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex flex-col items-center py-2 sm:py-3 px-1 sm:px-2 rounded-lg transition-all duration-200 touch-target ${
              activeSection === item.id
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            variant="text"
          >
            <ApperIcon name={item.icon} className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
            <span className="text-xs font-medium capitalize leading-tight">{item.id}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

      export default MobileNav;