// frontend/src/App.jsx
import React, { useState } from 'react';
// ✅ PERBAIKI IMPORT - dari folder components
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import './styles/globals.css';

function App() {
  const [currentMode, setCurrentMode] = useState('user');

  return (
    <div className="App">
      {/* Mode Switcher */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        background: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <label>
          Mode: 
          <select 
            value={currentMode} 
            onChange={(e) => setCurrentMode(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="user">User (Warga)</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      </div>

      {currentMode === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}

export default App;