document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('search');

  searchBtn.addEventListener('click', () => {
      const query = searchInput.value;
      fetch(`/search?query=${query}`)
          .then(response => response.json())
          .then(data => {
              const videos = data.items;
              const videoContainer = document.getElementById('videos');
              videoContainer.innerHTML = '';
              videos.forEach(video => {
                  const videoDiv = document.createElement('div');
                  videoDiv.className = 'video';
                  videoDiv.innerHTML = `
                      <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
                      <h3>${video.snippet.title}</h3>
                      <button class="favoriteBtn" data-id="${video.id.videoId}">⭐</button>
                  `;
                  videoContainer.appendChild(videoDiv);
              });

              const favoriteBtns = document.querySelectorAll('.favoriteBtn');
              favoriteBtns.forEach(btn => {
                  btn.addEventListener('click', () => {
                      const videoId = btn.dataset.id;
                      if (btn.classList.contains('favorited')) {
                          btn.classList.remove('favorited');
                          removeFavorite(videoId);
                      } else {
                          btn.classList.add('favorited');
                          addFavorite(videoId);
                      }
                  });
              });
          });
  });
});

function addFavorite(videoId) {
  // Adicionar lógica para adicionar aos favoritos
}

function removeFavorite(videoId) {
  // Adicionar lógica para remover dos favoritos
}
