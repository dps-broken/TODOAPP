import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const TaskStats = () => {
  const { tasks } = useAppContext();

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  return (
    <div className="card bento-box stats-box">
      <div className="task-stats">
        <h2>Task Stats 📊</h2>
        <div className="stat-item">
          <span>Total Tasks</span>
          <span>{stats.total}</span>
        </div>
        <div className="stat-item">
          <span>Active Tasks</span>
          <span>{stats.active}</span>
        </div>
        <div className="stat-item">
          <span>Completed</span>
          <span>{stats.completed}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;