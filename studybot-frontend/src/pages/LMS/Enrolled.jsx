import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';

const Enrolled = () => {
  const { user } = useAuth();

  const enrolledCourses = [
    {
      name: 'Excel Basics',
      progress: 40,
      description: 'Learn spreadsheets, formulas, and data organization for the workplace.',
    },
    {
      name: 'Frontend Development',
      progress: 75,
      description: 'HTML, CSS, and JavaScript fundamentals to build interactive websites.',
    },
    {
      name: 'Photography',
      progress: 20,
      description: 'Master camera settings, composition, and photo editing basics.',
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
       Your Enrolled Courses, 
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course, index) => (
          <motion.div
            key={index}
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition hover:shadow-xl flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {course.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">
              {course.description}
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-4">
              <div
                className="bg-primary-500 h-3 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 mt-2">{course.progress}% complete</span>

            {/* Hover Action */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <Button variant="primary" size="sm">
                Continue Learning
              </Button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Enrolled;
