import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import lessonService from '../services/api/lessonService'
import challengeService from '../services/api/challengeService'
import progressService from '../services/api/progressService'

function MainFeature({ courses, userProgress, activeSection, onSectionChange }) {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [challenges, setChallenges] = useState([])
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [codeEditorContent, setCodeEditorContent] = useState('')
  const [codeOutput, setCodeOutput] = useState('')
  const [codeLanguage, setCodeLanguage] = useState('python')
  const [isRunning, setIsRunning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)

  // Load lessons when a course is selected
  useEffect(() => {
    if (selectedCourse) {
      const loadLessons = async () => {
        setLoading(true)
        try {
          const result = await lessonService.getAll()
          const courseLessons = result?.filter(lesson => lesson.courseId === selectedCourse.id) || []
          setLessons(courseLessons)
          if (courseLessons.length > 0) {
            setSelectedLesson(courseLessons[0])
            setCodeEditorContent(courseLessons[0].codeExamples?.[0] || `# Welcome to ${selectedCourse.title}!\n# Let's start coding...\n\nprint("Hello, CodeCraft Academy!")`)
          }
        } catch (err) {
          setError(err.message)
          toast.error('Failed to load lessons')
        } finally {
          setLoading(false)
        }
      }
      loadLessons()
    }
  }, [selectedCourse])

  // Load challenges when challenges section is active
  useEffect(() => {
    if (activeSection === 'challenges') {
      const loadChallenges = async () => {
        setLoading(true)
        try {
          const result = await challengeService.getAll()
          setChallenges(result || [])
        } catch (err) {
          setError(err.message)
          toast.error('Failed to load challenges')
        } finally {
          setLoading(false)
        }
      }
      loadChallenges()
    }
  }, [activeSection])

  const runCode = async () => {
    setIsRunning(true)
    setCodeOutput('')
    
    try {
      // Simulate code execution with delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simple code execution simulation
      if (codeLanguage === 'python') {
        if (codeEditorContent.includes('print(')) {
          const printMatches = codeEditorContent.match(/print\((.*?)\)/g)
          if (printMatches) {
            const outputs = printMatches.map(match => {
              const content = match.match(/print\((.*?)\)/)[1]
              return content.replace(/['"]/g, '')
            })
            setCodeOutput(outputs.join('\n'))
          }
        } else {
          setCodeOutput('Code executed successfully!')
        }
      } else if (codeLanguage === 'javascript') {
        if (codeEditorContent.includes('console.log(')) {
          const logMatches = codeEditorContent.match(/console\.log\((.*?)\)/g)
          if (logMatches) {
            const outputs = logMatches.map(match => {
              const content = match.match(/console\.log\((.*?)\)/)[1]
              return content.replace(/['"]/g, '')
            })
            setCodeOutput(outputs.join('\n'))
          }
        } else {
          setCodeOutput('Code executed successfully!')
        }
      }
      
      toast.success('Code executed successfully!')
    } catch (err) {
      setCodeOutput('Error: Something went wrong while running your code.')
      toast.error('Code execution failed')
    } finally {
      setIsRunning(false)
    }
  }

  const submitChallenge = async () => {
    if (!selectedChallenge) return
    
    setIsRunning(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simple validation - check if code contains expected keywords
      const hasValidSolution = codeEditorContent.toLowerCase().includes('def ') || 
                              codeEditorContent.toLowerCase().includes('function') ||
                              codeEditorContent.trim().length > 10
      
      if (hasValidSolution) {
        setShowCelebration(true)
        toast.success('🎉 Challenge completed! Well done!')
        setTimeout(() => setShowCelebration(false), 3000)
        
        // Update progress
        try {
          await progressService.update(selectedChallenge.id, {
            completed: true,
            score: 100
          })
        } catch (err) {
          console.warn('Failed to update progress:', err)
        }
      } else {
        toast.error('Try adding more code to solve this challenge!')
      }
    } catch (err) {
      toast.error('Failed to submit challenge')
    } finally {
      setIsRunning(false)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLanguageIcon = (language) => {
    switch (language?.toLowerCase()) {
      case 'python': return 'FileText'
      case 'javascript': return 'Globe'
      case 'java': return 'Coffee'
      default: return 'Code2'
    }
  }

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
          <span className="text-gray-600">Loading content...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
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

      {/* Course Catalog */}
      {activeSection === 'courses' && !selectedCourse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {courses.map((course) => {
            const progress = userProgress[course.id]
            const completionPercentage = progress ? 
              Math.round((progress.completedLessons?.length || 0) / (course.lessons?.length || 1) * 100) : 0

            return (
              <motion.div
                key={course.id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 cursor-pointer group hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="relative mb-4">
                  <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                    <ApperIcon 
                      name={getLanguageIcon(course.language)} 
                      className="h-16 w-16 text-primary group-hover:scale-110 transition-transform" 
                    />
                  </div>
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
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <ApperIcon name="Clock" className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <ApperIcon name="BookOpen" className="h-4 w-4" />
                    <span>{course.lessons?.length || 0} lessons</span>
                  </div>
                </div>

                {/* Progress Ring */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2"
                          strokeDasharray={`${completionPercentage}, 100`}
                          className="progress-ring"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-semibold text-gray-700">
                          {completionPercentage}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Progress</p>
                      <p className="text-xs text-gray-500">
                        {progress?.completedLessons?.length || 0} of {course.lessons?.length || 0} lessons
                      </p>
                    </div>
                  </div>
                  
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
                    {completionPercentage > 0 ? 'Continue' : 'Start'}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Course Detail View with Lesson */}
      {activeSection === 'courses' && selectedCourse && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lesson Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedCourse(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="h-4 w-4" />
                <span>Back to Courses</span>
              </button>
              
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

                {/* Lesson Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button
                    disabled={lessons.indexOf(selectedLesson) === 0}
                    onClick={() => {
                      const currentIndex = lessons.indexOf(selectedLesson)
                      if (currentIndex > 0) {
                        setSelectedLesson(lessons[currentIndex - 1])
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ApperIcon name="ChevronLeft" className="h-4 w-4" />
                    <span>Previous</span>
                  </button>
                  
                  <div className="flex space-x-1">
                    {lessons.map((lesson, index) => (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          lesson.id === selectedLesson.id ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    disabled={lessons.indexOf(selectedLesson) === lessons.length - 1}
                    onClick={() => {
                      const currentIndex = lessons.indexOf(selectedLesson)
                      if (currentIndex < lessons.length - 1) {
                        setSelectedLesson(lessons[currentIndex + 1])
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Next</span>
                    <ApperIcon name="ChevronRight" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Code Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
          >
            {/* Editor Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="text-sm border border-gray-200 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCodeEditorContent('')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                >
                  <ApperIcon name="RotateCcw" className="h-4 w-4" />
                </button>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                >
                  {isRunning ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <ApperIcon name="Play" className="h-4 w-4" />
                  )}
                  <span>{isRunning ? 'Running...' : 'Run'}</span>
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="relative">
              <textarea
                value={codeEditorContent}
                onChange={(e) => setCodeEditorContent(e.target.value)}
                className="w-full h-64 p-4 bg-surface-800 text-green-300 font-mono text-sm resize-none focus:outline-none code-editor"
                placeholder="Write your code here..."
                spellCheck={false}
              />
            </div>

            {/* Output Console */}
            <div className="border-t border-gray-700">
              <div className="p-3 bg-gray-700 text-white text-xs font-semibold">
                Output Console
              </div>
              <div className="p-4 bg-surface-800 text-green-300 font-mono text-sm min-h-[100px]">
                {codeOutput || (
                  <span className="text-gray-500">Run your code to see the output...</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Challenges Section */}
      {activeSection === 'challenges' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Challenge List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Coding Challenges</h2>
            
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedChallenge?.id === challenge.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => {
                    setSelectedChallenge(challenge)
                    setCodeEditorContent(challenge.starterCode || '# Start coding here...\n')
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Target" className="h-4 w-4 text-primary" />
                      <span className="text-sm text-gray-500">Challenge</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{challenge.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Challenge Detail and Editor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {selectedChallenge ? (
              <>
                {/* Challenge Description */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedChallenge.title}</h3>
                  <p className="text-gray-700 mb-4">{selectedChallenge.description}</p>
                  
                  {selectedChallenge.testCases && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Test Cases:</h4>
                      <div className="space-y-2">
                        {selectedChallenge.testCases.map((testCase, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm">
                            <div className="font-mono">
                              <span className="text-gray-600">Input:</span> {testCase.input}
                            </div>
                            <div className="font-mono">
                              <span className="text-gray-600">Expected:</span> {testCase.expected}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Code Editor for Challenge */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900">Solution Editor</h4>
                    <button
                      onClick={submitChallenge}
                      disabled={isRunning}
                      className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark disabled:opacity-50 transition-colors"
                    >
                      {isRunning ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <ApperIcon name="Send" className="h-4 w-4" />
                      )}
                      <span>{isRunning ? 'Checking...' : 'Submit'}</span>
                    </button>
                  </div>

                  <textarea
                    value={codeEditorContent}
                    onChange={(e) => setCodeEditorContent(e.target.value)}
                    className="w-full h-64 p-4 bg-surface-800 text-green-300 font-mono text-sm resize-none focus:outline-none"
                    placeholder="Write your solution here..."
                    spellCheck={false}
                  />
                </div>
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20">
                <ApperIcon name="Target" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Challenge</h3>
                <p className="text-gray-600">Choose a challenge from the list to start coding!</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default MainFeature