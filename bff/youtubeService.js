const axios = require('axios');

// Função para buscar vídeos no YouTube
async function searchVideos(query) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        q: query,
        key: 'YOUR_YOUTUBE_API_KEY'
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
