document.addEventListener('DOMContentLoaded', function () {
    // Check if we're in a subdirectory by looking at the current path
    const path = window.location.pathname;
    const isInPagesDir = path.includes('/pages/');
    const prefix = isInPagesDir ? '../' : '';

    // Load and process header
    fetch(prefix + 'header.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load header');
            return response.text();
        })
        .then(data => {
            // Replace placeholders with correct paths
            data = data.replace(/FAVICON_PATH/g, prefix + 'assets/favicon/favicon.ico')
                .replace(/STYLE_PATH/g, prefix + 'styles.css');

            // Insert the processed header content into the head
            const headerContent = new DOMParser().parseFromString(data, 'text/html');
            const elements = headerContent.head.children;
            for (let element of elements) {
                // Check if element with same ID already exists
                const existingElement = document.head.querySelector(`[href="${element.getAttribute('href')}"]`);
                if (!existingElement) {
                    document.head.appendChild(element.cloneNode(true));
                }
            }
        })
        .catch(error => console.error('Error loading header:', error));

    // Load navigation
    fetch(prefix + 'nav.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load navigation');
            return response.text();
        })
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;

            // Update navigation links if in pages directory
            if (isInPagesDir) {
                document.querySelectorAll('#nav-placeholder a').forEach(link => {
                    if (link.getAttribute('href') === 'index.html') {
                        link.setAttribute('href', '../index.html');
                    } else if (link.getAttribute('href').startsWith('pages/')) {
                        link.setAttribute('href', link.getAttribute('href').replace('pages/', ''));
                    }
                });
            }
        })
        .catch(error => console.error('Error loading navigation:', error));
});