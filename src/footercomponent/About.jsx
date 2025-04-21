import React from 'react';

function About() {
  return (
    <div style={container}>
      <h2>About RVAF</h2>
      <p>
        RVAF (Roadside Vehicle Assistance Finder) is an innovative platform built to help vehicle owners connect with service providers in real-time during roadside emergencies.
        Whether you're stuck with a flat tyre, need a tow, or require mechanical assistance, RVAF ensures help is just a click away.
      </p>
    </div>
  );
}

const container = {
  padding: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: 'Segoe UI, sans-serif',
};

export default About;
