// frontend/src/services/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'
  : 'http://localhost:3001/api';

export const apiService = {
  // FIX: Ubah checkStatus menjadi checkLetterStatus untuk konsistensi
  async checkLetterStatus(nik) {
    try {
      const response = await fetch(`${API_BASE_URL}/check/${nik}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      // Convert single object to array untuk konsistensi dengan admin
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Error checking status:', error);
      throw error;
    }
  },
  
  async getAllData() {
    try {
      const response = await fetch(`${API_BASE_URL}/all`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
    }
  },
  
  async updateApplication(rowNumber, formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${rowNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },

  // NEW: Health check untuk monitoring koneksi
  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};

// Export default untuk compatibility
export default apiService;