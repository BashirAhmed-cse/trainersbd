"use client";
import { useState, useEffect } from "react";
import { Loader, Sun, Moon, Palette, Zap, Settings, Code } from "lucide-react";
import { motion } from 'framer-motion';

export default function LoadingDemo() {
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading content...');
  const [loadingSize, setLoadingSize] = useState(48);
  const [loadingSpeed, setLoadingSpeed] = useState(1);

  // Simulate different loading states
  const loadExamples = [
    'Loading content...',
    'Processing data...',
    'Almost there...',
    'Preparing your experience...',
    'Just a moment...'
  ];

  useEffect(() => {
    // Cycle through different loading text examples
    const interval = setInterval(() => {
      if (isLoading) {
        const randomIndex = Math.floor(Math.random() * loadExamples.length);
        setLoadingText(loadExamples[randomIndex]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const restartLoading = () => {
    setIsLoading(false);
    setTimeout(() => setIsLoading(true), 100);
  };

  const LoadingComponent = () => (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
      theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/80'
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center space-y-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 1 / loadingSpeed
          }}
          style={{ width: loadingSize, height: loadingSize }}
        >
          <Loader className={`${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`} size={loadingSize} />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-lg font-medium ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {loadingText}
        </motion.p>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ delay: 0.2, duration: 1.5 / loadingSpeed, repeat: Infinity }}
          className={`h-1 rounded-full ${
            theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
          }`}
        >
          <div className={`h-full w-16 rounded-full ${
            theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
          }`} />
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Header */}
      <header className="py-6 px-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Zap className="text-blue-500" />
          <h1 className="text-2xl font-bold">Loading Animation Showcase</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
            }`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={restartLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2"
          >
            <Loader size={18} />
            <span>Show Loading</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Elegant Loading Animations</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            A customizable loading component with smooth animations and theme support.
            Perfect for modern web applications.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customization Panel */}
          <div className={`p-6 rounded-xl ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white border'
          }`}>
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Settings size={20} />
              <span>Customization</span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Loader Size</label>
                <input
                  type="range"
                  min="32"
                  max="80"
                  value={loadingSize}
                  onChange={(e) => setLoadingSize(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm opacity-70">
                  <span>Small</span>
                  <span>{loadingSize}px</span>
                  <span>Large</span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Animation Speed</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={loadingSpeed}
                  onChange={(e) => setLoadingSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm opacity-70">
                  <span>Slow</span>
                  <span>{loadingSpeed}x</span>
                  <span>Fast</span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Loading Text</label>
                <select
                  value={loadingText}
                  onChange={(e) => setLoadingText(e.target.value)}
                  className={`w-full p-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-slate-700 border-slate-600' 
                      : 'bg-slate-100 border-slate-200'
                  } border`}
                >
                  {loadExamples.map((example, index) => (
                    <option key={index} value={example}>{example}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Theme</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-4 py-2 rounded-lg ${
                      theme === 'light' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-4 py-2 rounded-lg ${
                      theme === 'dark' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preview Panel */}
          <div className={`p-6 rounded-xl ${
            theme === 'dark' ? 'bg-slate-800' : 'bg-white border'
          }`}>
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Palette size={20} />
              <span>Preview</span>
            </h3>
            
            <div className={`relative h-64 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
            }`}>
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: 1 / loadingSpeed
                  }}
                  style={{ width: loadingSize, height: loadingSize }}
                  className="mx-auto"
                >
                  <Loader className={`${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`} size={loadingSize} />
                </motion.div>
                
                <p className={`mt-4 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {loadingText}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Usage Code</h4>
              <pre className={`p-4 rounded-lg text-sm overflow-x-auto ${
                theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'
              }`}>
                {`<Loading 
  theme="${theme}"
  size={${loadingSize}}
  text="${loadingText}"
  speed={${loadingSpeed}}
/>`}
              </pre>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Palette />,
                title: "Theme Support",
                description: "Seamlessly adapts to both light and dark themes with appropriate colors."
              },
              {
                icon: <Settings />,
                title: "Customizable",
                description: "Adjust size, speed, and text to match your application's needs."
              },
              {
                icon: <Zap />,
                title: "Smooth Animations",
                description: "Built with Framer Motion for buttery-smooth animations and transitions."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl ${
                  theme === 'dark' ? 'bg-slate-800' : 'bg-white border'
                }`}
              >
                <div className="text-blue-500 mb-3">{feature.icon}</div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      {/* Show the loading overlay when isLoading is true */}
      {isLoading && <LoadingComponent />}
    </div>
  );
}