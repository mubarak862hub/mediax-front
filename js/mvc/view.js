// MVC View - rendering helpers
const MVCView = (function () {
    function makeCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card';
        if (item.id) card.dataset.id = item.id;
        if (item.genre) card.dataset.genre = item.genre;
        if (item.year) card.dataset.year = item.year;

        const imgUrl = `https://picsum.photos/seed/${encodeURIComponent(item.imageSeed || item.id || 'placeholder')}/300/450`;

        card.innerHTML = `
            <div class="card-image">
                <img data-src="${imgUrl}" alt="${item.title || ''}">
                <div class="card-overlay">
                    <button class="play-btn"></button>
                    <div class="card-actions">
                        <button class="action-btn" title="أضف للقائمة"></button>
                        <button class="action-btn" title="المفضلة"></button>
                    </div>
                </div>
                <span class="card-badge">${item.quality || ''}</span>
            </div>
            <div class="card-info">
                <h4 class="card-title">${item.title || ''}</h4>
                <div class="card-meta">
                    <span class="rating">${item.rating || ''}</span>
                    <span class="year">${item.year || ''}</span>
                </div>
            </div>
        `;

        return card;
    }

    function renderInto(container, items, max = 12) {
        if (!container) return;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < Math.min(max, items.length); i++) {
            fragment.appendChild(makeCard(items[i]));
        }
        container.appendChild(fragment);
    }

    return { makeCard, renderInto };
})();

window.MVCView = MVCView;
