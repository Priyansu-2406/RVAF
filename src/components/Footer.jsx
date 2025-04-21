import React from 'react';

const Footer = () => {
  return (
    <footer style={footerContainer}>
      <div style={footerGrid}>
        {/* Company */}
        <div>
          <h4 style={columnTitle}>Company</h4>
          <ul style={linkList}>
            <li><a href="/about" style={linkStyle}>About Us</a></li>
            <li><a href="/services" style={linkStyle}>Our Services</a></li>
            <li><a href="/privacy" style={linkStyle}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Get Help */}
        <div>
          <h4 style={columnTitle}>Get Help</h4>
          <ul style={linkList}>
            <li><a href="/faq" style={linkStyle}>FAQ</a></li>
            <li><a href="/payment-options" style={linkStyle}>Payment Options</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 style={columnTitle}>Follow Us</h4>
          <div style={socialIcons}>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/x--v1.png" alt="X" style={iconImg} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/facebook-new.png" alt="Facebook" style={iconImg} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/instagram-new.png" alt="Instagram" style={iconImg} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/youtube-play.png" alt="YouTube" style={iconImg} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/ios-filled/32/ffffff/linkedin.png" alt="LinkedIn" style={iconImg} />
            </a>
          </div>
          <p style={{ marginTop: '1rem', color: '#cbd5e1' }}>
            📍 Barhampur, Odisha<br />
            📧 <a href="mailto:rvaf.support@gmail.com" style={linkStyle}>rvaf.support@gmail.com</a><br />
            📞 +91 7258852660
          </p>
        </div>
      </div>

      {/* Footer bottom */}
      <div style={footerBottom}>
        <p>© 2025 RVAF. All rights reserved.</p>
      </div>

      {/* Hover style for icons */}
      <style>{hoverStyle}</style>
    </footer>
  );
};

// Styles
const footerContainer = {
  backgroundColor: '#1a1a1a',
  color: 'white',
  padding: '3rem 2rem',
  fontFamily: 'Segoe UI, sans-serif',
};

const footerGrid = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const columnTitle = {
  fontSize: '1.1rem',
  marginBottom: '1rem',
  borderBottom: '2px solid #f43f5e',
  display: 'inline-block',
  paddingBottom: '4px',
};

const linkList = {
  listStyle: 'none',
  padding: 0,
  lineHeight: '2rem',
};

const linkStyle = {
  color: 'inherit',
  textDecoration: 'none',
};

const socialIcons = {
  display: 'flex',
  gap: '1rem',
  marginTop: '0.5rem',
};

const iconImg = {
  filter: 'brightness(1)',
  transition: 'transform 0.3s, filter 0.3s',
};

const hoverStyle = `
  img:hover {
    transform: scale(1.15);
    filter: brightness(2);
  }
`;

const footerBottom = {
  textAlign: 'center',
  marginTop: '3rem',
  borderTop: '1px solid #333',
  paddingTop: '1rem',
  fontSize: '0.9rem',
  color: '#cbd5e1',
};

export default Footer;
