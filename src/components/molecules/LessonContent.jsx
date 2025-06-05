import React from 'react';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';

      function LessonContent({
        selectedCourse,
        selectedLesson,
        lessons,
        onBack,
        onPrevious,
        onNext,
        onSelectLesson,
        getDifficultyColor
      }) {
        return (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <Button
                onClick={onBack}
                variant="text"
                className="text-gray-600 hover:text-gray-900"
                icon={ApperIcon.ArrowLeft}
              >
                Back to Courses
              </Button>

              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(selectedCourse.difficulty)}`}>
                  {selectedCourse.difficulty}
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedCourse.title}</h2>

            {selectedLesson && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{selectedLesson.title}</h3>
                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed">{selectedLesson.content}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Button
                    disabled={lessons.indexOf(selectedLesson) === 0}
                    onClick={onPrevious}
                    variant="outline"
                    icon={ApperIcon.ChevronLeft}
                  >
                    Previous
                  </Button>

                  <div className="flex space-x-1">
                    {lessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          lesson.id === selectedLesson.id ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    disabled={lessons.indexOf(selectedLesson) === lessons.length - 1}
                    onClick={onNext}
                    variant="outline"
                    icon={ApperIcon.ChevronRight}
                    iconPosition="right"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      }

      export default LessonContent;