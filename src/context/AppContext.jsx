import React, { createContext, useContext, useState, useEffect } from 'react';
import { placeholderTasks } from '../utils/placeholderData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // --- STATE MANAGEMENT ---
  const [tasks, setTasks] = useState(() => {
    try {
      const localTasks = localStorage.getItem('bento-todo-tasks');
      return localTasks ? JSON.parse(localTasks) : placeholderTasks;
    } catch (error) {
      console.error("Could not parse tasks from localStorage", error);
      return placeholderTasks;
    }
  });
  
  const [theme, setTheme] = useState(() => localStorage.getItem('bento-todo-theme') || 'light');
  
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('hasVisitedBentoTodo'));
  
  // NEW: State for user's name
  const [userName, setUserName] = useState(() => localStorage.getItem('bento-todo-username') || null);

  const [editingTask, setEditingTask] = useState(null);

  // --- USEEFFECT HOOKS for LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem('bento-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('bento-todo-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // NEW: Effect to save username
  useEffect(() => {
    if (userName) {
      localStorage.setItem('bento-todo-username', userName);
    }
  }, [userName]);
  
  // --- FUNCTIONS ---
  const handleDismissOnboarding = () => {
    localStorage.setItem('hasVisitedBentoTodo', 'true');
    setShowOnboarding(false);
  };
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const addTask = (task) => {
    setTasks(prevTasks => [...prevTasks, { ...task, id: Date.now().toString(), completed: false, createdAt: new Date().toISOString() }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const value = {
    tasks,
    theme,
    showOnboarding,
    editingTask,
    userName, // Export userName
    setUserName, // Export setter function
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    toggleTheme,
    handleDismissOnboarding,
    setEditingTask
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};