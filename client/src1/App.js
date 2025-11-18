import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setCurrentForm('login');
  };

  const toggleForm = () => {
    setCurrentForm(currentForm === 'login' ? 'signup' : 'login');
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <h2>Loading School Portal...</h2>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (isLoggedIn && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {currentForm === 'login' ? (
        <Login onToggleForm={toggleForm} onLogin={handleLogin} />
      ) : (
        <Signup onToggleForm={toggleForm} onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;


