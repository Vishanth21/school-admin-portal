// client/src/components/TeachersContent.js
import React, { useState, useEffect } from 'react';

const TeachersContent = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/teachers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="content-section">
      <h2>All Teachers</h2>
      
      <div className="content-actions">
        <button className="btn-primary">Add New Teacher</button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Teacher ID</th>
              <th>Subjects</th>
              <th>Classes</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.teacherId}</td>
                <td>{teacher.subjects.join(', ')}</td>
                <td>{teacher.classes.join(', ')}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.address}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersContent;