import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext.jsx';
import TaskItem from './TaskItem.jsx';
import TaskControls from './TaskControls.jsx';

const TaskList = () => {
  const { tasks } = useAppContext();
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('due-date-asc'); // 'due-date-asc', 'due-date-desc', 'created-date'

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Filter
    if (filter === 'active') {
      result = result.filter(task => !task.completed);
    } else if (filter === 'completed') {
      result = result.filter(task => task.completed);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'due-date-asc') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (sortBy === 'due-date-desc') {
        return new Date(b.dueDate) - new Date(a.dueDate);
      }
      if (sortBy === 'created-date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    return result;
  }, [tasks, filter, sortBy]);

  return (
    <div className="card bento-box list-box">
      <h2>Your Tasks 📋</h2>
      <TaskControls 
        filter={filter} setFilter={setFilter} 
        sortBy={sortBy} setSortBy={setSortBy} 
      />
      <div className="task-list">
        <AnimatePresence>
          {filteredAndSortedTasks.length > 0 ? (
            filteredAndSortedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <p style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-color-light)' }}>No tasks found. Time to add some! 🎉</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;