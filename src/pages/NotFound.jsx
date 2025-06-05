import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Robot */}
          <div className="relative mb-8">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-32 h-32 bg-gradient-to-br from-primary to-primary-dark rounded-3xl mx-auto flex items-center justify-center"
            >
              <ApperIcon name="Bot" className="h-16 w-16 text-white" />
            </motion.div>
            
            {/* Floating elements */}
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center"
            >
              <ApperIcon name="Code2" className="h-4 w-4 text-white" />
            </motion.div>
            
            <motion.div
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-2 -left-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center"
            >
              <ApperIcon name="Star" className="h-3 w-3 text-white" />
            </motion.div>
          </div>

          {/* 404 Text */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4"
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 mb-2">
              Looks like this page went on a coding adventure and got lost!
            </p>
            <p className="text-sm text-gray-500">
              Don't worry, even the best programmers encounter bugs. Let's get you back to learning!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <ApperIcon name="Home" className="h-5 w-5 mr-2" />
              Back to Academy
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center w-full bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
            >
              <ApperIcon name="ArrowLeft" className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </motion.div>

          {/* Fun Coding Tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 p-6 bg-white/60 backdrop-blur-md rounded-xl border border-white/20"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <ApperIcon name="Lightbulb" className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">💡 Coding Tip</h3>
                <p className="text-sm text-gray-600">
                  HTTP 404 errors occur when a requested resource can't be found on the server. 
                  In your coding journey, you'll learn how to handle these gracefully!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound