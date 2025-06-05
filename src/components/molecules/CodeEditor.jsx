import React from 'react';
      import ApperIcon from '@/components/ApperIcon';
      import Button from '@/components/atoms/Button';
      import Select from '@/components/atoms/Select';
      import CodeInput from '@/components/atoms/CodeInput';

      function CodeEditor({
        codeEditorContent,
        setCodeEditorContent,
        codeOutput,
        codeLanguage,
        setCodeLanguage,
        isRunning,
        onRunCode,
        languageOptions
      }) {
        return (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <Select
                  options={languageOptions}
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setCodeEditorContent('')}
                  variant="text"
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  icon={ApperIcon.RotateCcw}
                />
                <Button
                  onClick={onRunCode}
                  disabled={isRunning}
                  variant="primary"
                  icon={isRunning ? null : ApperIcon.Play}
                >
                  {isRunning ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    'Run'
                  )}
                </Button>
              </div>
            </div>

            <div className="relative">
              <CodeInput
                value={codeEditorContent}
                onChange={(e) => setCodeEditorContent(e.target.value)}
                placeholder="Write your code here..."
              />
            </div>

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
          </div>
        );
      }

      export default CodeEditor;