const axios = require('axios');

const API_KEY = 'AIzaSyCdgOWg2049C5NhI6XR7ndr5ymXdBbsB40';

// Função para buscar vídeos no YouTube
async function searchVideos(query) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        q: query,
        key: API_KEY
      }
    });
    return response.data.items;
  } catch (error) {
    console.error('Erro ao buscar vídeos do YouTube:', error);
    throw new Error('Erro ao buscar vídeos do YouTube');
  }
}

module.exports = {
  searchVideos
};
