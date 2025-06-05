import React from 'react';
      import SidebarNavLink from '@/components/molecules/SidebarNavLink';

      function Sidebar({ activeSection, onSectionChange }) {
        const navItems = [
          { id: 'courses', label: 'My Courses', icon: 'BookOpen', functional: true },
          { id: 'challenges', label: 'Challenges', icon: 'Target', functional: true },
          { id: 'projects', label: 'Projects', icon: 'Folder', functional: false },
          { id: 'achievements', label: 'Achievements', icon: 'Award', functional: false },
          { id: 'community', label: 'Community', icon: 'Users', functional: false },
          { id: 'settings', label: 'Settings', icon: 'Settings', functional: true }
        ];

        return (
          <aside className="hidden lg:block w-64 bg-white/60 backdrop-blur-md border-r border-white/20 min-h-screen">
            <nav className="p-6 space-y-2">
              {navItems.map((item) => (
                <SidebarNavLink
                  key={item.id}
                  item={item}
                  active={activeSection === item.id && item.functional}
                  onClick={() => item.functional && onSectionChange(item.id)}
                />
              ))}
            </nav>
          </aside>
        );
      }

      export default Sidebar;