import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebasecomponent/firebase';

function History() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const role = localStorage.getItem('rvaf_role');
  const email = currentUser?.email;

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'help_requests'));
        const all = snapshot.docs.map(doc => doc.data());

        if (role === 'user') {
          const userRequests = all.filter(req => req.username === email);
          setRequests(userRequests.reverse());
        } else if (role === 'provider') {
          const resolvedByMe = all.filter(req => req.resolved && req.resolvedBy === email);
          setRequests(resolvedByMe.reverse());
        }
      } catch (err) {
        console.error("❌ Failed to fetch Firestore history:", err.message);
      }
    };

    fetchHistory();
  }, [currentUser, navigate, role, email]);

  if (!currentUser) {
    return (
      <div style={{ padding: '2rem', color: 'red' }}>
        🔒 Please log in to view your history.
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>
        {role === 'user' ? 'Your Help Request History' : 'Requests Resolved By You'}
      </h2>

      {requests.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {requests.map((req, index) => (
            <li key={index} style={cardStyle}>
              {role === 'provider' && <p><strong>User:</strong> {req.name}</p>}
              <p><strong>Vehicle:</strong> {req.vehicle}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Time:</strong> {req.time}</p>
              {role === 'user' && <p><strong>Token:</strong> {req.token}</p>}
              {role === 'user' && (
                <p>
                  <strong>Status:</strong>{' '}
                  {req.resolved ? (
                    <span style={badgeResolved}>Resolved</span>
                  ) : (
                    <span style={badgePending}>Pending</span>
                  )}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ✅ Styles
const cardStyle = {
  background: '#f7fafc',
  padding: '1.2rem',
  borderRadius: '10px',
  boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
  marginBottom: '1rem',
  fontFamily: 'Segoe UI, sans-serif'
};

const badgeResolved = {
  backgroundColor: '#38a169',
  color: 'white',
  padding: '0.2rem 0.6rem',
  borderRadius: '4px',
  fontSize: '0.9rem'
};

const badgePending = {
  backgroundColor: '#ed8936',
  color: 'white',
  padding: '0.2rem 0.6rem',
  borderRadius: '4px',
  fontSize: '0.9rem'
};

export default History;
