import React from 'react';

function FAQ() {
  return (
    <div style={container}>
      <h2>Frequently Asked Questions</h2>
      <ul>
        <li><strong>How does RVAF work?</strong> — You raise a request, and nearby providers are notified immediately.</li>
        <li><strong>Is it free?</strong> — Yes, using the platform is free. You pay the provider directly.</li>
        <li><strong>Is my data secure?</strong> — Absolutely. We never share or sell your information.</li>
      </ul>
    </div>
  );
}

const container = {
  padding: '2rem',
  maxWidth: '800px',
  margin: '0 auto',
  fontFamily: 'Segoe UI, sans-serif'
};

export default FAQ;
