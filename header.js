document.addEventListener('DOMContentLoaded', function () {
    // Updated to handle data/blog directory paths
    // Ensure UTF-8 charset is set first
    if (!document.head.querySelector('meta[charset]')) {
        const charsetMeta = document.createElement('meta');
        charsetMeta.setAttribute('charset', 'UTF-8');
        document.head.insertBefore(charsetMeta, document.head.firstChild);
    }

    // Check if we're in a subdirectory by looking at the current path
    const path = window.location.pathname;
    const isInPagesDir = path.includes('/pages/');
    const isInDataBlogDir = path.includes('/data/blog/');

    let prefix = '';
    if (isInPagesDir) {
        prefix = '../';
    } else if (isInDataBlogDir) {
        prefix = '../../';
    }

    // Load and process header
    fetch(prefix + 'header.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load header');
            return response.text();
        })
        .then(data => {
            // Replace placeholders with correct paths
            data = data.replace(/FAVICON_PATH/g, prefix + 'assets/favicon/favicon.ico')
                .replace(/STYLE_PATH/g, prefix + 'styles.css')
                .replace(/NAV_PATH/g, prefix + 'header.js')
                .replace(/HOME_PATH/g, prefix + 'index.html')
                .replace(/PAGES_PATH/g, isInPagesDir ? '.' : (isInDataBlogDir ? '../../pages' : 'pages'));

            // Parse the header content
            const headerContent = new DOMParser().parseFromString(data, 'text/html');

            // Add head elements
            const headElements = headerContent.head.children;
            for (let element of headElements) {
                // Check if element with same href already exists
                if (element.hasAttribute('href')) {
                    const existingElement = document.head.querySelector(`[href="${element.getAttribute('href')}"]`);
                    if (!existingElement) {
                        document.head.appendChild(element.cloneNode(true));
                    }
                } else {
                    document.head.appendChild(element.cloneNode(true));
                }
            }

            // Add the nav element
            const nav = headerContent.querySelector('nav');
            if (nav) {
                document.body.insertBefore(nav, document.body.firstChild);
            }
        })
        .catch(error => console.error('Error loading header:', error));
});