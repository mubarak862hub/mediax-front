// MVC Model - data access
const MVCModel = (function () {
    async function fetchSample() {
        try {
            const res = await fetch('data/sample_contents.json');
            if (!res.ok) return [];
            return await res.json();
        } catch (e) {
            console.warn('Failed to load sample data', e);
            return [];
        }
    }

    // Fetch a section-specific JSON file (movies, series, books, games)
    async function fetchSection(sectionName) {
        const path = `data/${sectionName}.json`;
        try {
            const res = await fetch(path);
            if (res.ok) return await res.json();
            // fallback to full sample and attempt to filter
        } catch (e) {
            // ignore and fallback below
        }

        // fallback: try to derive from sample_contents.json
        try {
            const all = await fetchSample();
            if (!all || !all.length) return [];
            if (sectionName === 'movies') {
                return all.filter(i => !i.type && i.id && i.id.startsWith('c'));
            }
            if (sectionName === 'series') {
                return all.filter(i => i.type === 'series' || (i.id && i.id.startsWith('s')));
            }
            if (sectionName === 'books') {
                return all.filter(i => i.quality && i.quality.toLowerCase().includes('pdf'));
            }
            if (sectionName === 'games') {
                // no explicit games in sample, pick a few items as placeholders
                return all.filter((_, idx) => idx % 4 === 0).slice(0, 6);
            }
            return [];
        } catch (e) {
            return [];
        }
    }

    // Wrap MediaApi where available
    function getApi() {
        return window.MediaApi || null;
    }

    return {
        fetchSample,
        fetchSection,
        getApi
    };
})();

window.MVCModel = MVCModel;
