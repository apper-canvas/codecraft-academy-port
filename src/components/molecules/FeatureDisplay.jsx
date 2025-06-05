import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';
      import SectionTitle from '@/components/atoms/SectionTitle';

      function FeatureDisplay({ activeSection }) {
        const getTitle = () => {
          switch (activeSection) {
            case 'projects': return 'Project Gallery - Coming Soon!';
            case 'achievements': return 'Unlock achievements in the next update';
            case 'community': return 'Join discussions with fellow coders - Launching soon';
            default: return '';
          }
        };

        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Rocket" className="h-12 w-12 text-gray-400" />
            </div>
            <SectionTitle className="mb-4">
              {getTitle()}
            </SectionTitle>
            <p className="text-gray-600 max-w-md mx-auto">
              We're working hard to bring you amazing new features. Stay tuned for updates!
            </p>
          </motion.div>
        );
      }

      export default FeatureDisplay;