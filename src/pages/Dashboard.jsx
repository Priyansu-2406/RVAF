import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebasecomponent/firebase';

// 🔁 Routing component
function Routing({ from, to }) {
  const map = useMap();
  const controlRef = useRef(null);

  useEffect(() => {
    if (!map || !from || !to) return;

    const control = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      routeWhileDragging: false,
      addWaypoints: false,
      createMarker: () => null
    }).addTo(map);

    controlRef.current = control;

    return () => {
      if (map && controlRef.current && map.hasLayer(controlRef.current)) {
        map.removeControl(controlRef.current);
      }
    };
  }, [map, from, to]); // 🟢 re-render on location change

  return null;
}

function Dashboard() {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showMapIndex, setShowMapIndex] = useState(null);
  const [providerLocation, setProviderLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const user = localStorage.getItem('rvaf_user');
    const userRole = localStorage.getItem('rvaf_role');

    if (!user || !userRole) {
      navigate('/login');
      return;
    }

    setUsername(user);
    setRole(userRole);

    if (userRole === 'provider') {
      // 🟢 Watch live GPS location
      const watchId = navigator.geolocation.watchPosition(
        pos => {
          setProviderLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        err => {
          console.error("❌ Provider location fetch failed:", err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      // 🔁 Fetch unresolved requests from Firestore
      const unsub = onSnapshot(collection(db, 'help_requests'), (snapshot) => {
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(req => !req.resolved);
        setRequests(data);
      });

      // 🧼 Cleanup
      return () => {
        navigator.geolocation.clearWatch(watchId);
        unsub();
      };
    }
  }, [currentUser, navigate]);

  const openTokenDialog = (request) => {
    setSelectedRequest(request);
    setTokenInput('');
    setShowModal(true);
  };

  const handleTokenSubmit = async () => {
    if (!selectedRequest || tokenInput !== selectedRequest.token.toString()) {
      alert('❌ Invalid token. Request not resolved.');
      return;
    }

    try {
      const ref = doc(db, 'help_requests', selectedRequest.id);
      await updateDoc(ref, {
        resolved: true,
        resolvedBy: username
      });

      setShowModal(false);
    } catch (err) {
      console.error('❌ Error updating Firestore:', err.message);
      alert('Failed to mark request as resolved.');
    }
  };

  const parseLatLng = (locationStr) => {
    const [lat, lon] = locationStr.split(',').map(Number);
    return [lat, lon];
  };

  if (!currentUser) {
    return <p style={{ padding: '2rem', color: 'red' }}>🔒 Please log in to access the dashboard.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Welcome, {username}! 👋</h2>
      <p style={{ fontSize: '1rem', color: '#4a5568' }}>
        You're logged in as a <strong>{role.toUpperCase()}</strong>.
      </p>
      <hr style={{ margin: '1rem 0' }} />

      {role === 'provider' && (
        <>
          <h3>Unresolved Help Requests</h3>
          {requests.length === 0 ? (
            <p>No unresolved requests right now 🚗</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {requests.map((req, index) => (
                <li key={req.id} style={cardStyle}>
                  <p><strong>User:</strong> {req.name}</p>
                  <p><strong>Location:</strong> {req.location}</p>
                  <p><strong>Vehicle:</strong> {req.vehicle}</p>
                  <p><strong>Time:</strong> {req.time}</p>
                  <button onClick={() => openTokenDialog(req)} style={resolveBtn}>
                    Mark as Resolved
                  </button>
                  <button onClick={() => setShowMapIndex(showMapIndex === index ? null : index)} style={mapBtn}>
                    {showMapIndex === index ? "Hide Route" : "View Route"}
                  </button>
                  {showMapIndex === index && providerLocation && (
                    <div style={{ marginTop: '1rem' }}>
                      <MapContainer
                        center={providerLocation}
                        zoom={13}
                        style={{ height: '300px', width: '100%' }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; OpenStreetMap contributors'
                        />
                        <Routing from={providerLocation} to={parseLatLng(req.location)} />
                      </MapContainer>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {showModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h3>Verify Token</h3>
            <p>Please enter the 4-digit token number given by the user.</p>
            <input
              type="text"
              placeholder="Enter token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              style={inputStyle}
              maxLength={4}
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
              <button onClick={handleTokenSubmit} style={submitBtn}>Verify & Resolve</button>
              <button onClick={() => setShowModal(false)} style={cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles (unchanged)
const cardStyle = {
  background: '#edf2f7',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  marginBottom: '1.5rem'
};

const resolveBtn = {
  marginTop: '0.5rem',
  padding: '0.5rem 1rem',
  backgroundColor: '#38a169',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginRight: '0.5rem'
};

const mapBtn = {
  ...resolveBtn,
  backgroundColor: '#3182ce'
};

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw', height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999
};

const modalBox = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  width: '400px',
  textAlign: 'center',
  fontFamily: 'Segoe UI, sans-serif'
};

const inputStyle = {
  padding: '0.75rem',
  width: '100%',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginTop: '1rem'
};

const submitBtn = {
  backgroundColor: '#2b6cb0',
  color: 'white',
  padding: '0.6rem 1.4rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600'
};

const cancelBtn = {
  backgroundColor: '#a0aec0',
  color: 'white',
  padding: '0.6rem 1.4rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600'
};

export default Dashboard;
