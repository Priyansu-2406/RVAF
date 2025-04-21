import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebasecomponent/firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('rvaf_user', email);
      localStorage.setItem('rvaf_role', role);
      navigate('/dashboard');
    } catch (error) {
      alert('❌ Login failed. Check your credentials.');
      console.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      localStorage.setItem('rvaf_user', email);
      localStorage.setItem('rvaf_role', role); // optional: you can later fetch role from Firestore
      navigate('/dashboard');
    } catch (error) {
      alert('❌ Google Sign-In failed.');
      console.error(error.message);
    }
  };

  return (
    <div style={background}>
      <div style={card}>
        <h2 style={header}>Welcome Back 👋</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={input}
        />
        <select value={role} onChange={e => setRole(e.target.value)} style={input}>
          <option value="user">User</option>
          <option value="provider">Provider</option>
        </select>

        <button onClick={handleEmailLogin} style={button}>Login</button>

        <p style={{ margin: '1rem 0' }}>or</p>

        <button onClick={handleGoogleLogin} style={googleBtn}>Sign in with Google</button>

        <p style={{ marginTop: '1.2rem', fontSize: '0.9rem' }}>
          Don’t have an account?{' '}
          <a href="/signup" style={{ color: '#3182ce', textDecoration: 'none' }}>
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

// 🔵 Styles
const background = {
  backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1600508771714-cf2cf8f6b44b")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const card = {
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '2.5rem',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  fontFamily: 'Segoe UI, sans-serif',
};

const header = {
  background: 'linear-gradient(to right, #667eea, #764ba2)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '1.8rem',
  fontWeight: '700',
  marginBottom: '2rem',
};

const input = {
  width: '100%',
  padding: '0.75rem',
  margin: '0.5rem 0',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '1rem',
  transition: '0.3s',
};

const button = {
  width: '100%',
  padding: '0.75rem',
  marginTop: '1rem',
  backgroundColor: '#2b6cb0',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: '0.3s ease',
};

const googleBtn = {
  ...button,
  backgroundColor: '#db4437',
};

export default Login;
