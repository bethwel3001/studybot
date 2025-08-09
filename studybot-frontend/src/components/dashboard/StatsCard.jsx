import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon, AcademicCapIcon, BookOpenIcon, ClockIcon, TrophyIcon } from '@heroicons/react/24/outline';

const stats = [
  { id: 1, name: 'Average Score', value: '87%', change: '+12%', changeType: 'positive', icon: AcademicCapIcon },
  { id: 2, name: 'Assignments Completed', value: '24/30', change: '+5', changeType: 'positive', icon: BookOpenIcon },
  { id: 3, name: 'Study Hours', value: '42h', change: '-3h', changeType: 'negative', icon: ClockIcon },
  { id: 4, name: 'Current Streak', value: '7 days', change: '+2', changeType: 'positive', icon: TrophyIcon },
];

const StatsCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: stat.id * 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
            <stat.icon className="h-10 w-10 text-primary-500 dark:text-primary-400" />
          </div>
          <div className={`mt-4 flex items-center text-sm ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {stat.changeType === 'positive' ? (
              <ArrowUpIcon className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 mr-1" />
            )}
            <span>{stat.change}</span>
            <span className="ml-1">from last week</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCard;