import React, { useEffect } from 'react';
import { useAppContext } from './context/AppContext.jsx';
import Header from './components/Header.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import TaskStats from './components/TaskStats.jsx';
import Onboarding from './components/Onboarding.jsx';
import './styles/App.css';

function App() {
  const { showOnboarding, userName, setUserName } = useAppContext();

  // NEW: Effect to prompt for user's name after onboarding
  useEffect(() => {
    if (!showOnboarding && !userName) {
      const name = prompt("Welcome! What's your name?");
      if (name) {
        setUserName(name);
      } else {
        // Provide a default if user cancels or enters nothing
        setUserName("Friend"); 
      }
    }
  }, [showOnboarding, userName, setUserName]);

  return (
    <>
      <Onboarding />
      {/* The main app now renders once onboarding is done, even before name is entered */}
      {!showOnboarding && (
         <main className="app-container">
            <Header />
            <TaskForm />
            <TaskStats />
            <TaskList />
        </main>
      )}
    </>
  );
}

export default App;