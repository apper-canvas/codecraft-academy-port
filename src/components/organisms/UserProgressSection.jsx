import React from 'react';
      import { motion } from 'framer-motion';
      import ProgressHeaderItem from '@/components/molecules/ProgressHeaderItem';

      function UserProgressSection({ userProgressCount }) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProgressHeaderItem
                icon="BookOpen"
                iconBg="bg-gradient-to-br from-primary to-primary-dark"
                count={userProgressCount}
                label="Courses Started"
              />

              <ProgressHeaderItem
                icon="Flame"
                iconBg="bg-gradient-to-br from-accent to-yellow-600"
                count={7}
                label="Day Streak"
              />

              <ProgressHeaderItem
                icon="Star"
                iconBg="bg-gradient-to-br from-secondary to-secondary-dark"
                count={1250}
                label="Points Earned"
              />
            </div>
          </motion.div>
        );
      }

      export default UserProgressSection;