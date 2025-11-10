import React from 'react';

const ApplicationCard = ({ application, onEdit }) => {
  const statusText = application.status || '🚫 Belum digubris';
  const statusClass = `status-${statusText.toUpperCase().replace(/[^A-Z0-9]/g, '-')}`;
  
  const adminNotes = application.catatanAdmin ? (
    <p style={{ marginTop: '10px', fontStyle: 'italic', color: 'var(--danger-color)', fontSize: '0.9rem' }}>
      Catatan: {application.catatanAdmin}
    </p>
  ) : '';

  const handleEditClick = () => {
    onEdit(application);
  };

  return (
    <div className="application-card">
      <div className="card-header">
        <span className="card-name">{application.nama}</span>
        <span className="card-row-index">Baris: {application.rowNumber}</span>
      </div>
      <div className="card-body">
        <div className="card-detail-item">
          <span className="detail-label">Tanggal Ajuan:</span>
          <span className="detail-value">{application.timestamp}</span>
        </div>
        <div className="card-detail-item">
          <span className="detail-label">Jenis Surat:</span>
          <span className="detail-value">{application.jenisSurat || '-'}</span>
        </div>
        <div className="card-detail-item">
          <span className="detail-label">NIK:</span>
          <span className="detail-value">{application.nik}</span>
        </div>
        <div className="card-detail-item">
          <span className="detail-label">No. HP:</span>
          <span className="detail-value">{application.noHP || '-'}</span>
        </div>
        <div className="card-detail-item">
          <span className="detail-label">Status:</span>
          <span className="detail-value">
            <span className={`status-badge ${statusClass}`}>{statusText}</span>
          </span>
        </div>
        <div className="card-detail-item">
          <span className="detail-label">Kehadiran Wajib:</span>
          <span className="detail-value">{application.kehadiranWajib || 'Tidak'}</span>
        </div>
        {adminNotes}
      </div>
      <div className="card-footer">
        <button 
          className="btn-action btn-primary-update" 
          onClick={handleEditClick}
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;