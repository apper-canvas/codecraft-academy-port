import React from 'react';
      import { motion } from 'framer-motion';
      import SectionTitle from '@/components/atoms/SectionTitle';
      import ChallengeCard from '@/components/molecules/ChallengeCard';

      function ChallengeList({ challenges, selectedChallenge, onSelectChallenge }) {
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <SectionTitle className="mb-6">Coding Challenges</SectionTitle>

            <div className="space-y-4">
              {challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  selected={selectedChallenge?.id === challenge.id}
                  onClick={() => onSelectChallenge(challenge)}
                />
              ))}
            </div>
          </motion.div>
        );
      }

      export default ChallengeList;