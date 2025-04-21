import React from 'react';

function Services() {
  return (
    <div style={container}>
      <h2>Our Services</h2>
      <ul>
        <li>🚗 Towing Assistance</li>
        <li>🔋 Battery Jump Start</li>
        <li>🛞 Tyre Repair & Replacement</li>
        <li>⛽ Emergency Fuel Delivery</li>
        <li>🔧 On-spot Mechanical Help</li>
      </ul>
    </div>
  );
}

const container = {
  padding: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: 'Segoe UI, sans-serif',
};

export default Services;
