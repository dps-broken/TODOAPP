export const placeholderTasks = [
  {
    id: '1',
    name: '🎨 Design the App',
    description: 'Create a modern and beautiful design in Figma. Focus on the bento-box layout and glassmorphism effects.',
    dueDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Due in 2 days
    completed: true,
    createdAt: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    name: '💻 Develop the React App',
    description: 'Build the TODO app using React with functional components and hooks. Implement all the required features.',
    dueDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), // Due in 5 days
    completed: false,
    createdAt: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    name: '🚨 Fix Urgent Bug',
    description: 'The theme switcher is not persisting on refresh. Needs immediate attention!',
    dueDate: new Date(new Date().getTime() + 12 * 60 * 60 * 1000).toISOString(), // Due in 12 hours (will trigger alert)
    completed: false,
    createdAt: new Date().toISOString(),
  },
];