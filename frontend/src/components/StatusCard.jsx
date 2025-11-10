import React from 'react';

const StatusCard = ({ applications }) => {
  const getStatusClass = (statusText) => {
    if (!statusText) return 'status-pending';
    const lowerStatus = statusText.toLowerCase();
    if (lowerStatus.includes('selesai') || lowerStatus.includes('terbit')) {
      return 'status-Selesai';
    } else if (lowerStatus.includes('tolak') || lowerStatus.includes('batal')) {
      return 'status-Ditolak';
    }
    return 'status-pending';
  };

  const formatTanggal = (timestamp) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date)) return '-';
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      return '-';
    }
  };

  if (!applications || applications.length === 0) {
    return null;
  }

  // Sort by timestamp (newest first)
  const sortedApplications = [...applications].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="status-card">
      <div className="status-summary">
        <strong>Ditemukan {applications.length} permohonan untuk NIK ini</strong>
      </div>
      
      {sortedApplications.map((permohonan, index) => {
        const statusClass = getStatusClass(permohonan.status);
        const tanggalAjuan = formatTanggal(permohonan.timestamp);

        return (
          <div key={index} className="permohonan-item">
            <div className="permohonan-header">
              Permohonan #{applications.length - index} - Diajukan: {tanggalAjuan}
            </div>
            
            <div className="status-item">
              <span className="status-label">Jenis Surat:</span>
              <span className="status-value">{permohonan.jenisSurat || '-'}</span>
            </div>
            
            <div className="status-item">
              <span className="status-label">Lama Proses (Hari):</span>
              <span className="status-value">{permohonan.hariProses || '-'}</span>
            </div>
            
            <div className="status-item">
              <span className="status-label">Status Permohonan:</span>
              <span className={`status-value ${statusClass}`}>
                {permohonan.status || 'Belum Diproses'}
              </span>
            </div>
            
            <div className="status-item">
              <span className="status-label">Kehadiran Wajib:</span>
              <span className="status-value">{permohonan.kehadiranWajib || 'Tidak Ada'}</span>
            </div>
            
            <div className="status-item" style={{ borderBottom: 'none' }}>
              <span className="status-label">Catatan Admin:</span>
              <span className="status-value">
                {permohonan.catatanAdmin || 'Tidak ada catatan.'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusCard;