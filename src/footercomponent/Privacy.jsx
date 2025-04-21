import React from 'react';

function Privacy() {
  return (
    <div style={container}>
      <h2>Privacy Policy</h2>
      <p>
        At RVAF, we take your privacy seriously. Your location, contact, and vehicle data are used only to fulfill your service requests.
        We never share or sell your data. All interactions are encrypted and securely stored.
      </p>
    </div>
  );
}

const container = {
  padding: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: 'Segoe UI, sans-serif'
};

export default Privacy;
