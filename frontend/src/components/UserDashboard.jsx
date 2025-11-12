// frontend/src/components/UserDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';
// ✅ PERBAIKI IMPORT - semua dari folder components yang sama
import MainMenu from './MainMenu';
import StatusCheck from './StatusCheck';
import StatusCard from './StatusCard';

const UserDashboard = () => {
  const [currentView, setCurrentView] = useState('main-menu');
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentNik, setCurrentNik] = useState('');
  const pollingRef = useRef(null);

  // NEW: Cleanup polling saat component unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  // NEW: Real-time polling untuk data user
  const startPolling = (nik) => {
    // Stop existing polling
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    // Start new polling setiap 10 detik
    pollingRef.current = setInterval(async () => {
      try {
        const result = await apiService.checkLetterStatus(nik);
        if (result && !result.error) {
          setApplications(Array.isArray(result) ? result : [result]);
        }
      } catch (error) {
        console.log('Polling error:', error.message);
        // Silent error untuk polling
      }
    }, 10000); // 10 detik
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const handleCheckStatus = () => {
    setCurrentView('status-check');
    setMessage('');
    setApplications([]);
    setCurrentNik('');
    stopPolling();
  };

  const handleBackToMenu = () => {
    setCurrentView('main-menu');
    setMessage('');
    setApplications([]);
    setCurrentNik('');
    stopPolling();
  };

  const handleSearch = async (nik) => {
    try {
      setIsLoading(true);
      setMessage('');
      setApplications([]);
      setCurrentNik(nik);

      const result = await apiService.checkLetterStatus(nik);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
        stopPolling();
      } else {
        const applicationsArray = Array.isArray(result) ? result : [result];
        
        if (applicationsArray.length === 0) {
          setMessage({ 
            type: 'error', 
            text: 'Data permohonan tidak ditemukan, pastikan NIK Anda benar.' 
          });
          stopPolling();
        } else {
          setMessage({ 
            type: 'success', 
            text: `Ditemukan ${applicationsArray.length} permohonan surat! Data akan diperbarui otomatis.` 
          });
          setApplications(applicationsArray);
          
          // START real-time polling setelah search berhasil
          startPolling(nik);
        }
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: `Gagal berkomunikasi dengan server. Coba lagi: ${error.message}` 
      });
      stopPolling();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {currentView === 'main-menu' && (
        <MainMenu onCheckStatus={handleCheckStatus} />
      )}
      
      {currentView === 'status-check' && (
        <StatusCheck onBack={handleBackToMenu} onSearch={handleSearch} />
      )}

      {/* Status Message */}
      {message && (
        <div id="status-message" className={message.type}>
          {message.text}
          {applications.length > 0 && (
            <div style={{ fontSize: '0.8em', marginTop: '5px', opacity: 0.8 }}>
              🔄 Data diperbarui otomatis setiap 10 detik
            </div>
          )}
        </div>
      )}

      {/* Status Results */}
      {applications.length > 0 && (
        <StatusCard applications={applications} />
      )}
    </div>
  );
};

export default UserDashboard;