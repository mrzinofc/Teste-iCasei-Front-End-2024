document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.video-box');
    const favoritesCount = document.querySelector('.favorites-count');
    const favoritesLink = document.querySelector('.link-box.favorites a');
    const favorites = [];

    videos.forEach((video, idx) => {
        const favoriteButton = video.querySelector('.favorite');
        favoriteButton.addEventListener('click', function() {
            if (!favoriteButton.classList.contains('selected')) {
                favoriteButton.classList.add('selected');
                favorites.push(`Vídeo ${idx + 1}`);
            } else {
                favoriteButton.classList.remove('selected');
                const idxToRemove = favorites.indexOf(`Vídeo ${idx + 1}`);
                if (idxToRemove !== -1) {
                    favorites.splice(idxToRemove, 1);
                }
            }
            updateFavoritesCount();
            updateSelectedVideos();
        });
    });

    function updateFavoritesCount() {
        favoritesCount.textContent = favorites.length;
    }

    function updateSelectedVideos() {
        videos.forEach((video, idx) => {
            const favoriteButton = video.querySelector('.favorite');
            if (favorites.includes(`Vídeo ${idx + 1}`)) {
                video.classList.add('selected');
            } else {
                video.classList.remove('selected');
            }
        });
    }
});
