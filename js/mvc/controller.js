// MVC Controller - orchestrates model + view
const MVCController = (function (model, view) {
    async function seedAll() {
        // detect page section from filename and load section-specific data when available
        const path = (location.pathname || '').split('/').pop() || '';
        let section = null;
        if (path.includes('movies')) section = 'movies';
        else if (path.includes('series')) section = 'series';
        else if (path.includes('books')) section = 'books';
        else if (path.includes('games')) section = 'games';

        const data = section ? await model.fetchSection(section) : await model.fetchSample();
        if (!data || !data.length) return;

        const containers = Array.from(document.querySelectorAll('.content-cards'))
            .concat(Array.from(document.querySelectorAll('.content-grid')));

        containers.forEach(container => {
            if (container.querySelectorAll('.content-card').length >= 8) return;
            // If page is a dedicated section, render that section's data
            view.renderInto(container, data, 12);
        });

        // initialize behaviours from main.js
        if (window.initializeLazyLoading) window.initializeLazyLoading();
        if (window.initializeCards) window.initializeCards();

        // update watchlist count if element present
        const watchlistCountEl = document.getElementById('watchlistCount');
        if (watchlistCountEl) {
            const grid = document.querySelector('#watchlistGrid') || document.querySelector('.content-grid');
            const count = grid ? grid.querySelectorAll('.content-card').length : 0;
            watchlistCountEl.textContent = `لديك ${count} عناصر في القائمة`;
        }
    }

    return { seedAll };
})(window.MVCModel, window.MVCView);

window.MVCController = MVCController;
