// frontend/src/pages/Admin/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';
import ApplicationCard from './ApplicationCard';
import EditModal from './EditModal';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pollingRef = useRef(null);

  // NEW: Real-time polling untuk admin
  const startPolling = () => {
    // Stop existing polling
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    // Start new polling setiap 5 detik (lebih cepat untuk admin)
    pollingRef.current = setInterval(async () => {
      try {
        const data = await apiService.getAllData();
        setApplications(data);
      } catch (error) {
        console.log('Admin polling error:', error.message);
        // Silent error untuk polling
      }
    }, 5000); // 5 detik
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  // Cleanup polling
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setMessage('');
      const data = await apiService.getAllData();
      setApplications(data);
      
      // START polling setelah load pertama
      startPolling();
    } catch (error) {
      setMessage(`Error: Gagal memuat data. Periksa koneksi server. Detail: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleEditApplication = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleUpdateApplication = async (rowNumber, formData) => {
    await apiService.updateApplication(rowNumber, formData);
    // Manual reload setelah update untuk immediate feedback
    await loadApplications();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-logo-image">
          <img 
            src="https://i.postimg.cc/5yhhKnTN/Logo-Lampung-Selatan-Baru-removebg-preview.png" 
            alt="Logo Desa" 
          />
        </div>
        <h1>Dashboard Administrasi Surat</h1>
        <p>Kelola dan perbarui status permohonan surat masuk. 
          <span style={{fontSize: '0.9em', opacity: 0.8}}> 🔄 Data real-time</span>
        </p>
      </div>

      {message && (
        <div className={`global-message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="list-container">
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-medium)' }}>
            <span className="loading-spinner"></span> Memuat data...
          </div>
        ) : applications.length === 0 ? (
          <div className="global-message">
            Belum ada data permohonan yang masuk.
          </div>
        ) : (
          applications
            .sort((a, b) => b.rowNumber - a.rowNumber)
            .map((application) => (
              <ApplicationCard
                key={application.rowNumber}
                application={application}
                onEdit={handleEditApplication}
              />
            ))
        )}
      </div>

      <EditModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateApplication}
      />
    </div>
  );
};

export default AdminDashboard;