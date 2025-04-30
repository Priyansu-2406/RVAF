import React from 'react';

function Home() {
  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        <h1 style={titleStyle}>Welcome to RVAF</h1>
        <p style={subtitleStyle}>
          On-Road Vehicle Assistance at Your Fingertips Ready... 🚗🛠️
        </p>
      </div>
    </div>
  );
}

// ✅ Background Image & Styling
const backgroundStyle = {
  backgroundImage: 'url("https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '3rem',
  borderRadius: '12px',
  color: 'white',
  textAlign: 'center',
  maxWidth: '600px',
};

const titleStyle = {
  fontSize: '3rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  fontFamily: 'Segoe UI, sans-serif'
};

const subtitleStyle = {
  fontSize: '1.3rem',
  fontWeight: '400',
  fontFamily: 'Segoe UI, sans-serif'
};

export default Home;
