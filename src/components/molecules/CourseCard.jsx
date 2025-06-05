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
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 cursor-pointer group hover:shadow-xl transition-all duration-300"
            onClick={onClick}
          >
            <div className="relative mb-4">
              <CardImage icon={getLanguageIcon(course.language)} />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <IconText icon="Clock" text={course.duration} className="text-sm text-gray-500" />
              <IconText icon="BookOpen" text={`${course.lessons?.length || 0} lessons`} className="text-sm text-gray-500" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ProgressRing percentage={completionPercentage} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Progress</p>
                  <p className="text-xs text-gray-500">
                    {progress?.completedLessons?.length || 0} of {course.lessons?.length || 0} lessons
                  </p>
                </div>
              </div>

              <Button variant="primary">
                {completionPercentage > 0 ? 'Continue' : 'Start'}
              </Button>
            </div>
          </motion.div>
        );
      }

      export default CourseCard;