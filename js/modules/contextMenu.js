export function initContextMenu() {
    // Create the context menu element
    const menu = document.createElement('div');
    menu.className = 'custom-context-menu';
    menu.innerHTML = `
        <div class="context-menu-item" id="ctx-music">
            <i class="fa-solid fa-music"></i> <span>Play / Pause Music</span>
        </div>
        <div class="context-menu-separator"></div>
        <div class="context-menu-item" id="ctx-copy">
            <i class="fa-solid fa-link"></i> <span>Copy Portfolio Link</span>
        </div>
    `;
    document.body.appendChild(menu);

    // Prevent default right-click and show custom menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        // Calculate position to prevent going off-screen
        let x = e.clientX;
        let y = e.clientY;
        const menuWidth = 220; // approximate width
        const menuHeight = 150; // approximate height
        
        if (x + menuWidth > window.innerWidth) {
            x -= menuWidth;
        }
        if (y + menuHeight > window.innerHeight) {
            y -= menuHeight;
        }

        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        menu.classList.add('active');
    });

    // Hide menu on click outside or escape
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menu.classList.remove('active');
        }
    });

    // Handle menu actions
    document.getElementById('ctx-music').addEventListener('click', () => {
        const audioToggle = document.getElementById('audio-toggle');
        if (audioToggle) audioToggle.click();
        menu.classList.remove('active');
    });

    document.getElementById('ctx-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            // Flash success state
            const icon = document.querySelector('#ctx-copy i');
            const originalClass = icon.className;
            icon.className = 'fa-solid fa-check';
            icon.style.color = '#00ff00';
            setTimeout(() => {
                icon.className = originalClass;
                icon.style.color = '';
                menu.classList.remove('active');
            }, 1000);
        });
    });
}
