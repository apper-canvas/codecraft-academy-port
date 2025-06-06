import React from 'react';
      import { motion } from 'framer-motion';
      import CourseCard from '@/components/molecules/CourseCard';

      function CourseCatalog({ courses, userProgress, onSelectCourse, getDifficultyColor, getLanguageIcon }) {
return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
    >
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          progress={userProgress[course.id]}
          onClick={() => onSelectCourse(course)}
          getDifficultyColor={getDifficultyColor}
          getLanguageIcon={getLanguageIcon}
        />
      ))}
    </motion.div>
  );
}

      export default CourseCatalog;