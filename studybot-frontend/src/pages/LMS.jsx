import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const dummyCourses = [
  { 
    title: 'Graphic Design', 
    desc: 'Learn the fundamentals of design & creativity.',
    amount: 'KES 3,500',
    duration: '6 weeks',
    difficulty: 'Beginner',
    overview: 'Covers color theory, typography, branding, and real-world tools like Photoshop, Illustrator, and Canva.'
  },
  { 
    title: 'Microsoft Office', 
    desc: 'Master Word, Excel, PowerPoint, and more.',
    amount: 'KES 2,800',
    duration: '4 weeks',
    difficulty: 'Beginner',
    overview: 'Practical skills for documents, spreadsheets, and presentations — with real case studies for the workplace.'
  },
  { 
    title: 'Frontend Development', 
    desc: 'HTML, CSS, JavaScript, and modern frameworks.',
    amount: 'KES 6,500',
    duration: '10 weeks',
    difficulty: 'Intermediate',
    overview: 'Build beautiful, functional websites with responsive design and modern tools like React and Tailwind CSS.'
  },
  { 
    title: 'Photography', 
    desc: 'Capture moments like a pro.',
    amount: 'KES 4,200',
    duration: '5 weeks',
    difficulty: 'Beginner',
    overview: 'Covers lighting, composition, editing, and storytelling through photos.'
  }
];

const LMS = () => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolled, setEnrolled] = useState([]);

  // Default 3 enrolled courses
  useEffect(() => {
    setEnrolled(dummyCourses.slice(0, 3));
  }, []);

  const handleEnroll = (course) => {
    if (!enrolled.some(c => c.title === course.title)) {
      setEnrolled(prev => [...prev, course]);
      toast.success(`🎉 Enrolled in ${course.title}!`);
    } else {
      toast(`Already enrolled in ${course.title}`, { icon: 'ℹ️' });
    }
    setSelectedCourse(null);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
      >
     Welcome {user?.name} to your Learning Hub
      </motion.h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        Browse available courses, track your learning, and access your enrolled classes & quizzes.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-10">
        <Link to="/lms/enrolled" state={{ enrolled }}>
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            Enrolled Courses ({enrolled.length})
          </Button>
        </Link>
        <Link to="/lms/quizzes">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            Quizzes
          </Button>
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyCourses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="p-6 flex flex-col justify-between h-full">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{course.desc}</p>
              <Button 
                variant="primary" 
                size="sm" 
                className="mt-auto"
                onClick={() => setSelectedCourse(course)}
              >
                View Course
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 max-w-lg w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{selectedCourse.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedCourse.overview}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>💰 Amount:</span> <span>{selectedCourse.amount}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>⏳ Duration:</span> <span>{selectedCourse.duration}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <span>📈 Difficulty:</span> <span>{selectedCourse.difficulty}</span>
                </div>
              </div>

              <Button variant="primary" size="lg" onClick={() => handleEnroll(selectedCourse)}>
                Enroll Now
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LMS;
