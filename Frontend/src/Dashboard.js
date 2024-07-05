import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/current_user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, []);

  console.log(user);

  return (
    <>
      <h2>Welcome {user && user.name ? user.name : 'User'}!</h2>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <img src={user.image != '' ? user.image: '/img/userpic.jpg'} alt="User" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          {/* Note: Displaying password here is not recommended for security reasons */}
        </div>
      )}
    </>
  );
}

export default Dashboard;
