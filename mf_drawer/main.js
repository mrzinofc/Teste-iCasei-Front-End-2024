document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'AIzaSyCdgOWg2049C5NhI6XR7ndr5ymXdBbsB40';
    const searchBox = document.querySelector('.search-box input[type="text"]');
    const searchButton = document.querySelector('.search-icon');
    const videoGrid = document.querySelector('.video-grid');

    const videos = document.querySelectorAll('.video-box');
    const favoritesLink = document.querySelector('.link-box a[href="#favorites"]');
    const videosLink = document.querySelector('.link-box a[href="#videos"]');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Adiciona o contador no link-box do FAVORITOS
    const favoritesLinkBox = document.querySelector('.link-box a[href="#favorites"]').parentElement;
    let favoritesCounter = document.querySelector('.favorites-counter');
    if (!favoritesCounter) {
        favoritesCounter = document.createElement('span');
        favoritesCounter.classList.add('favorites-counter');
        favoritesLinkBox.appendChild(favoritesCounter);
    }

    // Marcar/desmarcar vídeo como favorito
    videos.forEach((video, idx) => {
        const favoriteButton = video.querySelector('.favorite');
        favoriteButton.addEventListener('click', function() {
            if (!favoriteButton.classList.contains('selected')) {
                favoriteButton.classList.add('selected');
                favorites.push(idx + 1); // Adiciona o vídeo aos favoritos pelo índice
            } else {
                favoriteButton.classList.remove('selected');
                const idxToRemove = favorites.indexOf(idx + 1);
                if (idxToRemove !== -1) {
                    favorites.splice(idxToRemove, 1); // Remove o vídeo dos favoritos pelo índice
                }
            }
            updateFavoritesCount();
            updateSelectedVideos();
        });
    });

    // Atualiza o número de favoritos exibido
    function updateFavoritesCount() {
        favoritesCounter.textContent = favorites.length;
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Salva os favoritos no localStorage
        updateFavoritesLink(); // Atualiza o número de favoritos no link do mf_drawer
    }

    // Atualiza os vídeos marcados como favoritos
    function updateSelectedVideos() {
        videos.forEach((video, idx) => {
            const favoriteButton = video.querySelector('.favorite');
            if (favorites.includes(idx + 1)) {
                favoriteButton.classList.add('selected');
            } else {
                favoriteButton.classList.remove('selected');
            }
        });
    }

    // Mostra apenas os vídeos marcados como favoritos quando clicado no link FAVORITOS
    favoritesLink.addEventListener('click', function(event) {
        event.preventDefault();
        videos.forEach((video, idx) => {
            const isFavorite = favorites.includes(idx + 1);
            if (isFavorite) {
                video.style.display = 'block'; // Mostra o vídeo se estiver nos favoritos
            } else {
                video.style.display = 'none'; // Esconde o vídeo se não estiver nos favoritos
            }
        });
        // Remover o parágrafo 'FAVORITOS' se já existir
        const favoritesParagraph = document.querySelector('.videos p');
        if (favoritesParagraph) {
            favoritesParagraph.remove();
        }
        // Adicionar o parágrafo 'FAVORITOS' abaixo do título 'MF_VIDEOS'
        const favoritesTitle = document.querySelector('.videos h1');
        const newParagraph = document.createElement('p');
        newParagraph.textContent = 'FAVORITOS';
        favoritesTitle.parentNode.insertBefore(newParagraph, favoritesTitle.nextSibling);
        // Esconder a caixa de busca
        document.querySelector('.search-box').style.display = 'none';
    });

    // Mostra todos os vídeos quando clicado no link VÍDEOS
    videosLink.addEventListener('click', function(event) {
        event.preventDefault();
        videos.forEach(video => {
            video.classList.remove('selected'); // Remove a marcação de favoritos
            video.style.display = 'block'; // Mostra todos os vídeos
        });
        // Mostrar a caixa de busca
        document.querySelector('.search-box').style.display = 'block';
        // Remover o parágrafo 'FAVORITOS' se existir
        const favoritesParagraph = document.querySelector('.videos p');
        if (favoritesParagraph) {
            favoritesParagraph.remove();
        }
        // Limpar os favoritos
        favorites = [];
        localStorage.removeItem('favorites');
        updateSelectedVideos(); // Atualiza a marcação de vídeos como favoritos
        updateFavoritesCount(); // Atualiza a contagem de favoritos
    });

    // Atualiza o número de favoritos no link do mf_drawer
    function updateFavoritesLink() {
        favoritesCounter.textContent = favorites.length;
    }

    // Inicializa o estado inicial dos vídeos (mostrando todos)
    updateSelectedVideos();
    updateFavoritesCount();

    // Função para buscar vídeos na API do YouTube
    async function fetchVideos(query) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${API_KEY}`);
        const data = await response.json();
        return data.items;
    }

    // Função para renderizar vídeos no grid
    function renderVideos(videos) {
        videoGrid.innerHTML = ''; // Limpar vídeos anteriores
        videos.forEach(video => {
            const videoBox = document.createElement('div');
            videoBox.classList.add('video-box');
            videoBox.innerHTML = `
                <div class="play-button" data-video-id="${video.id.videoId}">&#9658;</div>
                <div class="favorite">&#9733;</div>
            `;
            videoGrid.appendChild(videoBox);

            // Adicionar funcionalidade de clique nos botões de play e favorite
            const playButton = videoBox.querySelector('.play-button');
            const favoriteButton = videoBox.querySelector('.favorite');

            playButton.addEventListener('click', function() {
                window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank');
            });

            favoriteButton.addEventListener('click', function() {
                if (!favoriteButton.classList.contains('selected')) {
                    favoriteButton.classList.add('selected');
                    favorites.push(video.id.videoId);
                } else {
                    favoriteButton.classList.remove('selected');
                    const idxToRemove = favorites.indexOf(video.id.videoId);
                    if (idxToRemove !== -1) {
                        favorites.splice(idxToRemove, 1);
                    }
                }
                updateFavoritesCount();
                updateSelectedVideos();
            });
        });
    }

    // Adicionar evento de busca
    searchButton.addEventListener('click', async function() {
        const query = searchBox.value;
        const videos = await fetchVideos(query);
        renderVideos(videos);
    });

    // Buscar vídeos ao pressionar Enter
    searchBox.addEventListener('keyup', async function(event) {
        if (event.key === 'Enter') {
            const query = searchBox.value;
            const videos = await fetchVideos(query);
            renderVideos(videos);
        }
    });
});
