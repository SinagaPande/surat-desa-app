import React, { useState } from 'react';

const StatusCheck = ({ onBack, onSearch }) => {
  const [nik, setNik] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNikChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    setNik(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nik || nik.length !== 16) {
      alert('NIK harus 16 digit angka.');
      return;
    }

    setIsLoading(true);
    await onSearch(nik);
    setIsLoading(false);
  };

  return (
    <div id="status-check">
      <a className="back-link" onClick={onBack}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Kembali ke Menu Utama
      </a>
      
      <h1>Cek Status Permohonan</h1>
      <h2>Masukkan Nomor Induk Kependudukan (NIK) Anda.</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nik-input">Nomor Induk Kependudukan (NIK)</label>
          <input 
            type="text"
            id="nik-input"
            value={nik}
            onChange={handleNikChange}
            placeholder="Masukkan NIK 16 digit Anda"
            maxLength="16"
            inputMode="numeric"
            pattern="[0-9]{16}"
            title="NIK harus 16 digit angka."
            required
          />
        </div>
        
        <button 
          type="submit"
          className="search-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Mencari Status Permohonan...
            </>
          ) : (
            'Cari Status'
          )}
        </button>
      </form>
    </div>
  );
};

export default StatusCheck;