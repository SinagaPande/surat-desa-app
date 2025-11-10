const API_BASE = '/api';

export const apiService = {
  // === ADMIN FUNCTIONS ===
  async getAllApplications() {
    try {
      const response = await fetch(`${API_BASE}/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  async updateApplication(rowNumber, status, kehadiran, catatan) {
    try {
      const response = await fetch(`${API_BASE}/update/${rowNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          kehadiran,
          catatan
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },

  // === USER FUNCTIONS ===
  async checkLetterStatus(nik) {
    try {
      const response = await fetch(`${API_BASE}/check/${nik}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking status:', error);
      throw error;
    }
  }
};