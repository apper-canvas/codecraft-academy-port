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
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/20 z-50">
            <div className="grid grid-cols-4 gap-1 p-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex flex-col items-center py-2 px-1 rounded-lg ${
                    activeSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600'
                  }`}
                  variant="text"
                >
                  <ApperIcon name={item.icon} className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium capitalize">{item.id}</span>
                </Button>
              ))}
            </div>
          </div>
        );
      }

      export default MobileNav;