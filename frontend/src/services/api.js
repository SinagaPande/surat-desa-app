// ✅ KONFIGURASI YANG BENAR:
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // ← GUNAKAN RELATIVE PATH di production
  : 'http://localhost:3001/api';

export const apiService = {
  async checkStatus(nik) {
    const response = await fetch(`${API_BASE_URL}/check/${nik}`);
    return await response.json();
  },
  
  async getAllData() {
    const response = await fetch(`${API_BASE_URL}/all`);
    return await response.json();
  },
  
  async updateApplication(rowNumber, data) {
    const response = await fetch(`${API_BASE_URL}/update/${rowNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
};