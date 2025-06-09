import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const TaskForm = () => {
  const { addTask, editingTask, updateTask, setEditingTask } = useAppContext();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const isEditing = !!editingTask;

  useEffect(() => {
    if (isEditing) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      // Format date for datetime-local input
      const date = new Date(editingTask.dueDate);
      const formattedDate = date.toISOString().slice(0, 16);
      setDueDate(formattedDate);
    } else {
      // Clear form when not editing
      setName('');
      setDescription('');
      setDueDate('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !dueDate) {
      alert('Please fill in the task name and due date.');
      return;
    }
    
    const taskData = {
        name,
        description,
        dueDate: new Date(dueDate).toISOString()
    };
    
    if (isEditing) {
      updateTask({ ...editingTask, ...taskData });
    } else {
      addTask(taskData);
    }

    // Reset form fields
    setName('');
    setDescription('');
    setDueDate('');
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="card bento-box form-box">
      <form onSubmit={handleSubmit} className="task-form">
        <h2>{isEditing ? 'Edit Task ✏️' : 'Add New Task ✅'}</h2>
        <div className="form-group">
          <label htmlFor="name">Task Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Buy groceries 🛒"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Milk, bread, eggs..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date & Time</label>
          <input
            id="dueDate"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
        {isEditing && <button type="button" onClick={handleCancelEdit} style={{marginTop: '0.5rem', background: 'var(--text-color-light)'}}>Cancel Edit</button>}
      </form>
    </div>
  );
};

export default TaskForm;