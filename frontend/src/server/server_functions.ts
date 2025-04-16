export const SERVER_HOST = import.meta.env.VITE_SERVER_HOST || 'localhost';
export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 3001;
export const SERVER_API_URL = `http://${SERVER_HOST}:${SERVER_PORT}/api`;

export async function fetchData(endpoint: string = '') {
    try {
      const response = await fetch(`${SERVER_API_URL}/${endpoint}`);
      const data = await response.json();
      return data;
      // Process the data
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  