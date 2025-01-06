document.addEventListener('DOMContentLoaded', function () {
    // Check if we're in a subdirectory by looking at the current path
    const path = window.location.pathname;
    const isInPagesDir = path.includes('/pages/');
    const navPath = isInPagesDir ? '../nav.html' : 'nav.html';

    fetch(navPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;

            // After loading the nav, update the links based on current location
            if (isInPagesDir) {
                // We're in the pages directory, so update links
                document.querySelectorAll('#nav-placeholder a').forEach(link => {
                    if (link.getAttribute('href') === 'index.html') {
                        link.setAttribute('href', '../index.html');
                    } else if (link.getAttribute('href').startsWith('pages/')) {
                        link.setAttribute('href', link.getAttribute('href').replace('pages/', ''));
                    }
                });
            }
        });
});