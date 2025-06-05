import React from 'react';
      import { motion } from 'framer-motion';
      import LessonContent from '@/components/molecules/LessonContent';
      import CodeEditor from '@/components/molecules/CodeEditor';

      function CourseDetail({
        selectedCourse,
        lessons,
        selectedLesson,
        setSelectedCourse,
        setSelectedLesson,
        codeEditorContent,
        setCodeEditorContent,
        codeOutput,
        codeLanguage,
        setCodeLanguage,
        isRunning,
        onRunCode,
        getDifficultyColor
      }) {
        const languageOptions = [
          { value: 'python', label: 'Python' },
          { value: 'javascript', label: 'JavaScript' },
        ];

        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <LessonContent
                selectedCourse={selectedCourse}
                selectedLesson={selectedLesson}
                lessons={lessons}
                onBack={() => setSelectedCourse(null)}
                onPrevious={() => {
                  const currentIndex = lessons.indexOf(selectedLesson);
                  if (currentIndex > 0) {
                    setSelectedLesson(lessons[currentIndex - 1]);
                  }
                }}
                onNext={() => {
                  const currentIndex = lessons.indexOf(selectedLesson);
                  if (currentIndex < lessons.length - 1) {
                    setSelectedLesson(lessons[currentIndex + 1]);
                  }
                }}
                onSelectLesson={setSelectedLesson}
                getDifficultyColor={getDifficultyColor}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <CodeEditor
                codeEditorContent={codeEditorContent}
                setCodeEditorContent={setCodeEditorContent}
                codeOutput={codeOutput}
                codeLanguage={codeLanguage}
                setCodeLanguage={setCodeLanguage}
                isRunning={isRunning}
                onRunCode={onRunCode}
                languageOptions={languageOptions}
              />
            </motion.div>
          </div>
        );
      }

      export default CourseDetail;