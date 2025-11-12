// frontend/src/services/api.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // ✅ COBA INI untuk Vercel
  : 'http://localhost:3001/api';

const apiService = {
  async checkLetterStatus(nik) {
    try {
      console.log('🔍 Checking status for NIK:', nik);
      const response = await fetch(`${API_BASE_URL}/check/${nik}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Response data:', data);
      
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('❌ Error checking status:', error);
      throw error;
    }
  },
  
  async getAllData() {
    try {
      console.log('📋 Fetching all data...');
      const response = await fetch(`${API_BASE_URL}/all`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 All data response:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching all data:', error);
      throw error;
    }
  },
  
  async updateApplication(rowNumber, formData) {
    try {
      console.log('🔄 Updating application:', rowNumber, formData);
      const response = await fetch(`${API_BASE_URL}/update/${rowNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating application:', error);
      throw error;
    }
  },

  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return false;
    }
  }
};

// ✅ EKSPORT YANG BENAR
export { apiService };
export default apiService;