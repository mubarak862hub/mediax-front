document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const contentId = params.get('content');
    const video = document.getElementById('videoPlayer');
    const titleEl = document.getElementById('playerTitle');
    const saveBtn = document.getElementById('saveProgressBtn');
    const clearBtn = document.getElementById('clearProgressBtn');
    const progressInfo = document.getElementById('progressInfo');

    function fmtTime(s) {
        if (!s) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    }

    async function loadProgress() {
        if (!window.MediaApi || !contentId) return;
        const prog = await window.MediaApi.getProgress(contentId);
        if (prog && prog.position) {
            video.currentTime = Math.min(prog.position, video.duration || prog.position);
            progressInfo.textContent = `تم الاستئناف من ${fmtTime(prog.position)}`;
        } else {
            progressInfo.textContent = '';
        }
    }

    async function saveProgress() {
        if (!window.MediaApi || !contentId) return;
        await window.MediaApi.saveProgress(contentId, Math.floor(video.currentTime));
        progressInfo.textContent = `تم الحفظ عند ${fmtTime(video.currentTime)}`;
        window.MediaX && window.MediaX.showNotification && window.MediaX.showNotification('تم حفظ التقدم', 'success');
    }

    saveBtn.addEventListener('click', saveProgress);
    clearBtn.addEventListener('click', async function () {
        if (!window.MediaApi || !contentId) return;
        await window.MediaApi.saveProgress(contentId, 0);
        video.currentTime = 0;
        progressInfo.textContent = '';
        window.MediaX && window.MediaX.showNotification && window.MediaX.showNotification('تم إعادة البدء', 'info');
    });

    // autosave every 15 seconds
    let autosaveInterval = setInterval(function () {
        if (video && !video.paused && contentId && window.MediaApi) {
            window.MediaApi.saveProgress(contentId, Math.floor(video.currentTime));
        }
    }, 15000);

    // set title from seeded data if available
    if (contentId) {
        const el = document.querySelector(`[data-id="${contentId}"]`);
        if (el) titleEl.textContent = el.querySelector('.card-title')?.textContent || 'المحتوى';
    }

    // when metadata loads, try to apply saved progress
    video.addEventListener('loadedmetadata', function () {
        loadProgress();
    });

    // cleanup
    window.addEventListener('beforeunload', function () {
        clearInterval(autosaveInterval);
    });
});
