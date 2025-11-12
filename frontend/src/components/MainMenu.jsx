import React from 'react';

const MainMenu = ({ onCheckStatus }) => {
  return (
    <div id="main-menu">
      <div className="header-logo-image">
        <img 
          src="https://i.postimg.cc/5yhhKnTN/Logo-Lampung-Selatan-Baru-removebg-preview.png" 
          alt="Logo Balai Digital Gedung Harapan" 
        />
      </div>
      
      <p className="address">
        <strong>Balai Desa Gedung Harapan</strong><br />
        Kecamatan Jati Agung,<br />
        Kabupaten Lampung Selatan,<br />
        Provinsi Lampung
      </p>

      <div className="button-group">
        <a 
          href="https://forms.gle/6arPmZQX2wWWYLC27" 
          target="_blank" 
          rel="noopener noreferrer"
          className="main-button btn-submit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          Ajukan Permohonan Surat
        </a>
        
        <button 
          className="main-button btn-check-status"
          onClick={onCheckStatus}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Cek Status Permohonan
        </button>
      </div>

      {/* TAMBAHKAN LINK KE ADMIN DI BAWAH */}
      <div style={{ 
        marginTop: '25px', 
        padding: '15px', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #e9ecef',
        textAlign: 'center'
      }}>
        <small style={{ color: '#6c757d' }}>
          Akses Administrator? {' '}
          <a 
            href="/admin" 
            style={{ 
              color: 'var(--primary)', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Login ke Dashboard Admin
          </a>
        </small>
      </div>
    </div>
  );
};

export default MainMenu;