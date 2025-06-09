import React from 'react';

const TaskControls = ({ filter, setFilter, sortBy, setSortBy }) => {
  return (
    <div className="task-controls">
      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="due-date-asc">Sort by Due Date (Asc)</option>
        <option value="due-date-desc">Sort by Due Date (Desc)</option>
        <option value="created-date">Sort by Created Date</option>
      </select>
    </div>
  );
};

export default TaskControls;