import React, { useState } from 'react';
import { apiService } from '../services/api';
import MainMenu from './MainMenu';
import StatusCheck from './StatusCheck';
import StatusCard from './StatusCard';

const UserDashboard = () => {
  const [currentView, setCurrentView] = useState('main-menu');
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckStatus = () => {
    setCurrentView('status-check');
    setMessage('');
    setApplications([]);
  };

  const handleBackToMenu = () => {
    setCurrentView('main-menu');
    setMessage('');
    setApplications([]);
  };

  const handleSearch = async (nik) => {
    try {
      setIsLoading(true);
      setMessage('');
      setApplications([]);

      const result = await apiService.checkLetterStatus(nik);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        // Backend mengembalikan object, kita perlu array
        const applicationsArray = Array.isArray(result) ? result : [result];
        
        if (applicationsArray.length === 0) {
          setMessage({ 
            type: 'error', 
            text: 'Data permohonan tidak ditemukan, pastikan NIK Anda benar.' 
          });
        } else {
          setMessage({ 
            type: 'success', 
            text: `Ditemukan ${applicationsArray.length} permohonan surat!` 
          });
          setApplications(applicationsArray);
        }
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: `Gagal berkomunikasi dengan server. Coba lagi: ${error.message}` 
      });
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