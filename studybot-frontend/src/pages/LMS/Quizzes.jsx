import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';

const Quizzes = () => {
  const { user } = useAuth();

  const quizzes = [
    {
      title: 'Excel Basics Quiz',
      status: 'Not Attempted',
      description: 'Test your knowledge of formulas, charts, and data formatting.',
    },
    {
      title: 'Frontend Development Quiz',
      status: 'Completed',
      description: 'HTML tags, CSS selectors, and basic JavaScript challenges.',
    },
    {
      title: 'Photography Quiz',
      status: 'In Progress',
      description: 'Camera settings, lighting, and composition techniques.',
    },
  ];

  const statusColors = {
    Completed: 'bg-green-200 text-green-800',
    'Not Attempted': 'bg-yellow-200 text-yellow-800',
    'In Progress': 'bg-blue-200 text-blue-800',
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Quizzes for {user?.name}
      </motion.h1>

      <div className="space-y-4">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-xl transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {quiz.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{quiz.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm ${statusColors[quiz.status]}`}>
                {quiz.status}
              </span>
              <Button variant="primary" size="sm">
                {quiz.status === 'Completed' ? 'Retake Quiz' : 'Start Quiz'}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
