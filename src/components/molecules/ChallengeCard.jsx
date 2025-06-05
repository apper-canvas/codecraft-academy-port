import React from 'react';
      import { motion } from 'framer-motion';
      import ApperIcon from '@/components/ApperIcon';

      function ChallengeCard({ challenge, selected, onClick }) {
        return (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selected
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            onClick={onClick}
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
        );
      }

      export default ChallengeCard;