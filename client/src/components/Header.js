import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

const Header = ({ user, onLogout, onNavigateToAnnouncements }) => {
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const announcementsRef = useRef(null);
  const profileRef = useRef(null);

  const defaultAnnouncements = [
    { 
      id: 1, 
      title: 'Picture Day Reminder', 
      content: 'School Picture Day is tomorrow! Don\'t forget to wear your full uniform and bring your best smile.',
      date: '2024-09-15',
      author: 'Principal Office',
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Book Fair Opening', 
      content: 'The annual Book Fair will open this Thursday. Stop by the library to browse the newest books.',
      date: '2024-09-10',
      author: 'Library Department',
      priority: 'medium'
    },
    { 
      id: 3, 
      title: 'Sports Day Postponed', 
      content: 'Due to weather conditions, Sports Day has been postponed. A new date will be announced soon.',
      date: '2024-09-08',
      author: 'Sports Department',
      priority: 'high'
    }
  ];

  const [announcements, setAnnouncements] = useState(defaultAnnouncements);

  useEffect(() => {
    const savedAnnouncements = localStorage.getItem('school_announcements');
    if (savedAnnouncements) {
      try {
        const parsedAnnouncements = JSON.parse(savedAnnouncements);
        if (parsedAnnouncements && parsedAnnouncements.length > 0) {
          setAnnouncements(parsedAnnouncements);
        }
      } catch (error) {
        console.error('Error parsing announcements from localStorage:', error);
      }
    }
  }, []);

  const latestAnnouncements = announcements
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (announcementsRef.current && !announcementsRef.current.contains(event.target)) {
        setShowAnnouncements(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleAnnouncements = () => {
    setShowAnnouncements(!showAnnouncements);
    setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowAnnouncements(false);
  };

  const handleViewAllAnnouncements = () => {
    setShowAnnouncements(false);
    if (onNavigateToAnnouncements) {
      onNavigateToAnnouncements();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44ff44';
      default: return '#666';
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>Welcome to Admin Portal, {user.name}</h1>
        <span className="user-role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
      </div>
      
      <div className="header-right">
        <div className="header-item" ref={announcementsRef}>
          <button 
            className="icon-button"
            onClick={toggleAnnouncements}
          >
            <span className="announcement-icon">Announcements</span>
            {latestAnnouncements.length > 0 && (
              <span className="announcement-badge">{latestAnnouncements.length}</span>
            )}
          </button>
          
          {showAnnouncements && (
            <div className="dropdown announcements-dropdown">
              <div className="dropdown-header">
                <h3>Latest Announcements</h3>
                <span className="dropdown-count">{latestAnnouncements.length}</span>
              </div>
              <div className="dropdown-content">
                {latestAnnouncements.map(announcement => (
                  <div key={announcement.id} className="announcement-item">
                    <div className="announcement-header">
                      <h4>{announcement.title}</h4>
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(announcement.priority) }}
                      >
                        {announcement.priority}
                      </span>
                    </div>
                    <p className="announcement-preview">{announcement.content}</p>
                    <div className="announcement-footer">
                      <span className="announcement-date">
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                      <span className="announcement-author">
                        {announcement.author}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button 
                  className="view-all-btn"
                  onClick={handleViewAllAnnouncements}
                >
                  View All Announcements
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="header-item" ref={profileRef}>
          <button 
            className="profile-button"
            onClick={toggleProfile}
          >
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span>{user.name}</span>
          </button>
          
          {showProfile && (
            <div className="dropdown profile-dropdown">
              <div className="profile-info">
                <div className="profile-avatar-large">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-details">
                  <p className="profile-name"><strong>{user.name}</strong></p>
                  <p className="profile-role">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                  <p className="profile-email">{user.email}</p>
                </div>
              </div>
              <div className="dropdown-actions">
                <button className="dropdown-action-btn">
                  Profile Settings
                </button>
                <button className="dropdown-action-btn">
                  Preferences
                </button>
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