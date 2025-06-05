import React from 'react';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import CodeInput from '@/components/atoms/CodeInput';
      import SectionTitle from '@/components/atoms/SectionTitle';

      function ChallengeDetail({
        selectedChallenge,
        codeEditorContent,
        setCodeEditorContent,
        isRunning,
        onSubmitChallenge
      }) {
        if (!selectedChallenge) {
          return (
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20">
              <ApperIcon name="Target" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Challenge</h3>
              <p className="text-gray-600">Choose a challenge from the list to start coding!</p>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <SectionTitle className="text-xl mb-4">{selectedChallenge.title}</SectionTitle>
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

            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900">Solution Editor</h4>
                <Button
                  onClick={onSubmitChallenge}
                  disabled={isRunning}
                  variant="secondary"
                  icon={isRunning ? null : ApperIcon.Send}
                >
                  {isRunning ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>

              <CodeInput
                value={codeEditorContent}
                onChange={(e) => setCodeEditorContent(e.target.value)}
                placeholder="Write your solution here..."
              />
            </div>
          </div>
        );
      }

      export default ChallengeDetail;