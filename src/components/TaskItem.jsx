import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext.jsx';
import { useRemainingTime } from '../hooks/useRemainingTime.js';

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, setEditingTask } = useAppContext();
  const timeLeft = useRemainingTime(task.dueDate);

  const totalDuration = +new Date(task.dueDate) - +new Date(task.createdAt);
  const timePassed = +new Date() - +new Date(task.createdAt);
  const progress = totalDuration > 0 ? Math.min((timePassed / totalDuration) * 100, 100) : 0;

  const isNearingDeadline = timeLeft.total > 0 && timeLeft.total < 24 * 60 * 60 * 1000; // less than 24 hours

  return (
    <motion.div
      layout
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className={`task-item card ${task.completed ? 'completed' : ''}`}
    >
      <div className="task-header">
        <div className="task-content">
          <h3>{task.name}</h3>
          {task.description && <p>{task.description}</p>}
        </div>
        <div className="task-actions">
          <button onClick={() => toggleComplete(task.id)} title={task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}>
            {task.completed ? '↩️' : '✔️'}
          </button>
          <button onClick={() => setEditingTask(task)} title="Edit Task">✏️</button>
          <button onClick={() => deleteTask(task.id)} title="Delete Task" className="delete-btn">
            🗑️
          </button>
        </div>
      </div>
      <div className="task-footer">
        <div className="due-date">
          <span>🗓️</span>
          {task.completed ? (
            <span>Completed</span>
          ) : timeLeft.total > 0 ? (
            <span>
              {timeLeft.days > 0 && `${timeLeft.days}d `}
              {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
            </span>
          ) : (
            <span>Overdue</span>
          )}
        </div>
        {isNearingDeadline && !task.completed && <span className="deadline-alert">🔥 Nearing Deadline!</span>}
      </div>
      <div className="progress-bar" style={{ width: `${task.completed ? 100 : progress}%` }}></div>
    </motion.div>
  );
};

export default TaskItem;