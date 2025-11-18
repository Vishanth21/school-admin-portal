import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Dashboard</h1>
      </div>
      
      <div className="header-right">
        <div className="header-item" ref={profileRef}>
          <button 
            className="profile-button"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span>{user.name}</span>
          </button>
          
          {showProfile && (
            <div className="dropdown profile-dropdown">
              <div className="profile-info">
                <div className="profile-details">
                  <p className="profile-name"><strong>{user.name}</strong></p>
                  <p className="profile-email">{user.email}</p>
                </div>
              </div>
              <div className="dropdown-actions">
                <button className="dropdown-action-btn" onClick={onLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;