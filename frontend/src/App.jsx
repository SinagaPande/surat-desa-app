// frontend/src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles/globals.css';

function App() {
  return (
    <div className="App">
      {/* Mode switcher dihapus - sekarang menggunakan route terpisah */}
      <Outlet />
    </div>
  );
}

export default App;