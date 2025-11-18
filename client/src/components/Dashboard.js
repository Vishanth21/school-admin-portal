import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Dashboard.css';

const HomeContent = ({ user }) => {
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('school_stats');
    if (savedStats) {
      return JSON.parse(savedStats);
    } else {
      return {
        studentsPerClass: 30,
        totalTeachers: 22,
        totalClasses: 10,
        attendancePercentage: 95
      };
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editStats, setEditStats] = useState({ ...stats });

  useEffect(() => {
    localStorage.setItem('school_stats', JSON.stringify(stats));
  }, [stats]);

  const handleEdit = () => {
    setEditStats({ ...stats });
    setIsEditing(true);
  };

  const handleSave = () => {
    setStats({ ...editStats });
    setIsEditing(false);
    alert('Statistics updated successfully!');
  };

  const handleCancel = () => {
    setEditStats({ ...stats });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditStats(prev => ({
      ...prev,
      [field]: field === 'attendancePercentage' ? Math.min(100, Math.max(0, parseInt(value) || 0)) : parseInt(value) || 0
    }));
  };

  return (
    <div className="content-section">
      <div className="home-header">
        <h2>Welcome to Admin Portal, {user.name}!</h2>
        <p>Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
        {!isEditing && (
          <button className="edit-stats-btn" onClick={handleEdit}>
            Edit Statistics
          </button>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"></div>
          {isEditing ? (
            <div className="stat-edit">
              <label>Students per Class</label>
              <input
                type="number"
                value={editStats.studentsPerClass}
                onChange={(e) => handleInputChange('studentsPerClass', e.target.value)}
                min="1"
                max="100"
              />
            </div>
          ) : (
            <>
              <h3>Students per Class</h3>
              <p className="stat-number">{stats.studentsPerClass}</p>
            </>
          )}
        </div>

        <div className="stat-card">
          <div className="stat-icon"></div>
          {isEditing ? (
            <div className="stat-edit">
              <label>Total Teachers</label>
              <input
                type="number"
                value={editStats.totalTeachers}
                onChange={(e) => handleInputChange('totalTeachers', e.target.value)}
                min="1"
                max="100"
              />
            </div>
          ) : (
            <>
              <h3>Total Teachers</h3>
              <p className="stat-number">{stats.totalTeachers}</p>
            </>
          )}
        </div>

        <div className="stat-card">
          <div className="stat-icon"></div>
          {isEditing ? (
            <div className="stat-edit">
              <label>Total Classes</label>
              <input
                type="number"
                value={editStats.totalClasses}
                onChange={(e) => handleInputChange('totalClasses', e.target.value)}
                min="1"
                max="50"
              />
            </div>
          ) : (
            <>
              <h3>Total Classes</h3>
              <p className="stat-number">{stats.totalClasses}</p>
            </>
          )}
        </div>

        <div className="stat-card">
          <div className="stat-icon"></div>
          {isEditing ? (
            <div className="stat-edit">
              <label>Attendance %</label>
              <input
                type="number"
                value={editStats.attendancePercentage}
                onChange={(e) => handleInputChange('attendancePercentage', e.target.value)}
                min="0"
                max="100"
              />
            </div>
          ) : (
            <>
              <h3>Attendance Percentage</h3>
              <p className="stat-number">{stats.attendancePercentage}%</p>
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="edit-actions">
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
      <div className="additional-info">
        <div className="info-card">
          <h4>Total Students</h4>
          <p className="info-number">{stats.studentsPerClass * stats.totalClasses}</p>
          <small>Students per Class × Total Classes</small>
        </div>
      </div>
    </div>
  );
};

const TeachersContent = () => {
  const [teachers, setTeachers] = useState(() => {
    const savedTeachers = localStorage.getItem('school_teachers');
    if (savedTeachers) {
      return JSON.parse(savedTeachers);
    } else {
      return [
        { id: 1, name: 'Emma Baker', subject: 'Mathematics', class: '6,5' },
        { id: 2, name: 'Olivia Davis', subject: 'English', class: '9,10' },
        { id: 3, name: 'Ethan Evans', subject: 'History', class: '2,3' },
        { id: 4, name: 'Sophia Foster', subject: 'Geography', class: '3,4' },
        { id: 5, name: 'Mason Green', subject: 'Physics', class: '8' },
        { id: 6, name: 'Ava Harris', subject: 'English', class: '9' },
        { id: 7, name: 'Noah Johnson', subject: 'History', class: '1,2' },
        { id: 8, name: 'Isabella King', subject: 'Geography', class: '2,3' },
        { id: 9, name: 'James Lee', subject: 'Physics', class: '5' },
        { id: 10, name: 'Mia Parker', subject: 'Science', class: '6' },
        { id: 11, name: 'Lucas Robinson', subject: 'Chemistry', class: '7' },
        { id: 12, name: 'Charlotte Scott', subject: 'Biology', class: '8' },
        { id: 13, name: 'Benjamin Taylor', subject: 'Computer Science', class: '6' },
        { id: 14, name: 'Amelia White', subject: 'Art', class: '9,10' },
        { id: 15, name: 'William Brown', subject: 'Music', class: '3,4' },
        { id: 16, name: 'Harper Clark', subject: 'Physical Education', class: 'All Classes' },
        { id: 17, name: 'Henry Lewis', subject: 'Social Studies', class: '7,9' },
        { id: 18, name: 'Evelyn Walker', subject: 'French', class: '5,7' },
        { id: 19, name: 'Alexander Hall', subject: 'Spanish', class: '3,4' },
        { id: 20, name: 'Abigail Young', subject: 'Economics', class: '1,2,3' },
        { id: 21, name: 'Michael Allen', subject: 'Business Studies', class: '6,7,8' },
        { id: 22, name: 'Elizabeth Wright', subject: 'Drama', class: '9,10' }
      ];
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', class: '' });
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    localStorage.setItem('school_teachers', JSON.stringify(teachers));
  }, [teachers]);

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setSelectedClasses(teacher.class.split(',').map(c => c.trim()));
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editingTeacher.name && editingTeacher.subject && selectedClasses.length > 0) {
      const updatedTeacher = {
        ...editingTeacher,
        class: selectedClasses.join(',')
      };
      setTeachers(prev => 
        prev.map(teacher => 
          teacher.id === updatedTeacher.id ? updatedTeacher : teacher
        )
      );
      setIsEditing(false);
      setEditingTeacher(null);
      setSelectedClasses([]);
      alert('Teacher updated successfully!');
    } else {
      alert('Please fill in all fields and select at least one class.');
    }
  };

  const handleDelete = (teacherId) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
      alert('Teacher deleted successfully!');
    }
  };

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.subject && selectedClasses.length > 0) {
      const teacher = {
        id: Date.now(),
        name: newTeacher.name,
        subject: newTeacher.subject,
        class: selectedClasses.join(',')
      };
      setTeachers(prev => [...prev, teacher]);
      setNewTeacher({ name: '', subject: '', class: '' });
      setSelectedClasses([]);
      alert('Teacher added successfully!');
    } else {
      alert('Please fill in all fields and select at least one class.');
    }
  };

  const handleInputChange = (field, value) => {
    if (isEditing) {
      setEditingTeacher(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setNewTeacher(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleClassSelection = (classNumber) => {
    if (classNumber === 'All Classes') {
      setSelectedClasses(['All Classes']);
    } else {
      setSelectedClasses(prev => {
        const filtered = prev.filter(c => c !== 'All Classes');
        if (filtered.includes(classNumber)) {
          return filtered.filter(c => c !== classNumber);
        } else {
          return [...filtered, classNumber];
        }
      });
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingTeacher(null);
    setSelectedClasses([]);
  };

  const subjectOptions = [
    'Mathematics', 'English', 'History', 'Geography', 'Physics', 'Chemistry',
    'Biology', 'Science', 'Computer Science', 'Art', 'Music', 'Physical Education',
    'Social Studies', 'French', 'Spanish', 'Economics', 'Business Studies', 'Drama'
  ];

  const classOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'All Classes'];

  return (
    <div className="content-section">
      <div className="content-header">
        <h2>Teachers Management</h2>
        <p>Manage all teachers in the school</p>
      </div>

      <div className="teacher-form-section">
        <h3>Add New Teacher</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Teacher Name</label>
            <input
              type="text"
              value={newTeacher.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter teacher name"
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <select
              value={newTeacher.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjectOptions.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>Select Classes</label>
          <div className="class-selection">
            {classOptions.map((classNum) => (
              <label key={classNum} className="class-checkbox">
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(classNum)}
                  onChange={() => handleClassSelection(classNum)}
                />
                <span className="checkmark">Class {classNum}</span>
              </label>
            ))}
          </div>
          <small>Selected: {selectedClasses.length > 0 ? selectedClasses.join(', ') : 'None'}</small>
        </div>
        
        <button className="btn-primary" onClick={handleAddTeacher}>
          Add Teacher
        </button>
      </div>

      {isEditing && (
        <div className="teacher-form-section edit-mode">
          <h3>Edit Teacher</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Teacher Name</label>
              <input
                type="text"
                value={editingTeacher.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select
                value={editingTeacher.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
              >
                {subjectOptions.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Select Classes</label>
            <div className="class-selection">
              {classOptions.map((classNum) => (
                <label key={classNum} className="class-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedClasses.includes(classNum)}
                    onChange={() => handleClassSelection(classNum)}
                  />
                  <span className="checkmark">Class {classNum}</span>
                </label>
              ))}
            </div>
            <small>Selected: {selectedClasses.length > 0 ? selectedClasses.join(', ') : 'None'}</small>
          </div>
          
          <div className="edit-actions">
            <button className="btn-primary" onClick={handleSaveEdit}>
              Save Changes
            </button>
            <button className="btn-secondary" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="teachers-list">
        <h3>All Teachers ({teachers.length})</h3>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.class}</td>
                  <td>
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(teacher)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(teacher.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SubjectsContent = () => {
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem('school_subjects');
    if (savedSubjects) {
      return JSON.parse(savedSubjects);
    } else {
      return [
        {
          id: 1,
          name: 'Mathematics',
          chapters: ['Algebra Basics', 'Geometry Fundamentals', 'Trigonometry', 'Calculus Introduction'],
          classes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        {
          id: 2,
          name: 'English',
          chapters: ['Grammar & Composition', 'Literature Analysis', 'Creative Writing', 'Communication Skills'],
          classes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        {
          id: 3,
          name: 'History',
          chapters: ['Ancient Civilizations', 'World Wars', 'Indian History', 'Modern World'],
          classes: ['6', '7', '8', '9', '10']
        },
        {
          id: 4,
          name: 'Geography',
          chapters: ['Physical Geography', 'Human Geography', 'Environmental Studies', 'Map Reading'],
          classes: ['6', '7', '8', '9', '10']
        },
        {
          id: 5,
          name: 'Physics',
          chapters: ['Mechanics', 'Electricity & Magnetism', 'Optics', 'Modern Physics'],
          classes: ['9', '10']
        },
        {
          id: 6,
          name: 'Chemistry',
          chapters: ['Basic Concepts', 'Organic Chemistry', 'Inorganic Chemistry', 'Chemical Reactions'],
          classes: ['9', '10']
        },
        {
          id: 7,
          name: 'Biology',
          chapters: ['Cell Biology', 'Human Physiology', 'Genetics', 'Ecology'],
          classes: ['9', '10']
        },
        {
          id: 8,
          name: 'Science',
          chapters: ['General Science', 'Scientific Methods', 'Environmental Science', 'Science & Technology'],
          classes: ['1', '2', '3', '4', '5', '6', '7', '8']
        },
        {
          id: 9,
          name: 'Computer Science',
          chapters: ['Programming Basics', 'Web Development', 'Database Management', 'Computer Networks'],
          classes: ['6', '7', '8', '9', '10']
        },
        {
          id: 10,
          name: 'Art',
          chapters: ['Drawing & Sketching', 'Painting Techniques', 'Art History', 'Creative Expression'],
          classes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        {
          id: 11,
          name: 'Music',
          chapters: ['Music Theory', 'Vocal Training', 'Instrumental Music', 'Music Appreciation'],
          classes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        {
          id: 12,
          name: 'Physical Education',
          chapters: ['Sports & Games', 'Health & Fitness', 'Yoga & Meditation', 'Team Sports'],
          classes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        {
          id: 13,
          name: 'Social Studies',
          chapters: ['Civics & Governance', 'Economics Basics', 'Sociology', 'Current Affairs'],
          classes: ['6', '7', '8', '9', '10']
        },
        {
          id: 14,
          name: 'French',
          chapters: ['Basic French', 'Conversational French', 'French Grammar', 'French Culture'],
          classes: ['6', '7', '8', '9', '10']
        },
        {
          id: 15,
          name: 'Spanish',
          chapters: ['Spanish Basics', 'Intermediate Spanish', 'Spanish Literature', 'Hispanic Culture'],
          classes: ['6', '7', '8', '9', '10']
        },
        {
          id: 16,
          name: 'Economics',
          chapters: ['Microeconomics', 'Macroeconomics', 'Indian Economy', 'Global Economics'],
          classes: ['9', '10']
        },
        {
          id: 17,
          name: 'Business Studies',
          chapters: ['Business Organization', 'Marketing', 'Finance', 'Entrepreneurship'],
          classes: ['9', '10']
        },
        {
          id: 18,
          name: 'Drama',
          chapters: ['Acting Techniques', 'Theater History', 'Stage Production', 'Script Writing'],
          classes: ['6', '7', '8', '9', '10']
        }
      ];
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [newSubject, setNewSubject] = useState({ name: '', chapters: ['', '', '', ''], classes: [] });
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    localStorage.setItem('school_subjects', JSON.stringify(subjects));
  }, [subjects]);

  const handleEdit = (subject) => {
    setEditingSubject({...subject});
    setSelectedClasses([...subject.classes]);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editingSubject.name && editingSubject.chapters.filter(ch => ch.trim()).length > 0 && selectedClasses.length > 0) {
      const updatedSubject = {
        ...editingSubject,
        classes: selectedClasses
      };
      setSubjects(prev => 
        prev.map(subject => 
          subject.id === updatedSubject.id ? updatedSubject : subject
        )
      );
      setIsEditing(false);
      setEditingSubject(null);
      setSelectedClasses([]);
      alert('Subject updated successfully!');
    } else {
      alert('Please fill in all fields, add at least one chapter, and select at least one class.');
    }
  };

  const handleDelete = (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(prev => prev.filter(subject => subject.id !== subjectId));
      alert('Subject deleted successfully!');
    }
  };

  const handleAddSubject = () => {
    const validChapters = newSubject.chapters.filter(ch => ch.trim() !== '');
    if (newSubject.name && validChapters.length > 0 && selectedClasses.length > 0) {
      const subject = {
        id: Date.now(),
        name: newSubject.name,
        chapters: validChapters,
        classes: selectedClasses
      };
      setSubjects(prev => [...prev, subject]);
      setNewSubject({ name: '', chapters: ['', '', '', ''], classes: [] });
      setSelectedClasses([]);
      alert('Subject added successfully!');
    } else {
      alert('Please fill in all fields, add at least one chapter, and select at least one class.');
    }
  };

  const handleInputChange = (field, value) => {
    if (isEditing) {
      setEditingSubject(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      setNewSubject(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleChapterChange = (index, value) => {
    if (isEditing) {
      const updatedChapters = [...editingSubject.chapters];
      updatedChapters[index] = value;
      setEditingSubject(prev => ({
        ...prev,
        chapters: updatedChapters
      }));
    } else {
      const updatedChapters = [...newSubject.chapters];
      updatedChapters[index] = value;
      setNewSubject(prev => ({
        ...prev,
        chapters: updatedChapters
      }));
    }
  };

  const handleClassSelection = (classNumber) => {
    setSelectedClasses(prev => {
      if (prev.includes(classNumber)) {
        return prev.filter(c => c !== classNumber);
      } else {
        return [...prev, classNumber];
      }
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingSubject(null);
    setSelectedClasses([]);
  };

  const subjectOptions = [
    'Mathematics', 'English', 'History', 'Geography', 'Physics', 'Chemistry',
    'Biology', 'Science', 'Computer Science', 'Art', 'Music', 'Physical Education',
    'Social Studies', 'French', 'Spanish', 'Economics', 'Business Studies', 'Drama'
  ];

  const classOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div className="content-section">
      <div className="content-header">
        <h2>Subjects Management</h2>
        <p>Manage all subjects, chapters, and class assignments</p>
      </div>

      <div className="subject-form-section">
        <h3>Add New Subject</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Subject Name</label>
            <select
              value={newSubject.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjectOptions.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>Chapters (Add 4 chapters)</label>
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              value={newSubject.chapters[index] || ''}
              onChange={(e) => handleChapterChange(index, e.target.value)}
              placeholder={`Chapter ${index + 1}`}
              className="chapter-input"
            />
          ))}
        </div>

        <div className="form-group">
          <label>Select Classes</label>
          <div className="class-selection">
            {classOptions.map((classNum) => (
              <label key={classNum} className="class-checkbox">
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(classNum)}
                  onChange={() => handleClassSelection(classNum)}
                />
                <span className="checkmark">Class {classNum}</span>
              </label>
            ))}
          </div>
          <small>Selected: {selectedClasses.length > 0 ? selectedClasses.join(', ') : 'None'}</small>
        </div>
        
        <button className="btn-primary" onClick={handleAddSubject}>
          Add Subject
        </button>
      </div>

      {isEditing && (
        <div className="subject-form-section edit-mode">
          <h3>Edit Subject</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Subject Name</label>
              <input
                type="text"
                value={editingSubject.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Chapters</label>
            {editingSubject.chapters.map((chapter, index) => (
              <input
                key={index}
                type="text"
                value={chapter}
                onChange={(e) => handleChapterChange(index, e.target.value)}
                placeholder={`Chapter ${index + 1}`}
                className="chapter-input"
              />
            ))}
          </div>

          <div className="form-group">
            <label>Select Classes</label>
            <div className="class-selection">
              {classOptions.map((classNum) => (
                <label key={classNum} className="class-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedClasses.includes(classNum)}
                    onChange={() => handleClassSelection(classNum)}
                  />
                  <span className="checkmark">Class {classNum}</span>
                </label>
              ))}
            </div>
            <small>Selected: {selectedClasses.length > 0 ? selectedClasses.join(', ') : 'None'}</small>
          </div>
          
          <div className="edit-actions">
            <button className="btn-primary" onClick={handleSaveEdit}>
              Save Changes
            </button>
            <button className="btn-secondary" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="subjects-list">
        <h3>All Subjects ({subjects.length})</h3>
        <div className="subjects-grid">
          {subjects.map(subject => (
            <div key={subject.id} className="subject-card">
              <div className="subject-header">
                <h4>{subject.name}</h4>
                <div className="subject-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(subject)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(subject.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="subject-details">
                <div className="chapters-section">
                  <strong>Chapters:</strong>
                  <ul>
                    {subject.chapters.map((chapter, index) => (
                      <li key={index}>{chapter}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="classes-section">
                  <strong>Classes:</strong>
                  <span>{subject.classes.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClassesContent = () => {
  const [classes, setClasses] = useState(() => {
    const savedClasses = localStorage.getItem('school_classes');
    if (savedClasses) {
      return JSON.parse(savedClasses);
    } else {
      return [
        {
          id: 10,
          name: 'Class 10',
          students: 30,
          classTeacher: 'Benjamin Lee',
          avgAttendance: 91,
          performance: 'Very Good',
          avgScore: 83,
          subjects: ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Computer Science', 'Economics', 'Business Studies'],
          parameters: {
            discipline: 87,
            participation: 84,
            homework: 82,
            cleanliness: 86
          },
          timetable: [
            { time: '8:00-8:45', mon: 'Mathematics', tue: 'English', wed: 'Physics', thu: 'Chemistry', fri: 'Biology' },
            { time: '8:45-9:30', mon: 'English', tue: 'Mathematics', wed: 'Chemistry', thu: 'Physics', fri: 'Mathematics' },
            { time: '9:30-9:45', mon: 'Break', tue: 'Break', wed: 'Break', thu: 'Break', fri: 'Break' },
            { time: '9:45-10:30', mon: 'Physics', tue: 'Chemistry', wed: 'Mathematics', thu: 'English', fri: 'Computer Science' },
            { time: '10:30-11:15', mon: 'Chemistry', tue: 'Physics', wed: 'English', thu: 'Mathematics', fri: 'Economics' },
            { time: '11:15-12:00', mon: 'Biology', tue: 'Biology', wed: 'Computer Science', thu: 'Economics', fri: 'Business Studies' },
            { time: '12:00-12:45', mon: 'History', tue: 'Geography', wed: 'Economics', thu: 'Business Studies', fri: 'History' }
          ]
        }
      ];
    }
  });

  const [activeTab, setActiveTab] = useState('timetable');
  const [isEditingTimetable, setIsEditingTimetable] = useState(false);
  const [editingTimetable, setEditingTimetable] = useState([]);

  const class10 = classes.find(cls => cls.name === 'Class 10');

  const handleEditTimetable = () => {
    setEditingTimetable([...class10.timetable]);
    setIsEditingTimetable(true);
  };

  const handleSaveTimetable = () => {
    const updatedClasses = classes.map(cls => 
      cls.name === 'Class 10' ? {...cls, timetable: editingTimetable} : cls
    );
    setClasses(updatedClasses);
    setIsEditingTimetable(false);
    alert('Timetable updated successfully!');
  };

  const handleTimetableChange = (day, periodIndex, value) => {
    const updatedTimetable = [...editingTimetable];
    updatedTimetable[periodIndex][day] = value;
    setEditingTimetable(updatedTimetable);
  };

  const subjectOptions = [
    'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 
    'History', 'Geography', 'Computer Science', 'Economics', 'Business Studies',
    'Break', 'Library', 'Sports'
  ];

  return (
    <div className="content-section">
      <div className="content-header">
        <h2>Classes Management - Class 10</h2>
        <p>Manage Class 10 timetable, performance, and parameters</p>
      </div>

      <div className="class-tabs">
        <button 
          className={activeTab === 'timetable' ? 'tab-active' : ''}
          onClick={() => setActiveTab('timetable')}
        >
          Timetable
        </button>
      </div>

      {activeTab === 'timetable' && (
        <div className="timetable-section">
          <div className="section-header">
            <h3>Class 10 Timetable</h3>
            <button className="btn-primary" onClick={handleEditTimetable}>
              Edit Timetable
            </button>
          </div>

          {isEditingTimetable ? (
            <div className="timetable-edit">
              <table className="timetable-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                  </tr>
                </thead>
                <tbody>
                  {editingTimetable.map((period, index) => (
                    <tr key={index}>
                      <td>{period.time}</td>
                      <td>
                        <select
                          value={period.mon}
                          onChange={(e) => handleTimetableChange('mon', index, e.target.value)}
                        >
                          {subjectOptions.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={period.tue}
                          onChange={(e) => handleTimetableChange('tue', index, e.target.value)}
                        >
                          {subjectOptions.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={period.wed}
                          onChange={(e) => handleTimetableChange('wed', index, e.target.value)}
                        >
                          {subjectOptions.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={period.thu}
                          onChange={(e) => handleTimetableChange('thu', index, e.target.value)}
                        >
                          {subjectOptions.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={period.fri}
                          onChange={(e) => handleTimetableChange('fri', index, e.target.value)}
                        >
                          {subjectOptions.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="edit-actions">
                <button className="btn-primary" onClick={handleSaveTimetable}>
                  Save Timetable
                </button>
                <button className="btn-secondary" onClick={() => setIsEditingTimetable(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="timetable-view">
              <table className="timetable-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                  </tr>
                </thead>
                <tbody>
                  {class10.timetable.map((period, index) => (
                    <tr key={index}>
                      <td>{period.time}</td>
                      <td>{period.mon}</td>
                      <td>{period.tue}</td>
                      <td>{period.wed}</td>
                      <td>{period.thu}</td>
                      <td>{period.fri}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ExamsContent = () => {
  const [exams, setExams] = useState(() => {
    const savedExams = localStorage.getItem('school_exams');
    if (savedExams) {
      return JSON.parse(savedExams);
    } else {
      return [
        {
          id: 1,
          name: 'Mid-Term Examination',
          class: '10',
          subjects: [
            { name: 'Mathematics', date: '2024-10-15', maxMarks: 100 },
            { name: 'English', date: '2024-10-16', maxMarks: 100 },
            { name: 'Physics', date: '2024-10-17', maxMarks: 100 },
            { name: 'Chemistry', date: '2024-10-18', maxMarks: 100 },
            { name: 'Biology', date: '2024-10-19', maxMarks: 100 }
          ],
          status: 'Upcoming'
        },
        {
          id: 2,
          name: 'Unit Test - 1',
          class: '10',
          subjects: [
            { name: 'Mathematics', date: '2024-09-10', maxMarks: 50 },
            { name: 'English', date: '2024-09-11', maxMarks: 50 }
          ],
          status: 'Completed'
        }
      ];
    }
  });

  const [isAddingExam, setIsAddingExam] = useState(false);
  const [newExam, setNewExam] = useState({ name: '', class: '10', subjects: [] });

  useEffect(() => {
    localStorage.setItem('school_exams', JSON.stringify(exams));
  }, [exams]);

  const handleAddExam = () => {
    if (newExam.name && newExam.subjects.length > 0) {
      const exam = {
        id: Date.now(),
        ...newExam,
        status: 'Upcoming'
      };
      setExams(prev => [...prev, exam]);
      setNewExam({ name: '', class: '10', subjects: [] });
      setIsAddingExam(false);
      alert('Exam added successfully!');
    } else {
      alert('Please fill exam name and add at least one subject.');
    }
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(prev => prev.filter(exam => exam.id !== examId));
      alert('Exam deleted successfully!');
    }
  };

  const addSubjectToExam = () => {
    setNewExam(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: '', date: '', maxMarks: 100 }]
    }));
  };

  const updateExamSubject = (index, field, value) => {
    const updatedSubjects = [...newExam.subjects];
    updatedSubjects[index][field] = value;
    setNewExam(prev => ({ ...prev, subjects: updatedSubjects }));
  };

  const removeSubjectFromExam = (index) => {
    const updatedSubjects = newExam.subjects.filter((_, i) => i !== index);
    setNewExam(prev => ({ ...prev, subjects: updatedSubjects }));
  };

  const subjectOptions = [
    'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 
    'History', 'Geography', 'Computer Science', 'Economics', 'Business Studies'
  ];

  return (
    <div className="content-section">
      <div className="content-header">
        <h2>Exams - Class 10</h2>
        <p>View exam schedules</p>
      </div>

      <div className="exam-form-section">
          <button 
            className="btn-primary"
            onClick={() => setIsAddingExam(!isAddingExam)}
          >
            {isAddingExam ? 'Cancel' : 'Add New Exam'}
          </button>

          {isAddingExam && (
            <div className="add-exam-form">
              <h3>Add New Exam</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Exam Name</label>
                  <input
                    type="text"
                    value={newExam.name}
                    onChange={(e) => setNewExam(prev => ({...prev, name: e.target.value}))}
                    placeholder="e.g., Mid-Term, Unit Test, Final Exam"
                  />
                </div>
                <div className="form-group">
                  <label>Class</label>
                  <select value={newExam.class} disabled>
                    <option value="10">Class 10</option>
                  </select>
                </div>
              </div>

              <div className="subjects-section">
                <h4>Exam Subjects</h4>
                {newExam.subjects.map((subject, index) => (
                  <div key={index} className="subject-row">
                    <select
                      value={subject.name}
                      onChange={(e) => updateExamSubject(index, 'name', e.target.value)}
                    >
                      <option value="">Select Subject</option>
                      {subjectOptions.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={subject.date}
                      onChange={(e) => updateExamSubject(index, 'date', e.target.value)}
                    />
                    <input
                      type="number"
                      value={subject.maxMarks}
                      onChange={(e) => updateExamSubject(index, 'maxMarks', parseInt(e.target.value) || 0)}
                      placeholder="Max Marks"
                      min="1"
                      max="200"
                    />
                    <button 
                      className="btn-delete"
                      onClick={() => removeSubjectFromExam(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button className="btn-secondary" onClick={addSubjectToExam}>
                  Add Subject
                </button>
              </div>

              <button className="btn-primary" onClick={handleAddExam}>
                Create Exam
              </button>
            </div>
          )}
        </div>

      <div className="exams-list">
        <h3>Class 10 Exams ({exams.length})</h3>
        <div className="exams-grid">
          {exams.map(exam => (
            <div key={exam.id} className="exam-card">
              <div className="exam-header">
                <h4>{exam.name}</h4>
                <span className={`status-badge ${exam.status.toLowerCase()}`}>
                  {exam.status}
                </span>
              </div>
              
              <div className="exam-details">
                <p><strong>Class:</strong> {exam.class}</p>
                <div className="subjects-list">
                  <strong>Subjects Schedule:</strong>
                  {exam.subjects.map((subject, index) => (
                    <div key={index} className="subject-schedule">
                      <span>{subject.name}</span>
                      <span>{new Date(subject.date).toLocaleDateString()}</span>
                      <span>Max Marks: {subject.maxMarks}</span>
                    </div>
                  ))}
                </div>
              </div>

          
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AssignmentsContent = () => {
  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem('school_assignments');
    if (savedAssignments) {
      return JSON.parse(savedAssignments);
    } else {
      return [
        {
          id: 1,
          title: 'Algebra Practice Problems',
          subject: 'Mathematics',
          class: '10',
          dueDate: '2024-09-20',
          description: 'Solve problems from Chapter 3: Quadratic Equations',
          maxMarks: 20,
          submissions: 25,
          status: 'Active'
        },
        {
          id: 2,
          title: 'Physics Lab Report',
          subject: 'Physics',
          class: '10',
          dueDate: '2024-09-18',
          description: 'Write lab report for Ohm\'s Law experiment',
          maxMarks: 15,
          submissions: 28,
          status: 'Active'
        }
      ];
    }
  });

  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    class: '10',
    dueDate: '',
    description: '',
    maxMarks: 10
  });

  useEffect(() => {
    localStorage.setItem('school_assignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.subject && newAssignment.dueDate) {
      const assignment = {
        id: Date.now(),
        ...newAssignment,
        submissions: 0,
        status: 'Active'
      };
      setAssignments(prev => [...prev, assignment]);
      setNewAssignment({
        title: '',
        subject: '',
        class: '10',
        dueDate: '',
        description: '',
        maxMarks: 10
      });
      setIsAddingAssignment(false);
      alert('Assignment created successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
      alert('Assignment deleted successfully!');
    }
  };

  const subjectOptions = [
    'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 
    'History', 'Geography', 'Computer Science', 'Economics', 'Business Studies'
  ];

  return (
    <div className="content-section">
      <div className="content-header">
        <h2>Assignments - Class 10</h2>
        <p>View homework assignments</p>
      </div>

      <div className="assignment-form-section">
          <button 
            className="btn-primary"
            onClick={() => setIsAddingAssignment(!isAddingAssignment)}
          >
            {isAddingAssignment ? 'Cancel' : 'Create Assignment'}
          </button>

          {isAddingAssignment && (
            <div className="add-assignment-form">
              <h3>Create New Assignment</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Assignment Title *</label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment(prev => ({...prev, title: e.target.value}))}
                    placeholder="Enter assignment title"
                  />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    value={newAssignment.subject}
                    onChange={(e) => setNewAssignment(prev => ({...prev, subject: e.target.value}))}
                  >
                    <option value="">Select Subject</option>
                    {subjectOptions.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Due Date *</label>
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment(prev => ({...prev, dueDate: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label>Max Marks</label>
                  <input
                    type="number"
                    value={newAssignment.maxMarks}
                    onChange={(e) => setNewAssignment(prev => ({...prev, maxMarks: parseInt(e.target.value) || 10}))}
                    min="1"
                    max="100"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment(prev => ({...prev, description: e.target.value}))}
                  placeholder="Assignment instructions and requirements..."
                  rows="3"
                />
              </div>

              <button className="btn-primary" onClick={handleAddAssignment}>
                Create Assignment
              </button>
            </div>
          )}
        </div>

      <div className="assignments-list">
        <h3>Active Assignments ({assignments.filter(a => a.status === 'Active').length})</h3>
        <div className="assignments-grid">
          {assignments.map(assignment => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header">
                <h4>{assignment.title}</h4>
                <span className={`status-badge ${assignment.status.toLowerCase()}`}>
                  {assignment.status}
                </span>
              </div>
              
              <div className="assignment-details">
                <p><strong>Subject:</strong> {assignment.subject}</p>
                <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                <p><strong>Max Marks:</strong> {assignment.maxMarks}</p>
                <p><strong>Submissions:</strong> {assignment.submissions}/30</p>
                {assignment.description && (
                  <p><strong>Description:</strong> {assignment.description}</p>
                )}
              </div>

              <div className="assignment-actions">
                <button className="btn-edit">Grade Submissions</button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteAssignment(assignment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResultsContent = () => {
  const [results, setResults] = useState(() => {
    const savedResults = localStorage.getItem('school_results');
    if (savedResults) {
      return JSON.parse(savedResults);
    } else {
      const students = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        rollNo: `10${String(i + 1).padStart(2, '0')}`,
        marks: {
          Mathematics: Math.floor(Math.random() * 41) + 60,
          English: Math.floor(Math.random() * 41) + 60,
          Physics: Math.floor(Math.random() * 41) + 60,
          Chemistry: Math.floor(Math.random() * 41) + 60,
          Biology: Math.floor(Math.random() * 41) + 60
        }
      }));

      return [
        {
          id: 1,
          examName: 'Mid-Term Examination',
          class: '10',
          students: students,
          maxMarks: {
            Mathematics: 100,
            English: 100,
            Physics: 100,
            Chemistry: 100,
            Biology: 100
          },
          status: 'Published'
        }
      ];
    }
  });

  const [editingResults, setEditingResults] = useState(null);

  useEffect(() => {
    localStorage.setItem('school_results', JSON.stringify(results));
  }, [results]);

  const handleEditMarks = (resultId) => {
    const result = results.find(r => r.id === resultId);
    setEditingResults({...result});
  };

  const handleSaveMarks = () => {
    setResults(prev => 
      prev.map(result => 
        result.id === editingResults.id ? editingResults : result
      )
    );
    setEditingResults(null);
    alert('Results updated successfully!');
  };

  const updateStudentMark = (studentIndex, subject, mark) => {
    const updatedResults = {...editingResults};
    updatedResults.students[studentIndex].marks[subject] = parseInt(mark) || 0;
    setEditingResults(updatedResults);
  };

  const calculatePercentage = (student) => {
    const totalMarks = Object.values(student.marks).reduce((sum, mark) => sum + mark, 0);
    const maxTotal = Object.values(editingResults?.maxMarks || {}).reduce((sum, max) => sum + max, 0);
    return ((totalMarks / maxTotal) * 100).toFixed(2);
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  return (
    <div className="content-section">
      <div className="content-header">
        <h2>Results - Class 10</h2>
        <p>View exam results</p>
      </div>

      <div className="results-list">
        <h3>Exam Results ({results.length})</h3>
        {results.map(result => (
          <div key={result.id} className="result-card">
            <div className="result-header">
              <h4>{result.examName} - Class {result.class}</h4>
              <div className="result-actions">
                <span className={`status-badge ${result.status.toLowerCase()}`}>
                  {result.status}
                </span>
                <button 
                  className="btn-edit"
                  onClick={() => handleEditMarks(result.id)}
                >
                  Edit Marks
                </button>
              </div>
            </div>

            {editingResults && editingResults.id === result.id ? (
              <div className="results-edit">
                <h5>Edit Marks for {result.examName}</h5>
                <div className="table-container">
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Student Name</th>
                        {Object.keys(result.maxMarks).map(subject => (
                          <th key={subject}>{subject}</th>
                        ))}
                        <th>Total</th>
                        <th>Percentage</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editingResults.students.map((student, index) => (
                        <tr key={student.id}>
                          <td>{student.rollNo}</td>
                          <td>{student.name}</td>
                          {Object.keys(editingResults.maxMarks).map(subject => (
                            <td key={subject}>
                              <input
                                type="number"
                                value={student.marks[subject]}
                                onChange={(e) => updateStudentMark(index, subject, e.target.value)}
                                min="0"
                                max={editingResults.maxMarks[subject]}
                                className="mark-input"
                              />
                            </td>
                          ))}
                          <td>{Object.values(student.marks).reduce((sum, mark) => sum + mark, 0)}</td>
                          <td>{calculatePercentage(student)}%</td>
                          <td>{getGrade(calculatePercentage(student))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="edit-actions">
                  <button className="btn-primary" onClick={handleSaveMarks}>
                    Save All Changes
                  </button>
                  <button className="btn-secondary" onClick={() => setEditingResults(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="results-view">
                <div className="table-container">
                  <table className="results-table">
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Student Name</th>
                        {Object.keys(result.maxMarks).map(subject => (
                          <th key={subject}>{subject}</th>
                        ))}
                        <th>Total</th>
                        <th>Percentage</th>
                        <th>Grade</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.students.map(student => {
                        const totalMarks = Object.values(student.marks).reduce((sum, mark) => sum + mark, 0);
                        const percentage = (totalMarks / Object.values(result.maxMarks).reduce((sum, max) => sum + max, 0) * 100).toFixed(2);
                        const grade = getGrade(percentage);
                        
                        return (
                          <tr key={student.id}>
                            <td>{student.rollNo}</td>
                            <td>{student.name}</td>
                            {Object.keys(result.maxMarks).map(subject => (
                              <td key={subject}>{student.marks[subject]}</td>
                            ))}
                            <td>{totalMarks}</td>
                            <td>{percentage}%</td>
                            <td>{grade}</td>
                            <td>
                              <span className={`grade-badge grade-${grade}`}>
                                {grade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AttendanceContent = () => {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('school_attendance_students');
    if (savedStudents) {
      return JSON.parse(savedStudents);
    } else {
      return Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Student ${i + 1}`,
        rollNo: `10${String(i + 1).padStart(2, '0')}`,
        attendance: [
          'present', 'present', 'present', 'present', 'present',
          'present', 'present', 'present', 'present', 'present',
          'present', 'present', 'present', 'present', 'present',
          'present', 'present', 'present', 'present', 'present',
          'present', 'present', 'present', 'present', 'absent',
          'present', 'present', 'present', 'present', 'present'
        ]
      }));
    }
  });

  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const savedRecords = localStorage.getItem('school_attendance_records');
    return savedRecords ? JSON.parse(savedRecords) : {};
  });

  useEffect(() => {
    localStorage.setItem('school_attendance_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('school_attendance_records', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    if (!attendanceRecords[attendanceDate]) {
      setAttendanceRecords(prev => ({
        ...prev,
        [attendanceDate]: students.reduce((acc, student) => {
          acc[student.id] = 'present'; // Default to present
          return acc;
        }, {})
      }));
    }
  }, [attendanceDate, students]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [attendanceDate]: {
        ...prev[attendanceDate],
        [studentId]: status
      }
    }));
  };

  const calculateAttendanceStats = () => {
    const stats = students.map(student => {
      const presentDays = student.attendance.filter(status => status === 'present').length;
      const totalDays = 30;
      const percentage = (presentDays / totalDays) * 100;
      
      return {
        ...student,
        presentDays,
        totalDays,
        percentage: Math.round(percentage)
      };
    });

    return stats.sort((a, b) => b.percentage - a.percentage);
  };

  const handleMarkAll = (status) => {
    const updatedRecords = { ...attendanceRecords };
    students.forEach(student => {
      updatedRecords[attendanceDate][student.id] = status;
    });
    setAttendanceRecords(updatedRecords);
    alert(`Marked all students as ${status}`);
  };

  const getTodayAttendance = () => {
    const todayRecord = attendanceRecords[attendanceDate];
    if (!todayRecord) return { present: 0, absent: 0, total: students.length };
    
    const present = Object.values(todayRecord).filter(status => status === 'present').length;
    return {
      present,
      absent: students.length - present,
      total: students.length
    };
  };

  const attendanceStats = calculateAttendanceStats();
  const todayAttendance = getTodayAttendance();

  return (
    <div className="content-section">
      <div className="content-header">
        <h2>Attendance Management - Class 10</h2>
        <p>View attendance for 30 students</p>
      </div>
      <div className="attendance-summary">
        <div className="summary-card">
          <h3>Today's Attendance</h3>
          <p className="summary-number">{todayAttendance.present}/{todayAttendance.total}</p>
          <p className="summary-percentage">
            {Math.round((todayAttendance.present / todayAttendance.total) * 100)}%
          </p>
        </div>
        <div className="summary-card">
          <h3>Present</h3>
          <p className="summary-number present">{todayAttendance.present}</p>
        </div>
        <div className="summary-card">
          <h3>Absent</h3>
          <p className="summary-number absent">{todayAttendance.absent}</p>
        </div>
        <div className="summary-card">
          <h3>Total Students</h3>
          <p className="summary-number">{students.length}</p>
        </div>
      </div>

      <div className="view-statistics">
        <h3>Total Attendance from start of the year</h3>
        <div className="stats-grid">
          {attendanceStats.map(student => (
            <div key={student.id} className="student-attendance-card">
              <div className="student-info">
                <h4>{student.name}</h4>
                <span className="roll-no">{student.rollNo}</span>
              </div>
              <div className="attendance-info">
                <div className="attendance-bar">
                  <div 
                    className="attendance-fill"
                    style={{ width: `${student.percentage}%` }}
                  ></div>
                </div>
                <div className="attendance-numbers">
                  <span className="percentage">{student.percentage}%</span>
                  <span className="days">{student.presentDays}/30</span>
                </div>
              </div>
              <div className={`attendance-badge ${getAttendanceLevel(student.percentage)}`}>
                {getAttendanceLevel(student.percentage)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="attendance-tabs">
        <button className="tab-active">
          Mark Attendance
        </button>
      </div>

      <div className="mark-attendance">
        <div className="attendance-header">
          <div className="date-selector">
            <label>Select Date:</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
            />
          </div>
          <div className="bulk-actions">
            <button 
              className="btn-present"
              onClick={() => handleMarkAll('present')}
            >
              Mark All Present
            </button>
            <button 
              className="btn-absent"
              onClick={() => handleMarkAll('absent')}
            >
              Mark All Absent
            </button>
          </div>
        </div>

        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>
                    <span className={`attendance-status ${
                      attendanceRecords[attendanceDate]?.[student.id] === 'present' ? 'present' : 'absent'
                    }`}>
                      {attendanceRecords[attendanceDate]?.[student.id] === 'present' ? 'Present' : 'Absent'}
                    </span>
                  </td>
                  <td>
                    <div className="attendance-actions">
                      <button
                        className={`btn-present ${attendanceRecords[attendanceDate]?.[student.id] === 'present' ? 'active' : ''}`}
                        onClick={() => handleAttendanceChange(student.id, 'present')}
                      >
                        Present
                      </button>
                      <button
                        className={`btn-absent ${attendanceRecords[attendanceDate]?.[student.id] === 'absent' ? 'active' : ''}`}
                        onClick={() => handleAttendanceChange(student.id, 'absent')}
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  function getAttendanceLevel(percentage) {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Good';
    if (percentage >= 70) return 'Average';
    if (percentage >= 60) return 'Poor';
    return 'Critical';
  }
};

const AnnouncementsContent = () => {
  const [announcements, setAnnouncements] = useState(() => {
    const savedAnnouncements = localStorage.getItem('school_announcements');
    if (savedAnnouncements) {
      const parsed = JSON.parse(savedAnnouncements);
      return parsed.map(announcement => ({
        ...announcement,
        priority: announcement.priority || 'medium'
      }));
    } else {
      return [
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
          content: 'The annual Book Fair will open this Thursday. Stop by the library to browse the newest books and educational materials.',
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
    }
  });

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Principal Office',
    priority: 'medium'
  });

  const canPostAnnouncements = true;
  const canDeleteAnnouncements = true;

  const authorOptions = [
    'Principal Office',
    'Vice Principal Office',
    'Academic Department',
    'Library Department',
    'Sports Department',
    'Art Department',
    'Science Department',
    'Mathematics Department',
    'English Department',
    'Administration'
  ];

  useEffect(() => {
    localStorage.setItem('school_announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.content && newAnnouncement.date) {
      const announcement = {
        id: Date.now(),
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: newAnnouncement.date,
        author: newAnnouncement.author,
        priority: newAnnouncement.priority
      };
      
      setAnnouncements(prev => [announcement, ...prev]);
      setNewAnnouncement({ 
        title: '', 
        content: '', 
        date: new Date().toISOString().split('T')[0],
        author: 'Principal Office',
        priority: 'medium' 
      });
      alert('Announcement posted successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleDeleteAnnouncement = (announcementId) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== announcementId));
      alert('Announcement deleted successfully!');
    }
  };

  const getPriorityColor = (priority) => {
    const p = priority || 'medium';
    switch (p) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44ff44';
      default: return '#666';
    }
  };

  return (
    <div className="content-section">
      <div className="content-header">
        <h2>Announcements</h2>
        <p>Important updates and news from the school administration</p>
        {!canPostAnnouncements && (
          <div className="student-notice">
            <span>You can view announcements here. Only administrators can post new announcements.</span>
          </div>
        )}
      </div>

      {canPostAnnouncements && (
        <div className="announcement-form-section">
          <h3>Create New Announcement</h3>
          <form onSubmit={handleSubmit} className="announcement-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newAnnouncement.title}
                  onChange={handleInputChange}
                  placeholder="Enter announcement title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={newAnnouncement.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={newAnnouncement.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Posted By *</label>
                <select
                  name="author"
                  value={newAnnouncement.author}
                  onChange={handleInputChange}
                  required
                >
                  {authorOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                name="content"
                value={newAnnouncement.content}
                onChange={handleInputChange}
                placeholder="Enter announcement details"
                rows="4"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Post Announcement
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setNewAnnouncement({ 
                  title: '', 
                  content: '', 
                  date: new Date().toISOString().split('T')[0],
                  author: 'Principal Office',
                  priority: 'medium' 
                })}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="announcements-list">
        <div className="announcements-header">
          <h3>Recent Announcements ({announcements.length})</h3>
          {canDeleteAnnouncements && (
            <div className="admin-notice">
              You can delete announcements
            </div>
          )}
        </div>
        
        {announcements.length === 0 ? (
          <div className="no-announcements">
            <p>No announcements yet. Be the first to post one!</p>
          </div>
        ) : (
          <div className="announcements-grid">
            {announcements.map(announcement => (
              <div key={announcement.id} className="announcement-card">
                <div className="announcement-header">
                  <div className="announcement-title-section">
                    <h4>{announcement.title}</h4>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(announcement.priority || 'medium') }}
                    >
                      {(announcement.priority || 'medium').toUpperCase()}
                    </span>
                  </div>
                  {canDeleteAnnouncements && (
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      title="Delete announcement"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="announcement-content">{announcement.content}</p>
                <div className="announcement-footer">
                  <span className="announcement-date">
                    {new Date(announcement.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="announcement-author">
                    {announcement.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');
  
  const handleNavigateToAnnouncements = () => {
    setActiveSection('announcements');
  };

const renderContent = () => {
  switch(activeSection) {
    case 'home':
      return <HomeContent user={user} />;
    case 'teachers':
      return <TeachersContent />;
    case 'subjects':
      return <SubjectsContent />;
    case 'classes':
      return <ClassesContent />;
    case 'exams':
      return <ExamsContent />;
    case 'assignments':
      return <AssignmentsContent />;
    case 'results':
      return <ResultsContent />;
    case 'attendance':
      return <AttendanceContent />;
    case 'announcements':
      return <AnnouncementsContent />;
    default:
      return <HomeContent user={user} />;
  }
};

  return (
    <div className="dashboard">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        userRole={user.role}
      />
      
      <div className="dashboard-main">
        <Header 
          user={user} 
          onLogout={onLogout}
          onNavigateToAnnouncements={handleNavigateToAnnouncements}
        />
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 