import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import IconText from '@/components/atoms/IconText';
      import ProgressRing from '@/components/atoms/ProgressRing';
      import CardImage from '@/components/atoms/CardImage';

      function CourseCard({ course, progress, onClick, getDifficultyColor, getLanguageIcon }) {
        const completionPercentage = progress ?
          Math.round((progress.completedLessons?.length || 0) / (course.lessons?.length || 1) * 100) : 0;

return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-700/20 cursor-pointer group hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative mb-3 sm:mb-4">
        <CardImage icon={getLanguageIcon(course.language)} />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {course.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 sm:mb-4 line-clamp-2">
        {course.description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
        <IconText icon="Clock" text={course.duration} className="text-xs sm:text-sm text-gray-500 dark:text-gray-400" />
        <IconText icon="BookOpen" text={`${course.lessons?.length || 0} lessons`} className="text-xs sm:text-sm text-gray-500 dark:text-gray-400" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <ProgressRing percentage={completionPercentage} />
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">Progress</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {progress?.completedLessons?.length || 0} of {course.lessons?.length || 0} lessons
            </p>
          </div>
        </div>

        <Button variant="primary" className="text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 touch-target-sm sm:touch-target">
          {completionPercentage > 0 ? 'Continue' : 'Start'}
        </Button>
      </div>
    </motion.div>
  );
}

      export default CourseCard;