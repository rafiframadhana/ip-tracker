import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Terminal, Monitor } from 'lucide-react';

const LocalIPGuide: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOS, setSelectedOS] = useState<'windows' | 'mac' | null>(null);

  const windowsSteps = [
    {
      step: 1,
      title: 'Open Command Prompt',
      description: 'Press Windows + R, type "cmd" and press Enter'
    },
    {
      step: 2,
      title: 'Run IP Configuration Command',
      description: 'Type the following command and press Enter:',
      command: 'ipconfig'
    },
    {
      step: 3,
      title: 'Find Your IP Address',
      description: 'Look for "IPv4 Address" under your active network adapter (usually Ethernet or Wi-Fi)'
    },
    {
      step: 4,
      title: 'For More Details (Optional)',
      description: 'For detailed information including IPv6, use:',
      command: 'ipconfig /all'
    }
  ];

  const macSteps = [
    {
      step: 1,
      title: 'Open Terminal',
      description: 'Press Cmd + Space, type "Terminal" and press Enter'
    },
    {
      step: 2,
      title: 'Run Network Configuration Command',
      description: 'Type the following command and press Enter:',
      command: 'ifconfig'
    },
    {
      step: 3,
      title: 'Find Your IP Address',
      description: 'Look for "inet" under en0 (Wi-Fi) or en1 (Ethernet) for IPv4, and "inet6" for IPv6'
    },
    {
      step: 4,
      title: 'Alternative Method',
      description: 'You can also use this simpler command:',
      command: 'curl ifconfig.me'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-800">Track IP Address Locally</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-6">
            <p className="text-gray-600 mb-6">
              Learn how to find your local IP address using command line tools on your operating system.
            </p>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setSelectedOS(selectedOS === 'windows' ? null : 'windows')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedOS === 'windows'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Windows</span>
                {selectedOS === 'windows' ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setSelectedOS(selectedOS === 'mac' ? null : 'mac')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedOS === 'mac'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>macOS</span>
                {selectedOS === 'mac' ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>

            {selectedOS === 'windows' && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Monitor className="w-4 h-4" />
                  <span>Windows Instructions</span>
                </h4>
                <div className="space-y-4">
                  {windowsSteps.map((step) => (
                    <div key={step.step} className="flex space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{step.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        {step.command && (
                          <div className="mt-2 bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">
                            {step.command}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedOS === 'mac' && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Terminal className="w-4 h-4" />
                  <span>macOS Instructions</span>
                </h4>
                <div className="space-y-4">
                  {macSteps.map((step) => (
                    <div key={step.step} className="flex space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{step.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        {step.command && (
                          <div className="mt-2 bg-gray-800 text-green-400 p-2 rounded font-mono text-sm">
                            {step.command}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalIPGuide;