// Simple YAML parser for news snippets
function parseYAML(yamlText) {
    const lines = yamlText.split('\n');
    const result = {};
    let currentKey = null;
    let currentValue = '';
    let inMultilineValue = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip empty lines when not in multiline
        if (!inMultilineValue && line.trim() === '') continue;

        // Check for key-value pairs
        if (line.includes(':') && !inMultilineValue) {
            // Save previous multiline value if exists
            if (currentKey && inMultilineValue) {
                result[currentKey] = currentValue.trim();
                currentValue = '';
                inMultilineValue = false;
            }

            const colonIndex = line.indexOf(':');
            currentKey = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();

            if (value === '|') {
                // Start of multiline value
                inMultilineValue = true;
                currentValue = '';
            } else if (value.startsWith('"') && value.endsWith('"')) {
                // Quoted string
                result[currentKey] = value.slice(1, -1);
            } else {
                // Simple value
                result[currentKey] = value;
            }
        } else if (inMultilineValue) {
            // Add line to multiline value
            if (currentValue === '') {
                currentValue = line.replace(/^  /, ''); // Remove 2-space indentation
            } else {
                currentValue += '\n' + line.replace(/^  /, '');
            }
        }
    }

    // Handle final multiline value
    if (currentKey && inMultilineValue) {
        result[currentKey] = currentValue.trim();
    }

    return result;
}

// Load news snippets from YAML files
async function loadNewsSnippets() {
    try {
        // Determine if we're in root or pages directory
        const basePath = window.location.pathname.includes('/pages/') ? '../' : '';

        // Get list of YAML files from the data/news directory
        const files = [
            '2025-06-merck.yaml',
            '2025-01-uva-research.yaml',
        ];

        const newsItems = [];

        for (const file of files) {
            try {
                const response = await fetch(`${basePath}data/news/${file}`);
                if (response.ok) {
                    const yamlText = await response.text();
                    const newsItem = parseYAML(yamlText);
                    newsItems.push(newsItem);
                }
            } catch (error) {
                console.warn(`Failed to load ${file}:`, error);
            }
        }

        // Sort by date (newest first)
        newsItems.sort((a, b) => {
            // Simple date comparison - assumes YYYY or YYYY-MM format
            const dateA = a.date.replace('-', '');
            const dateB = b.date.replace('-', '');
            return dateB.localeCompare(dateA);
        });

        return newsItems;
    } catch (error) {
        console.error('Error loading news snippets:', error);
        return [];
    }
}

// Convert markdown-like text to HTML
function convertToHTML(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/^- (.*$)/gim, '<li>$1</li>') // List items
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>') // Wrap lists
        .replace(/\n\n/g, '</p><p>') // Paragraphs
        .replace(/^(.+)$/gim, '<p>$1</p>') // Wrap remaining text in paragraphs
        .replace(/<p><ul>/g, '<ul>') // Fix list wrapping
        .replace(/<\/ul><\/p>/g, '</ul>'); // Fix list wrapping
}

// Render news items for the full news page
function renderNewsPage(newsItems) {
    const container = document.querySelector('.container');
    if (!container) return;

    // Clear existing content except title
    const title = container.querySelector('h1');
    container.innerHTML = '';
    container.appendChild(title);

    newsItems.forEach(item => {
        const article = document.createElement('article');
        article.className = 'news-post';

        const htmlContent = convertToHTML(item.text);

        article.innerHTML = `
            <div class="post-date">${item.date}</div>
            <h2 class="post-title">${item.headline}</h2>
            <div class="post-content">
                ${htmlContent}
            </div>
        `;

        container.appendChild(article);
    });
}

// Render latest news items for the index page
function renderLatestNews(newsItems, limit = 2) {
    const latestNewsContainer = document.querySelector('.latest-news');
    if (!latestNewsContainer) return;

    // Keep the title and remove existing news items
    const title = latestNewsContainer.querySelector('h2');
    const viewAllLink = latestNewsContainer.querySelector('.view-all-link');
    latestNewsContainer.innerHTML = '';
    latestNewsContainer.appendChild(title);

    // Add latest news items (headlines only)
    newsItems.slice(0, limit).forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        newsItem.innerHTML = `
            <div class="news-date">${item.date}</div>
            <div class="news-title">${item.headline}</div>
        `;

        latestNewsContainer.appendChild(newsItem);
    });

    // Re-add the "View All" link
    latestNewsContainer.appendChild(viewAllLink);
}