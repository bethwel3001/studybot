import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  SparklesIcon,
  LightBulbIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  BeakerIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
const api = axios.create({
  baseURL: 'https://study-bot-vc9r.onrender.com', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
const AICompanion = () => {
  const [activeSubject, setActiveSubject] = useState(null);
  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [error, setError] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: AcademicCapIcon, color: 'text-indigo-500' },
    { id: 'physics', name: 'Physics', icon: LightBulbIcon, color: 'text-amber-500' },
    { id: 'chemistry', name: 'Chemistry', icon: BeakerIcon, color: 'text-emerald-500' },
    { id: 'coding', name: 'Coding', icon: CodeBracketIcon, color: 'text-blue-500' },
    { id: 'robotics', name: 'Robotics', icon: CpuChipIcon, color: 'text-red-500' },
    { id: 'blockchain', name: 'Blockchain', icon: CurrencyDollarIcon, color: 'text-purple-500' },
    { id: 'ai', name: 'AI', icon: SparklesIcon, color: 'text-pink-500' },
    { id: 'general', name: 'General Help', icon: ChatBubbleLeftRightIcon, color: 'text-cyan-500' },
  ];

  const suggestions = {
    math: [
      "Explain calculus concepts with real-world examples",
      "Help me solve this quadratic equation",
      "What's the difference between integrals and derivatives?"
    ],
    physics: [
      "Explain Newton's laws of motion",
      "How does quantum entanglement work?",
      "Help me understand thermodynamics"
    ],
    chemistry: [
      "Balance this chemical equation",
      "Explain atomic orbitals",
      "What's the difference between covalent and ionic bonds?"
    ],
    coding: [
      "Explain recursion with an example",
      "Help me debug this Python code",
      "What's the best way to learn algorithms?"
    ],
    robotics: [
      "Explain PID controllers",
      "What sensors are used in autonomous robots?",
      "How do robotic arms work?"
    ],
    blockchain: [
      "Explain proof-of-work vs proof-of-stake",
      "How do smart contracts work?",
      "What are the main blockchain consensus mechanisms?"
    ],
    ai: [
      "Explain neural networks simply",
      "What's the difference between ML and DL?",
      "How does reinforcement learning work?"
    ],
    general: [
      "How can I improve my study habits?",
      "What are effective note-taking techniques?",
      "How do I prepare for exams effectively?"
    ]
  };

  const handleAskQuestion = async () => {
  if (!question.trim()) return;
  
  setIsAsking(true);
  setError(null);

  try {
    const userMessage = {
      type: 'user',
      content: question,
      subject: activeSubject || 'general',
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, userMessage]);

    //  Explicitly include subject and question
    const res = await api.post('/api/ask', {
      question,
      subject: activeSubject || 'general'
    });

    const aiMessage = {
      type: 'ai',
      content: res.data.answer,
      subject: activeSubject || 'general',
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, aiMessage]);
  } catch (err) {
    console.error('API Error:', {
      message: err.message,
      response: err.response?.data,
      config: err.config
    });

    const errorMessage = err.response?.data?.error?.message || 
                         err.response?.data?.details || 
                         'Failed to get response. Please try again.';

    setError(errorMessage);

    setConversation(prev => [...prev, {
      type: 'ai',
      content: `⚠️ Error: ${errorMessage}`,
      subject: activeSubject || 'general',
      timestamp: new Date(),
      isError: true
    }]);
  } finally {
    setIsAsking(false);
    setQuestion('');
  }
};


  const clearConversation = () => {
    setConversation([]);
    setActiveSubject(null);
  };

  return (
    <div className={`min-h-screen py-8 px-4 ${isMobile ? '' : 'px-6'} bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
          >
            Your <span className="text-primary-600 dark:text-primary-400">AI Study Companion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Get expert help with any subject, anytime
          </motion.p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-center"
          >
            <XMarkIcon 
              className="h-5 w-5 mr-2 cursor-pointer" 
              onClick={() => setError(null)} 
            />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Main Chat Interface */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
              <SparklesIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                How can I help you today?
              </h3>
              
              {/* Subject Selection */}
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Select a subject:</p>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <motion.button
                      key={subject.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSubject(activeSubject === subject.id ? null : subject.id)}
                      className={`px-3 py-1.5 text-sm rounded-full flex items-center transition-all ${
                        activeSubject === subject.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <subject.icon className={`h-4 w-4 mr-1 ${subject.color}`} />
                      {subject.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Question Input */}
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                rows={4}
                placeholder={
                  activeSubject 
                    ? `Ask me anything about ${subjects.find(s => s.id === activeSubject)?.name}...` 
                    : "Ask me anything about math, science, coding, or any other subject..."
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAskQuestion();
                  }
                }}
              />

              {/* Suggestions */}
              {activeSubject && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions[activeSubject].map((suggestion, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setQuestion(suggestion)}
                        className="px-3 py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAskQuestion}
                disabled={!question.trim() || isAsking}
                className={`mt-4 px-6 py-2.5 rounded-lg font-medium flex items-center justify-center transition-all ${
                  !question.trim() || isAsking
                    ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {isAsking ? (
                  <>
                    <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Ask Question'
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Conversation History */}
        {conversation.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Study Session History</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearConversation}
                className="flex items-center text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Clear History
              </motion.button>
            </div>
            
            <div className="space-y-6">
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-5 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-50 dark:bg-blue-900/20 ml-auto border-l-4 border-blue-500' 
                      : `bg-gray-50 dark:bg-gray-700/50 mr-auto border-l-4 ${
                          msg.isError ? 'border-red-500' : 'border-primary-500'
                        }`
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {msg.type === 'user' ? (
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                          <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      ) : (
                        <div className={`p-2 rounded-full ${
                          msg.isError 
                            ? 'bg-red-100 dark:bg-red-900/30' 
                            : 'bg-primary-100 dark:bg-primary-900/30'
                        }`}>
                          <SparklesIcon className={`h-5 w-5 ${
                            msg.isError 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-primary-600 dark:text-primary-400'
                          }`} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {msg.type === 'user' ? 'You' : 'StudyBot'}
                          </span>
                          {msg.subject && msg.type !== 'user' && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
                              {subjects.find(s => s.id === msg.subject)?.name}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(msg.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      <p className={`whitespace-pre-line ${
                        msg.isError 
                          ? 'text-red-700 dark:text-red-300' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Step-by-Step Solutions",
              description: "Get detailed explanations for complex problems in any subject.",
              icon: AcademicCapIcon,
              color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
            },
            {
              title: "Concept Visualization",
              description: "Understand difficult concepts through diagrams and examples.",
              icon: LightBulbIcon,
              color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
            },
            {
              title: "Homework Checker",
              description: "Verify your answers and learn from mistakes with explanations.",
              icon: SparklesIcon,
              color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
            },
            {
              title: "Code Debugging",
              description: "Find and fix errors in your code with expert guidance.",
              icon: CodeBracketIcon,
              color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            },
            {
              title: "24/7 Availability",
              description: "Get help whenever you need it, day or night.",
              icon: CpuChipIcon,
              color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            },
            {
              title: "Personalized Learning",
              description: "Adapts to your learning style and knowledge level.",
              icon: ChatBubbleLeftRightIcon,
              color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className={`${feature.color} p-3 rounded-full mr-3`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AICompanion;