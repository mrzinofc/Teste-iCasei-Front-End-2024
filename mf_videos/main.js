document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-box input[type="text"]');
    const videoGrid = document.querySelector('.video-grid');
    const favoriteVideoGrid = document.querySelector('.favorite-video-grid');
    const favoritesCount = document.querySelector('.favorites-count');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Event listener para o formulário de busca
    if (searchInput) {
        searchInput.addEventListener('input', function(event) {
            const searchQuery = event.target.value.trim();
            if (searchQuery !== '') {
                searchVideos(searchQuery);
            } else {
                // Se o campo de busca estiver vazio, carrega os favoritos
                if (favorites.length > 0) {
                    displayFavoriteVideos();
                } else {
                    videoGrid.innerHTML = ''; // Limpa a grade de vídeos
                }
            }
        });
    }

    // Função para buscar vídeos na API do YouTube
    function searchVideos(query) {
        const apiKey = 'YOUR_YOUTUBE_API_KEY';
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayVideos(data.items);
            })
            .catch(error => console.error('Erro ao buscar vídeos:', error));
    }

    // Função para exibir os vídeos na grade de vídeos
    function displayVideos(videos) {
        videoGrid.innerHTML = ''; // Limpa o conteúdo atual da grade de vídeos

        videos.forEach(video => {
            const videoBox = createVideoBox(video);
            videoGrid.appendChild(videoBox);
        });
    }

    // Função para criar o elemento de vídeo na grade de vídeos
    function createVideoBox(videoData) {
        const videoId = videoData.id.videoId;
        const videoTitle = videoData.snippet.title;
        const videoThumbnail = videoData.snippet.thumbnails.medium.url;

        const videoBox = document.createElement('div');
        videoBox.classList.add('video-box');
        videoBox.setAttribute('data-video-id', videoId);

        const thumbnail = document.createElement('img');
        thumbnail.src = videoThumbnail;
        thumbnail.alt = videoTitle;
        videoBox.appendChild(thumbnail);

        const playButton = document.createElement('div');
        playButton.classList.add('play-button');
        playButton.innerHTML = '<i class="fa fa-play"></i>';
        playButton.addEventListener('click', function() {
            playVideo(videoId);
        });
        videoBox.appendChild(playButton);

        const favoriteButton = document.createElement('div');
        favoriteButton.classList.add('favorite');
        if (favorites.includes(videoId)) {
            favoriteButton.classList.add('selected');
        }
        favoriteButton.innerHTML = '<i class="fa fa-star"></i>';
        favoriteButton.addEventListener('click', function() {
            toggleFavorite(videoId);
        });
        videoBox.appendChild(favoriteButton);

        return videoBox;
    }

    // Função para reproduzir o vídeo
    function playVideo(videoId) {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }

    // Função para adicionar/remover vídeo dos favoritos
    function toggleFavorite(videoId) {
        const index = favorites.indexOf(videoId);
        if (index === -1) {
            favorites.push(videoId);
        } else {
            favorites.splice(index, 1);
        }
        updateFavoritesCount();
        updateFavoriteButtons();
    }

    // Função para atualizar a contagem de favoritos
    function updateFavoritesCount() {
        favoritesCount.textContent = favorites.length;
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Função para atualizar o estado dos botões de favoritos
    function updateFavoriteButtons() {
        const allVideoBoxes = document.querySelectorAll('.video-box');
        allVideoBoxes.forEach(videoBox => {
            const videoId = videoBox.getAttribute('data-video-id');
            const favoriteButton = videoBox.querySelector('.favorite');
            if (favorites.includes(videoId)) {
                favoriteButton.classList.add('selected');
            } else {
                favoriteButton.classList.remove('selected');
            }
        });
    }

    // Função para exibir os vídeos marcados como favoritos
    function displayFavoriteVideos() {
        favoriteVideoGrid.innerHTML = ''; // Limpa o conteúdo atual da grade de favoritos

        favorites.forEach(videoId => {
            const videoBox = createFavoriteVideoBox(videoId);
            favoriteVideoGrid.appendChild(videoBox);
        });
    }

    // Função para criar o elemento de vídeo na grade de favoritos
    function createFavoriteVideoBox(videoId) {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=YOUR_YOUTUBE_API_KEY`;
        
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                const videoData = data.items[0];
                const videoTitle = videoData.snippet.title;
                const videoThumbnail = videoData.snippet.thumbnails.medium.url;

                const videoBox = document.createElement('div');
                videoBox.classList.add('video-box');
                videoBox.setAttribute('data-video-id', videoId);

                const thumbnail = document.createElement('img');
                thumbnail.src = videoThumbnail;
                thumbnail.alt = videoTitle;
                videoBox.appendChild(thumbnail);

                const playButton = document.createElement('div');
                playButton.classList.add('play-button');
                playButton.innerHTML = '<i class="fa fa-play"></i>';
                playButton.addEventListener('click', function() {
                    playVideo(videoId);
                });
                videoBox.appendChild(playButton);

                const favoriteButton = document.createElement('div');
                favoriteButton.classList.add('favorite');
                favoriteButton.classList.add('selected');
                favoriteButton.innerHTML = '<i class="fa fa-star"></i>';
                favoriteButton.addEventListener('click', function() {
                    toggleFavorite(videoId);
                    displayFavoriteVideos(); // Atualiza a lista de favoritos após remover
                });
                videoBox.appendChild(favoriteButton);

                return videoBox;
            })
            .catch(error => console.error('Erro ao buscar vídeo por ID:', error));
    }

    // Carrega vídeos marcados como favoritos ao iniciar
    function loadFavoriteVideos() {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (storedFavorites.length > 0) {
            favorites = storedFavorites;
            updateFavoritesCount();
            displayFavoriteVideos();
        }
    }

    // Inicializa a aplicação
    loadFavoriteVideos();
});
