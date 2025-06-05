import React from 'react';
      import PageHeader from '@/components/organisms/PageHeader';
      import Sidebar from '@/components/organisms/Sidebar';
      import UserProgressSection from '@/components/organisms/UserProgressSection';
      import MainContentArea from '@/components/organisms/MainContentArea';
      import MobileNav from '@/components/organisms/MobileNav';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';

      function HomePageTemplate({
        courses,
        userProgress,
        activeSection,
        onSectionChange,
        loading,
        error
      }) {
if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-primary"></div>
            <p className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">Loading CodeCraft Academy...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <ApperIcon name="AlertTriangle" className="h-12 sm:h-16 w-12 sm:w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="primary"
            className="touch-target"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <PageHeader />

      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />

        <main className="flex-1 p-3 sm:p-4 lg:p-8 safe-area-bottom">
          <div className="max-w-7xl mx-auto">
            <UserProgressSection userProgressCount={Object.keys(userProgress).length} />
            <MainContentArea
              courses={courses}
              userProgress={userProgress}
              activeSection={activeSection}
              onSectionChange={onSectionChange}
            />
          </div>
        </main>
      </div>

      <MobileNav activeSection={activeSection} onSectionChange={onSectionChange} />
    </div>
  );
}

      export default HomePageTemplate;