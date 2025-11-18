import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Dashboard.css';

const HomeContent = () => {
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('school_stats');
    return savedStats ? JSON.parse(savedStats) : {
      studentsPerClass: 30,
      totalTeachers: 22,
      totalClasses: 10,
      attendancePercentage: 95
    };
  });

  useEffect(() => {
    localStorage.setItem('school_stats', JSON.stringify(stats));
  }, [stats]);

  return (
    <div className="content-section">
      <div className="home-header">
        <h2>Overview</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Students per Class</h3>
          <p className="stat-number">{stats.studentsPerClass}</p>
        </div>

        <div className="stat-card">
          <h3>Total Teachers</h3>
          <p className="stat-number">{stats.totalTeachers}</p>
        </div>

        <div className="stat-card">
          <h3>Total Classes</h3>
          <p className="stat-number">{stats.totalClasses}</p>
        </div>

        <div className="stat-card">
          <h3>Attendance</h3>
          <p className="stat-number">{stats.attendancePercentage}%</p>
        </div>
      </div>
    </div>
  );
};

const TeachersContent = () => {
  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem('school_teachers');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Emma Baker', subject: 'Mathematics', class: '6,5' },
      { id: 2, name: 'Olivia Davis', subject: 'English', class: '9,10' }
    ];
  });

  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', class: '' });

  useEffect(() => {
    localStorage.setItem('school_teachers', JSON.stringify(teachers));
  }, [teachers]);

  const handleAdd = () => {
    if (newTeacher.name && newTeacher.subject) {
      setTeachers([...teachers, { id: Date.now(), ...newTeacher }]);
      setNewTeacher({ name: '', subject: '', class: '' });
    }
  };

  return (
    <div className="content-section">
      <h2>Teachers Management</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Name</label>
          <input 
            value={newTeacher.name} 
            onChange={e => setNewTeacher({...newTeacher, name: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input 
            value={newTeacher.subject} 
            onChange={e => setNewTeacher({...newTeacher, subject: e.target.value})}
          />
        </div>
      </div>
      <button className="btn-primary" onClick={handleAdd}>Add Teacher</button>
      
      <div style={{marginTop: '2rem'}}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.subject}</td>
                <td>
                  <button className="btn-delete" onClick={() => setTeachers(teachers.filter(x => x.id !== t.id))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SubjectsContent = () => {
  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('school_subjects');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Mathematics', classes: ['1', '2', '3'] },
      { id: 2, name: 'English', classes: ['1', '2', '3'] }
    ];
  });

  return (
    <div className="content-section">
      <h2>Subjects Management</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Classes</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.classes.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ClassesContent = () => (
  <div className="content-section">
    <h2>Classes Management</h2>
    <p>Class management interface</p>
  </div>
);

const ExamsContent = () => (
  <div className="content-section">
    <h2>Exams Management</h2>
    <p>Exam scheduling interface</p>
  </div>
);

const AssignmentsContent = () => (
  <div className="content-section">
    <h2>Assignments Management</h2>
    <p>Assignments interface</p>
  </div>
);

const ResultsContent = () => (
  <div className="content-section">
    <h2>Results Management</h2>
    <p>Results interface</p>
  </div>
);

const AttendanceContent = () => (
  <div className="content-section">
    <h2>Attendance Management</h2>
    <p>Attendance interface</p>
  </div>
);

const AnnouncementsContent = () => {
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('school_announcements');
    return saved ? JSON.parse(saved) : [];
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    localStorage.setItem('school_announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handlePost = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([{ id: Date.now(), ...newAnnouncement }, ...announcements]);
      setNewAnnouncement({ ...newAnnouncement, title: '', content: '' });
    }
  };

  return (
    <div className="content-section">
      <h2>Announcements</h2>
      <div className="form-group">
        <label>Title</label>
        <input 
          value={newAnnouncement.title} 
          onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea 
          rows="4"
          value={newAnnouncement.content} 
          onChange={e => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
        />
      </div>
      <button className="btn-primary" onClick={handlePost}>Post Announcement</button>

      <div style={{marginTop: '2rem'}}>
        {announcements.map(a => (
          <div key={a.id} style={{borderBottom: '1px solid #eee', padding: '1rem 0'}}>
            <h3>{a.title}</h3>
            <p>{a.content}</p>
            <small>{a.date}</small>
            <button 
              className="btn-delete" 
              style={{marginLeft: '1rem'}}
              onClick={() => setAnnouncements(announcements.filter(x => x.id !== a.id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');
  
  const renderContent = () => {
    switch(activeSection) {
      case 'home': return <HomeContent />;
      case 'teachers': return <TeachersContent />;
      case 'subjects': return <SubjectsContent />;
      case 'classes': return <ClassesContent />;
      case 'exams': return <ExamsContent />;
      case 'assignments': return <AssignmentsContent />;
      case 'results': return <ResultsContent />;
      case 'attendance': return <AttendanceContent />;
      case 'announcements': return <AnnouncementsContent />;
      default: return <HomeContent />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      
      <div className="dashboard-main">
        <Header 
          user={user} 
          onLogout={onLogout}
        />
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;