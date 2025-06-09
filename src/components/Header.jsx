import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';

const Header = () => {
  const { theme, toggleTheme, userName } = useAppContext();

  // Create the greeting message
  const greeting = userName ? `Hello, ${userName} 👋` : 'Welcome!';

  return (
    <div className="card bento-box header-box">
      <header className="app-header">
        <h1>{greeting}</h1>
        <button className="theme-switcher" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>
    </div>
  );
};

export default Header;