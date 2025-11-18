import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { key: 'home', label: 'Overview' },
    { key: 'teachers', label: 'Teachers' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'classes', label: 'Classes' },
    { key: 'exams', label: 'Exams' },
    { key: 'assignments', label: 'Assignments' },
    { key: 'results', label: 'Results' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'announcements', label: 'Announcements' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Portal</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.key}>
              <button
                className={activeSection === item.key ? 'active' : ''}
                onClick={() => onSectionChange(item.key)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;