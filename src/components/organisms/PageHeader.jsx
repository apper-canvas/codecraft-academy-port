import React from 'react';
      import ApperIcon from '@/components/ApperIcon';
      import Logo from '@/components/atoms/Logo';
      import SearchBar from '@/components/molecules/SearchBar';
      import Button from '@/components/atoms/Button';

      function PageHeader() {
        return (
          <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Logo />

                <div className="flex items-center space-x-4">
                  <SearchBar placeholder="Search courses and lessons" />

                  <Button variant="text" className="relative p-2 text-gray-400 hover:text-gray-600">
                    <ApperIcon name="Bell" className="h-5 w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
                  </Button>

                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </header>
        );
      }

      export default PageHeader;