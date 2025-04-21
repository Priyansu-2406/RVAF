import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebasecomponent/firebase';

function Signup() {
  // 🟢 Added name field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // 🟢 Use email instead of uid
      const userRef = doc(db, 'users', user.email);
      await setDoc(userRef, {
        name,
        email: user.email,
        role,
        createdAt: new Date()
      });

      localStorage.setItem('rvaf_user', email);
      localStorage.setItem('rvaf_role', role);
      alert('✅ Signup successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      alert('❌ Signup failed. Email may already be in use.');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 🟢 Use email instead of uid
      const userRef = doc(db, 'users', user.email);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          role,
          createdAt: new Date()
        });
      }

      localStorage.setItem('rvaf_user', user.email);
      localStorage.setItem('rvaf_role', role);
      alert('✅ Google signup successful!');
      navigate('/dashboard');
    } catch (error) {
      alert('❌ Google signup failed.');
      console.error(error.message);
    }
  };

  return (
    <div style={background}>
      <div style={card}>
        <h2 style={header}>Create Account 🚀</h2>

        {/* 🟢 Added Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={input}
        />

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

        <button onClick={handleSignup} style={button}>Sign Up</button>

        <p style={{ margin: '1rem 0' }}>or</p>

        <button onClick={handleGoogleSignup} style={googleBtn}>
          Sign up with Google
        </button>

        <p style={{ marginTop: '1.2rem', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#3182ce', textDecoration: 'none' }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

// Styles
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
  backgroundColor: '#38a169',
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

export default Signup;
