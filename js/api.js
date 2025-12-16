// MediaX - Frontend API adapter (mock)
// Provides a small wrapper around localStorage to persist favorites, watchlist and watch progress.
(function () {
    const KEY_FAV = 'mediax_favorites';
    const KEY_LIST = 'mediax_watchlist';
    const KEY_HISTORY = 'mediax_history';

    function load(key) {
        try {
            return JSON.parse(localStorage.getItem(key) || '[]');
        } catch (e) {
            return [];
        }
    }

    function save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function simulate(delay = 200) {
        return new Promise((resolve) => setTimeout(resolve, delay));
    }

    window.MediaApi = {
        async toggleFavorite(id) {
            if (!id) throw new Error('missing id');
            await simulate();
            const fav = load(KEY_FAV);
            const exists = fav.includes(id);
            if (exists) {
                const next = fav.filter(x => x !== id);
                save(KEY_FAV, next);
                return false;
            } else {
                fav.push(id);
                save(KEY_FAV, fav);
                return true;
            }
        },

        async isFavorited(id) {
            return load(KEY_FAV).includes(id);
        },

        async toggleWatchlist(id) {
            if (!id) throw new Error('missing id');
            await simulate();
            const list = load(KEY_LIST);
            const exists = list.includes(id);
            if (exists) {
                const next = list.filter(x => x !== id);
                save(KEY_LIST, next);
                return false;
            } else {
                list.push(id);
                save(KEY_LIST, list);
                return true;
            }
        },

        async isInWatchlist(id) {
            return load(KEY_LIST).includes(id);
        },

        async getFavorites() {
            await simulate(50);
            return load(KEY_FAV);
        },

        async getWatchlist() {
            await simulate(50);
            return load(KEY_LIST);
        },

        async saveProgress(id, position) {
            if (!id) throw new Error('missing id');
            const history = load(KEY_HISTORY);
            const idx = history.findIndex(h => h.id === id);
            if (idx >= 0) {
                history[idx].position = position;
                history[idx].updated = Date.now();
            } else {
                history.push({ id, position, updated: Date.now() });
            }
            save(KEY_HISTORY, history);
            return true;
        },

        async getProgress(id) {
            const history = load(KEY_HISTORY);
            const item = history.find(h => h.id === id);
            return item ? item.position : 0;
        }
    };

})();
