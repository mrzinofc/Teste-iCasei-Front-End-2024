document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    window.onhashchange = () => {
        const hash = location.hash.substring(1);
        if (hash === 'videos') {
            fetch('/mf_videos').then(response => response.text()).then(html => {
                content.innerHTML = html;
            });
        } else if (hash === 'favorites') {
            fetch('/mf_favorites').then(response => response.text()).then(html => {
                content.innerHTML = html;
            });
        }
    };
});
