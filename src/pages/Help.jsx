import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import emailjs from 'emailjs-com';

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Help() {
  const [location, setLocation] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [token, setToken] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('rvaf_user');
    if (!user) {
      setShowDialog(true);
      const interval = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        navigate('/signup');
      }, 5000);
      return;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        },
        (err) => setGeoError(err.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, [navigate]);

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        },
        (err) => setGeoError(err.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  };

  const generateToken = () => Math.floor(1000 + Math.random() * 9000);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('rvaf_user');

    if (!username || !location || !vehicle || !userPosition) {
      alert('Please complete all fields and allow location access.');
      return;
    }

    const newToken = generateToken();
    setToken(newToken);

    // Store in localStorage history
    const history = JSON.parse(localStorage.getItem('rvaf_history')) || [];
    history.push({
      name: username,
      location,
      vehicle,
      token: newToken,
      time: new Date().toLocaleString(),
      username,
      resolved: false,
    });
    localStorage.setItem('rvaf_history', JSON.stringify(history));

    // 🔔 EmailJS Integration
    emailjs.send(
      'service_0p5qmsa', // Replace with your actual service ID
      'your_template_id', // Replace with your actual template ID
      {
        to_name: 'Provider',
        message: `🚨 New Help Request:\nUser: ${username}\nLocation: ${location}\nVehicle: ${vehicle}`,
        user_email: 'rvaf.notification@email.com' // Your sender/admin email
      },
      'your_user_id_or_public_key' // Replace with your actual public key
    ).then(() => {
      console.log("✅ Email sent via EmailJS");
    }).catch((err) => {
      console.error("❌ EmailJS error:", err);
    });

    // Reset form
    setVehicle('');
    setLocation('');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      {showDialog && (
        <div style={dialogOverlay}>
          <div style={dialogBox}>
            <h3>Please Login or Signup First</h3>
            <p>To raise a help request, you must be logged in.</p>
            <p style={{ fontStyle: 'italic' }}>
              Redirecting to signup in {redirectCountdown} seconds...
            </p>
            <button onClick={() => navigate('/login')} style={btnAlt}>Go to Login</button>
            <button onClick={() => navigate('/signup')} style={btn}>Go to Signup</button>
          </div>
        </div>
      )}

      {!showDialog && (
        <>
          <h2>Raise Help Request</h2>
          <button onClick={handleGetLocation} style={btnAlt}>📍 Use My Current Location</button>

          {geoError && (
            <div style={errorBox}>
              <strong>⚠️ GPS Error:</strong> {geoError}
            </div>
          )}

          {userPosition && (
            <>
              <MapContainer
                center={userPosition}
                zoom={15}
                style={{ height: '300px', width: '100%', marginBottom: '1rem' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={userPosition}>
                  <Popup>You are here!</Popup>
                </Marker>
              </MapContainer>
              <p><strong>📍 Coordinates:</strong> {location}</p>
            </>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Your Location (lat, lon)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Vehicle Type (e.g., Car, Bike)"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              style={inputStyle}
            />
            <button type="submit" style={btn}>Request Help</button>
          </form>

          {token && (
            <div style={{ marginTop: '2rem', fontSize: '1.2rem', textAlign: 'center', color: 'green' }}>
              ✅ Request submitted! Token: <strong>{token}</strong>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Styling same as before
const dialogOverlay = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw', height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999
};

const dialogBox = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '10px',
  textAlign: 'center',
  width: '400px'
};

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '1rem'
};

const btn = {
  backgroundColor: '#2b6cb0',
  color: 'white',
  padding: '0.7rem',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer'
};

const btnAlt = {
  ...btn,
  backgroundColor: '#4a5568',
  marginTop: '1rem'
};

const errorBox = {
  backgroundColor: '#ffe5e5',
  color: '#c0392b',
  padding: '1rem',
  borderRadius: '8px',
  marginTop: '1rem'
};

export default Help;
