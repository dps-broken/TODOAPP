import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext.jsx';

const Onboarding = () => {
  const { showOnboarding, handleDismissOnboarding } = useAppContext();

  return (
    <AnimatePresence>
      {showOnboarding && (
        <motion.div
          className="onboarding-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="onboarding-content card"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            exit={{ y: 50, opacity: 0 }}
          >
            <h1>Welcome to Acton Plan! 🗃️</h1>
            <p>Your new favorite app for organizing tasks with a beautiful, modern interface. Let's get productive!</p>
            <button onClick={handleDismissOnboarding}>
              Get Started ✨
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Onboarding;