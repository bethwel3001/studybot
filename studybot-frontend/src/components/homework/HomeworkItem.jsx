import { motion } from 'framer-motion';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';

const priorityColors = {
  high: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200',
  low: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
};

const HomeworkItem = ({ item, onComplete, onDelete, index }) => {
  const dueDate = new Date(item.dueDate);
  const today = new Date();
  const isOverdue = !item.completed && dueDate < today;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 ${
        item.completed 
          ? 'border-green-500 dark:border-green-400 opacity-70' 
          : isOverdue 
            ? 'border-red-500 dark:border-red-400' 
            : 'border-primary-500 dark:border-primary-400'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className={`font-medium ${item.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>
              {item.title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[item.priority]}`}>
              {item.priority}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.subject}</p>
          <p className={`text-xs mt-2 ${
            item.completed 
              ? 'text-green-600 dark:text-green-400' 
              : isOverdue 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-500 dark:text-gray-400'
          }`}>
            Due: {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            {isOverdue && ' (Overdue)'}
          </p>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onComplete(item.id)}
            className={`p-2 rounded-full ${
              item.completed 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400'
            } transition`}
            aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <CheckIcon className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition"
            aria-label="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeworkItem;