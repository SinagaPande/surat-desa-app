const express = require('express');
const cors = require('cors');
const sheetsService = require('./sheetsService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server backend surat desa berjalan',
    timestamp: new Date().toISOString()
  });
});

// Endpoint untuk cek status berdasarkan NIK (untuk warga)
app.get('/api/check/:nik', async (req, res) => {
  try {
    const { nik } = req.params;
    
    if (!nik) {
      return res.status(400).json({ 
        error: 'NIK harus diisi' 
      });
    }

    const result = await sheetsService.checkLetterStatus(nik);
    
    if (!result) {
      return res.status(404).json({ 
        error: 'Data tidak ditemukan untuk NIK tersebut' 
      });
    }

    // Return data yang relevan untuk warga
    const responseData = {
      nama: result.Nama,
      nik: result.NIK,
      jenisSurat: result['Jenis Surat yang Diajukan'],
      timestamp: result.Timestamp,
      status: result.Status || 'Menunggu diproses',
      hariProses: result.Hari_Proses || '',
      kehadiranWajib: result.Kehadiran_Wajib || '',
      catatanAdmin: result.Catatan_Admin || ''
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error di endpoint /check:', error);
    res.status(500).json({ 
      error: 'Terjadi kesalahan server' 
    });
  }
});

// Endpoint untuk ambil semua data (untuk admin)
app.get('/api/all', async (req, res) => {
  try {
    const allData = await sheetsService.getAllApplications();
    
    // Format data untuk admin (semua kolom)
    const formattedData = allData.map(item => ({
      rowNumber: item.rowNumber,
      timestamp: item.Timestamp,
      email: item['Email Address'],
      nama: item.Nama,
      nik: item.NIK,
      noHP: item['Nomor HP/WhatsApp'],
      alamat: item['Masukkan Alamat'],
      jenisSurat: item['Jenis Surat yang Diajukan'],
      hariProses: item.Hari_Proses || '',
      status: item.Status || 'Menunggu diproses',
      kehadiranWajib: item.Kehadiran_Wajib || '',
      catatanAdmin: item.Catatan_Admin || ''
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error di endpoint /all:', error);
    res.status(500).json({ 
      error: 'Terjadi kesalahan server' 
    });
  }
});

// Endpoint untuk update data (untuk admin)
app.put('/api/update/:row', async (req, res) => {
  try {
    const { row } = req.params;
    const { status, kehadiran, catatan } = req.body;

    if (!row) {
      return res.status(400).json({ 
        error: 'Row number harus diisi' 
      });
    }

    const result = await sheetsService.updateApplication(
      parseInt(row), 
      status, 
      kehadiran, 
      catatan
    );

    res.json(result);
  } catch (error) {
    console.error('Error di endpoint /update:', error);
    res.status(500).json({ 
      error: 'Terjadi kesalahan server' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Terjadi kesalahan internal server' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint tidak ditemukan' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
  console.log(`📊 Sheets Service: ${sheetsService.auth ? 'Terhubung' : 'Menghubungkan...'}`);
});

module.exports = app;