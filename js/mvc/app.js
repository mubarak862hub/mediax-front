// MVC App bootstrap
(function () {
    function run() {
        if (!window.MVCController) {
            console.warn('MVCController not available');
            return;
        }
        MVCController.seedAll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
