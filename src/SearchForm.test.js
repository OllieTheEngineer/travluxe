import axios from 'axios'


// Example test for checking 200 status of GET request
describe('GET request to /api/weather', () => {
    test('returns 200 status', async () => {
      const response = await axios.get('/api/weather/90210');
      expect(response.status).toBe(200);
    });

    test('GET restaurants API returns 200 status', async () => {
        const response = await axios.get('/api/restaurants/Los Angeles');
        expect(response.status).toBe(200);
    });
      
      test('GET touristic sites API returns 200 status', async () => {
        const response = await axios.get('/api/touristic-sites/New York');
        expect(response.status).toBe(200);
    });
  });