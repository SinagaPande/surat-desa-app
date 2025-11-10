import React, { useState } from 'react';

const EditModal = ({ application, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    status: application?.status || 'DIPROSES',
    kehadiran: application?.kehadiranWajib || 'Tidak',
    catatan: application?.catatanAdmin || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen || !application) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await onUpdate(application.rowNumber, formData);
      setMessage('success:Berhasil! Memuat ulang data...');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      setMessage(`error:Gagal: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [messageType, messageText] = message.split(':');

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Update Status Permohonan</h2>
        <p style={{ fontWeight: 600 }}>Nama: {application.nama}</p>
        <p style={{ fontSize: '0.9rem', marginTop: '-5px', color: 'var(--text-medium)' }}>
          Jenis Surat: {application.jenisSurat}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label htmlFor="modal-status">Status Saat Ini</label>
            <select 
              id="modal-status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="DIPROSES">DIPROSES</option>
              <option value="SELESAI">SELESAI / SIAP DIAMBIL</option>
              <option value="DITOLAK">DITOLAK / PERLU PERBAIKAN</option>
              <option value="BATAL">BATAL</option>
            </select>
          </div>

          <div className="modal-form-group">
            <label htmlFor="modal-kehadiran">Kehadiran Wajib?</label>
            <select 
              id="modal-kehadiran"
              value={formData.kehadiran}
              onChange={(e) => handleInputChange('kehadiran', e.target.value)}
            >
              <option value="Tidak">Tidak</option>
              <option value="Wajib">Wajib</option>
            </select>
          </div>

          <div className="modal-form-group">
            <label htmlFor="modal-catatan-admin">
              Catatan Admin (Wajib diisi jika DITOLAK/BATAL)
            </label>
            <textarea 
              id="modal-catatan-admin"
              rows="3" 
              placeholder="Contoh: Dokumen KK/KTP belum diunggah. Atau: Silakan ambil di kantor desa."
              value={formData.catatan}
              onChange={(e) => handleInputChange('catatan', e.target.value)}
            />
          </div>

          {message && (
            <div className={`global-message ${messageType}`} style={{ marginBottom: '15px' }}>
              {messageText}
            </div>
          )}

          <button 
            type="submit"
            className="btn-modal-update"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner" style={{ borderTopColor: 'white' }}></span>
                Menyimpan...
              </>
            ) : (
              'Simpan Perubahan'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;