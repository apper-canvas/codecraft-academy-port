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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-gray-600 font-medium">Loading CodeCraft Academy...</p>
                </div>
              </div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="AlertTriangle" className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="primary"
                >
                  Try Again
                </Button>
              </div>
            </div>
          );
        }

        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <PageHeader />

            <div className="flex">
              <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />

              <main className="flex-1 p-4 lg:p-8">
                <div className="max-w-6xl mx-auto">
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