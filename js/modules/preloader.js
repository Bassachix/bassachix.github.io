export function initPreloader() {
    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Add a slight delay for cinematic effect
            setTimeout(() => {
                preloader.classList.add('fade-out');
                
                // Remove from DOM after fade transition completes
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500); // matches the 0.5s CSS transition
            }, 300);
        }
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        hidePreloader();
    } else {
        window.addEventListener('DOMContentLoaded', hidePreloader);
        window.addEventListener('load', hidePreloader);
        // Fallback in case of weird browser caching states
        setTimeout(hidePreloader, 3000);
    }
}
