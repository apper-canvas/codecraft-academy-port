import { useState, useEffect } from 'react';
import HomePageTemplate from '@/components/templates/HomePageTemplate';
import courseService from '@/services/api/courseService';
import progressService from '@/services/api/progressService';

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('courses');
  const [userProgress, setUserProgress] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [coursesResult, progressResult] = await Promise.all([
          courseService.getAll(),
          progressService.getAll()
        ]);
        setCourses(coursesResult || []);

        const progressMap = {};
        progressResult?.forEach(progress => {
          progressMap[progress.courseId] = progress;
        });
        setUserProgress(progressMap || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <HomePageTemplate
      courses={courses}
      userProgress={userProgress}
      activeSection={activeSection}
      onSectionChange={handleSectionChange}
      loading={loading}
      error={error}
      isMobile={isMobile}
    />
  );
}

export default HomePage;