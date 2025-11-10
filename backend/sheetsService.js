const { google } = require('googleapis');

class SheetsService {
  constructor() {
    this.auth = null;
    this.sheets = null;
    this.spreadsheetId = null;
    this.sheetName = 'Form Responses 1';
    
    this.init();
  }

  async init() {
    try {
      // Authenticate dengan Service Account
      this.auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
      
      // GANTI DENGAN SPREADSHEET ID ANDA
      this.spreadsheetId = '109UUvGWQgD-uFfvOjbMipJWPs3eRv-zHTU_PGsv8Vu8';
      
      console.log('Google Sheets API berhasil diinisialisasi');
    } catch (error) {
      console.error('Error inisialisasi Sheets API:', error);
      throw error;
    }
  }

  // Ambil semua data aplikasi
  async getAllApplications() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${this.sheetName}!A:S`, // Kolom A sampai S
      });

      const rows = response.data.values;
      
      if (!rows || rows.length === 0) {
        return [];
      }

      // Header row (kolom pertama)
      const headers = rows[0];
      
      // Data rows (mulai dari row 2)
      const data = rows.slice(1).map((row, index) => {
        const obj = {
          rowNumber: index + 2, // +2 karena header + 1-based indexing
        };
        
        headers.forEach((header, colIndex) => {
          obj[header] = row[colIndex] || '';
        });
        
        return obj;
      });

      return data;
    } catch (error) {
      console.error('Error mengambil data dari Sheets:', error);
      throw error;
    }
  }

  // Cek status berdasarkan NIK
  async checkLetterStatus(nik) {
    try {
      const allData = await this.getAllApplications();
      
      // Cari data yang sesuai dengan NIK
      const result = allData.find(item => 
        item.NIK && item.NIK.toString() === nik.toString()
      );

      return result || null;
    } catch (error) {
      console.error('Error mencari status surat:', error);
      throw error;
    }
  }

  // Update aplikasi berdasarkan row number
  async updateApplication(rowNumber, status, kehadiran, catatan) {
    try {
      // Mapping kolom yang akan diupdate
      // P: Hari_Proses (16), Q: Status (17), R: Kehadiran_Wajib (18), S: Catatan_Admin (19)
      const range = `${this.sheetName}!P${rowNumber}:S${rowNumber}`;
      
      const values = [
        [
          new Date().toLocaleDateString('id-ID'), // Hari_Proses (otomatis tanggal update)
          status || '',
          kehadiran || '',
          catatan || ''
        ]
      ];

      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: range,
        valueInputOption: 'RAW',
        requestBody: {
          values: values,
        },
      });

      console.log('Data berhasil diupdate:', response.data);
      return { success: true, message: 'Data berhasil diupdate' };
    } catch (error) {
      console.error('Error update data:', error);
      throw error;
    }
  }
}

module.exports = new SheetsService();