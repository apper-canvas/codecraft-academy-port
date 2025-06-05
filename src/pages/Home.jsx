import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import courseService from '../services/api/courseService'
import progressService from '../services/api/progressService'

function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeSection, setActiveSection] = useState('courses')
  const [userProgress, setUserProgress] = useState({})

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [coursesResult, progressResult] = await Promise.all([
          courseService.getAll(),
          progressService.getAll()
        ])
        setCourses(coursesResult || [])
        
        // Convert progress array to object for easier lookup
        const progressMap = {}
        progressResult?.forEach(progress => {
          progressMap[progress.courseId] = progress
        })
        setUserProgress(progressMap || {})
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  const comingSoonSections = ['projects', 'achievements', 'community']

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
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                <ApperIcon name="Code2" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CodeCraft Academy</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Learn. Code. Create.</p>
              </div>
            </div>

            {/* Search and actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <div className="relative">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses and lessons"
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                  />
                </div>
              </div>
              
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <ApperIcon name="Bell" className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white/60 backdrop-blur-md border-r border-white/20 min-h-screen">
          <nav className="p-6 space-y-2">
            {[
              { id: 'courses', label: 'My Courses', icon: 'BookOpen', functional: true },
              { id: 'challenges', label: 'Challenges', icon: 'Target', functional: true },
              { id: 'projects', label: 'Projects', icon: 'Folder', functional: false },
              { id: 'achievements', label: 'Achievements', icon: 'Award', functional: false },
              { id: 'community', label: 'Community', icon: 'Users', functional: false },
              { id: 'settings', label: 'Settings', icon: 'Settings', functional: true }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => item.functional ? handleSectionChange(item.id) : null}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id && item.functional
                    ? 'bg-primary text-white shadow-lg'
                    : item.functional
                    ? 'text-gray-700 hover:bg-white/60'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!item.functional}
              >
                <ApperIcon name={item.icon} className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
                {!item.functional && (
                  <ApperIcon name="Lock" className="h-3 w-3 ml-auto" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Progress Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="BookOpen" className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{Object.keys(userProgress).length}</h3>
                  <p className="text-gray-600">Courses Started</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Flame" className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">7</h3>
                  <p className="text-gray-600">Day Streak</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center mx-auto mb-3">
                    <ApperIcon name="Star" className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">1,250</h3>
                  <p className="text-gray-600">Points Earned</p>
                </div>
              </div>
            </motion.div>

            {/* Main Feature Component */}
            <MainFeature 
              courses={courses}
              userProgress={userProgress}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />

            {/* Coming Soon Features */}
            {comingSoonSections.includes(activeSection) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ApperIcon name="Rocket" className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeSection === 'projects' && 'Project Gallery - Coming Soon!'}
                  {activeSection === 'achievements' && 'Unlock achievements in the next update'}
                  {activeSection === 'community' && 'Join discussions with fellow coders - Launching soon'}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We're working hard to bring you amazing new features. Stay tuned for updates!
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-white/20 z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          {[
            { id: 'courses', icon: 'BookOpen' },
            { id: 'challenges', icon: 'Target' },
            { id: 'projects', icon: 'Folder' },
            { id: 'settings', icon: 'Settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600'
              }`}
            >
              <ApperIcon name={item.icon} className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium capitalize">{item.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home