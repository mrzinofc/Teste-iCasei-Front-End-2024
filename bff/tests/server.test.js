const request = require('supertest');
const app = require('../server'); // Certifique-se de exportar sua app no server.js

describe('YouTube API', () => {
    it('should get videos based on query', async () => {
        const response = await request(app).get('/search').query({ query: 'cats' });
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.items).toBeInstanceOf(Array);
    });
});
