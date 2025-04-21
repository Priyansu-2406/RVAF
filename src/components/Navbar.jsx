import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const username = localStorage.getItem('rvaf_user');
  const role = localStorage.getItem('rvaf_role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('rvaf_user');
    localStorage.removeItem('rvaf_role');
    navigate('/login');
  };

  return (
    <>
      {/* ✅ Inject hover effect styles */}
      <style>
        {`
          nav a {
            position: relative;
            transition: color 0.3s ease;
          }

          nav a:hover {
            color: #38bdf8;
          }

          nav a::after {
            content: "";
            position: absolute;
            bottom: -4px;
            left: 0;
            height: 2px;
            width: 100%;
            background-color: #38bdf8;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease-out;
          }

          nav a:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }
        `}
      </style>

      <nav style={navStyle}>
        <h2 style={logoStyle}>RVAF</h2>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/help" style={linkStyle}>Help</Link>
          {username && (
            <Link to="/history" style={linkStyle}>
              {role === 'provider' ? 'Resolved History' : 'History'}
            </Link>
          )}
          {username && <Link to="/dashboard" style={linkStyle}>Dashboard</Link>}
          {!username && <Link to="/login" style={linkStyle}>Login</Link>}
          {!username && <Link to="/signup" style={linkStyle}>Signup</Link>}
          {username && <button onClick={handleLogout} style={logoutBtn}>Logout</button>}
        </div>
      </nav>
    </>
  );
}

// Styles
const navStyle = {
  backgroundColor: '#1a202c',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
};

const logoStyle = {
  margin: 0,
  fontSize: '1.5rem',
  color: '#38bdf8'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500'
};

const logoutBtn = {
  background: '#e53e3e',
  color: 'white',
  border: 'none',
  padding: '0.4rem 0.75rem',
  borderRadius: '6px',
  fontSize: '0.9rem',
  cursor: 'pointer'
};

export default Navbar;
