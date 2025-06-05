import React, { useState, useEffect } from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import { toast } from 'react-toastify';
      import ApperIcon from '@/components/ApperIcon';
      import CourseCatalog from '@/components/organisms/CourseCatalog';
      import CourseDetail from '@/components/organisms/CourseDetail';
      import ChallengeList from '@/components/organisms/ChallengeList';
      import ChallengeDetail from '@/components/organisms/ChallengeDetail';
      import FeatureDisplay from '@/components/molecules/FeatureDisplay';

      import lessonService from '@/services/api/lessonService';
      import challengeService from '@/services/api/challengeService';
      import progressService from '@/services/api/progressService';

      function MainContentArea({ courses, userProgress, activeSection, onSectionChange }) {
        const [selectedCourse, setSelectedCourse] = useState(null);
        const [lessons, setLessons] = useState([]);
        const [challenges, setChallenges] = useState([]);
        const [selectedLesson, setSelectedLesson] = useState(null);
        const [selectedChallenge, setSelectedChallenge] = useState(null);
        const [codeEditorContent, setCodeEditorContent] = useState('');
        const [codeOutput, setCodeOutput] = useState('');
        const [codeLanguage, setCodeLanguage] = useState('python');
        const [isRunning, setIsRunning] = useState(false);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [showCelebration, setShowCelebration] = useState(false);

        const comingSoonSections = ['projects', 'achievements', 'community'];

        useEffect(() => {
          if (selectedCourse) {
            const loadLessons = async () => {
              setLoading(true);
              try {
                const result = await lessonService.getAll();
                const courseLessons = result?.filter(lesson => lesson.courseId === selectedCourse.id) || [];
                setLessons(courseLessons);
                if (courseLessons.length > 0) {
                  setSelectedLesson(courseLessons[0]);
                  setCodeEditorContent(courseLessons[0].codeExamples?.[0] || `# Welcome to ${selectedCourse.title}!\n# Let's start coding...\n\nprint("Hello, CodeCraft Academy!")`);
                }
              } catch (err) {
                setError(err.message);
                toast.error('Failed to load lessons');
              } finally {
                setLoading(false);
              }
            };
            loadLessons();
          } else {
            setLessons([]);
            setSelectedLesson(null);
          }
        }, [selectedCourse]);

        useEffect(() => {
          if (activeSection === 'challenges') {
            const loadChallenges = async () => {
              setLoading(true);
              try {
                const result = await challengeService.getAll();
                setChallenges(result || []);
              } catch (err) {
                setError(err.message);
                toast.error('Failed to load challenges');
              } finally {
                setLoading(false);
              }
            };
            loadChallenges();
          } else {
            setChallenges([]);
            setSelectedChallenge(null);
          }
        }, [activeSection]);

        const runCode = async () => {
          setIsRunning(true);
          setCodeOutput('');

          try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (codeLanguage === 'python') {
              if (codeEditorContent.includes('print(')) {
                const printMatches = codeEditorContent.match(/print\((.*?)\)/g);
                if (printMatches) {
                  const outputs = printMatches.map(match => {
                    const content = match.match(/print\((.*?)\)/)[1];
                    return content.replace(/['"]/g, '');
                  });
                  setCodeOutput(outputs.join('\n'));
                }
              } else {
                setCodeOutput('Code executed successfully!');
              }
            } else if (codeLanguage === 'javascript') {
              if (codeEditorContent.includes('console.log(')) {
                const logMatches = codeEditorContent.match(/console\.log\((.*?)\)/g);
                if (logMatches) {
                  const outputs = logMatches.map(match => {
                    const content = match.match(/console\.log\((.*?)\)/)[1];
                    return content.replace(/['"]/g, '');
                  });
                  setCodeOutput(outputs.join('\n'));
                }
              } else {
                setCodeOutput('Code executed successfully!');
              }
            }

            toast.success('Code executed successfully!');
          } catch (err) {
            setCodeOutput('Error: Something went wrong while running your code.');
            toast.error('Code execution failed');
          } finally {
            setIsRunning(false);
          }
        };

        const submitChallenge = async () => {
          if (!selectedChallenge) return;

          setIsRunning(true);
          try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const hasValidSolution = codeEditorContent.toLowerCase().includes('def ') ||
                                    codeEditorContent.toLowerCase().includes('function') ||
                                    codeEditorContent.trim().length > 10;

            if (hasValidSolution) {
              setShowCelebration(true);
              toast.success('🎉 Challenge completed! Well done!');
              setTimeout(() => setShowCelebration(false), 3000);

              try {
                await progressService.update(selectedChallenge.id, {
                  completed: true,
                  score: 100
                });
              } catch (err) {
                console.warn('Failed to update progress:', err);
              }
            } else {
              toast.error('Try adding more code to solve this challenge!');
            }
          } catch (err) {
            toast.error('Failed to submit challenge');
          } finally {
            setIsRunning(false);
          }
        };

        const getDifficultyColor = (difficulty) => {
          switch (difficulty?.toLowerCase()) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
          }
        };

        const getLanguageIcon = (language) => {
          switch (language?.toLowerCase()) {
            case 'python': return 'FileText';
            case 'javascript': return 'Globe';
            case 'java': return 'Coffee';
            default: return 'Code2';
          }
        };

        if (loading) {
          return (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
                <span className="text-gray-600">Loading content...</span>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <AnimatePresence>
              {showCelebration && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 0.6, repeat: 2 }}
                    className="bg-white rounded-3xl p-8 text-center shadow-2xl"
                  >
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Amazing work!</h3>
                    <p className="text-gray-600">Challenge completed successfully!</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {activeSection === 'courses' && !selectedCourse && (
              <CourseCatalog
                courses={courses}
                userProgress={userProgress}
                onSelectCourse={setSelectedCourse}
                getDifficultyColor={getDifficultyColor}
                getLanguageIcon={getLanguageIcon}
              />
            )}

            {activeSection === 'courses' && selectedCourse && (
              <CourseDetail
                selectedCourse={selectedCourse}
                lessons={lessons}
                selectedLesson={selectedLesson}
                setSelectedCourse={setSelectedCourse}
                setSelectedLesson={setSelectedLesson}
                codeEditorContent={codeEditorContent}
                setCodeEditorContent={setCodeEditorContent}
                codeOutput={codeOutput}
                codeLanguage={codeLanguage}
                setCodeLanguage={setCodeLanguage}
                isRunning={isRunning}
                onRunCode={runCode}
                getDifficultyColor={getDifficultyColor}
              />
            )}

            {activeSection === 'challenges' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChallengeList
                  challenges={challenges}
                  selectedChallenge={selectedChallenge}
                  onSelectChallenge={(challenge) => {
                    setSelectedChallenge(challenge);
                    setCodeEditorContent(challenge.starterCode || '# Start coding here...\n');
                  }}
                />
                <ChallengeDetail
                  selectedChallenge={selectedChallenge}
                  codeEditorContent={codeEditorContent}
                  setCodeEditorContent={setCodeEditorContent}
                  isRunning={isRunning}
                  onSubmitChallenge={submitChallenge}
                />
              </div>
            )}

            {comingSoonSections.includes(activeSection) && (
              <FeatureDisplay activeSection={activeSection} />
            )}
          </div>
        );
      }

      export default MainContentArea;