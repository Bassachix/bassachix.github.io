export function initTime() {
    const timeElement = document.getElementById('local-time');
    let lastHour = -1;

    function updateTime() {
        const now = new Date();
        const hours = now.getHours();
        
        if (timeElement) {
            const displayHours = String(hours).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.textContent = `${displayHours}:${minutes}:${seconds}`;
        }

        // Dynamic Time Ambient Logic (Updates once per hour)
        if (hours !== lastHour) {
            lastHour = hours;
            updateAmbientColor(hours);
        }
    }

    function updateAmbientColor(hour) {
        const root = document.documentElement;
        
        // Do not override if the Crimson Gold Easter Egg is active
        if (root.style.getPropertyValue('--accent-start') === '#ff0055') {
            return;
        }

        // Apply theme based on time
        if (hour >= 6 && hour < 12) {
            // Morning: Fresh Cyan to Emerald Green
            root.style.setProperty('--accent-start', '#06b6d4');
            root.style.setProperty('--accent-end', '#10b981');
            root.style.setProperty('--accent-glow', 'rgba(16, 185, 129, 0.3)');
        } else if (hour >= 12 && hour < 17) {
            // Afternoon: Warm Orange to Amber
            root.style.setProperty('--accent-start', '#f59e0b');
            root.style.setProperty('--accent-end', '#f97316');
            root.style.setProperty('--accent-glow', 'rgba(249, 115, 22, 0.3)');
        } else if (hour >= 17 && hour < 20) {
            // Sunset: Pink to Purple
            root.style.setProperty('--accent-start', '#ec4899');
            root.style.setProperty('--accent-end', '#8b5cf6');
            root.style.setProperty('--accent-glow', 'rgba(236, 72, 153, 0.3)');
        } else {
            // Night: Deep Blue to Cyan (Default Theme)
            root.style.setProperty('--accent-start', '#3b82f6');
            root.style.setProperty('--accent-end', '#06b6d4');
            root.style.setProperty('--accent-glow', 'rgba(6, 182, 212, 0.3)');
        }
    }

    // Update immediately, then every second
    updateTime();
    setInterval(updateTime, 1000);
}
