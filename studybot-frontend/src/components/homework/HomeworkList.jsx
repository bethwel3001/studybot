import { useState } from 'react';
import HomeworkItem from './HomeworkItem';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const HomeworkList = () => {
  const [homeworkItems, setHomeworkItems] = useState([
    { id: 1, subject: 'Math', title: 'Algebra Homework', dueDate: '2023-06-15', completed: false, priority: 'high' },
    { id: 2, subject: 'Science', title: 'Chemistry Lab Report', dueDate: '2023-06-18', completed: false, priority: 'medium' },
    { id: 3, subject: 'English', title: 'Book Review', dueDate: '2023-06-20', completed: true, priority: 'low' },
  ]);
  
  const [newHomework, setNewHomework] = useState({
    subject: '',
    title: '',
    dueDate: '',
    priority: 'medium',
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleComplete = (id) => {
    setHomeworkItems(homeworkItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
    
    if (!homeworkItems.find(item => item.id === id).completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleDelete = (id) => {
    setHomeworkItems(homeworkItems.filter(item => item.id !== id));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      subject: newHomework.subject,
      title: newHomework.title,
      dueDate: newHomework.dueDate,
      completed: false,
      priority: newHomework.priority,
    };
    
    setHomeworkItems([...homeworkItems, newItem]);
    setNewHomework({ subject: '', title: '', dueDate: '', priority: 'medium' });
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHomework({ ...newHomework, [name]: value });
  };

  return (
    <div className="space-y-6">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Your Homework</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Homework</span>
        </button>
      </div>
      
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
        >
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={newHomework.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={newHomework.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={newHomework.dueDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                name="priority"
                value={newHomework.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
              >
                Add Homework
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      <div className="space-y-3">
        {homeworkItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No homework assignments yet. Add one to get started!
          </div>
        ) : (
          homeworkItems.map((item, index) => (
            <HomeworkItem
              key={item.id}
              item={item}
              onComplete={handleComplete}
              onDelete={handleDelete}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeworkList;