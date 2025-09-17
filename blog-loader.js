// Load blog posts from HTML files
async function loadBlogPosts() {
    try {
        // Determine if we're in root or pages directory
        const basePath = window.location.pathname.includes('/pages/') ? '../' : '';

        // Get list of HTML files from the data/blog directory
        const files = [
            'snowboarding-hype.html',
        ];

        const blogPosts = [];

        for (const file of files) {
            try {
                const response = await fetch(`${basePath}data/blog/${file}`);
                if (response.ok) {
                    const htmlContent = await response.text();
                    const blogPost = parseBlogPost(htmlContent, file);
                    blogPosts.push(blogPost);
                }
            } catch (error) {
                console.warn(`Failed to load ${file}:`, error);
            }
        }

        // Sort by date (newest first)
        blogPosts.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        return blogPosts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

// Parse blog post HTML to extract metadata and content
function parseBlogPost(htmlContent, filename) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Extract metadata from meta tags or default values
    const title = doc.querySelector('meta[name="title"]')?.content ||
                  doc.querySelector('title')?.textContent ||
                  'Untitled Post';

    const date = doc.querySelector('meta[name="date"]')?.content ||
                 new Date().toISOString().split('T')[0];

    const author = doc.querySelector('meta[name="author"]')?.content ||
                   'Florian Wiesner';

    const description = doc.querySelector('meta[name="description"]')?.content ||
                        '';

    // Extract the main content (everything in body)
    const bodyContent = doc.querySelector('body')?.innerHTML || htmlContent;

    // Create a preview from the first paragraph or first 200 characters
    const textContent = doc.body?.textContent || '';
    const preview = description ||
                   (textContent.length > 200 ? textContent.substring(0, 200) + '...' : textContent);

    return {
        filename: filename,
        title: title,
        date: date,
        author: author,
        description: description,
        preview: preview,
        content: bodyContent
    };
}

// Render blog posts for the full blog page
function renderBlogPage(blogPosts) {
    const container = document.querySelector('.container');
    if (!container) return;

    // Clear existing content except title
    const title = container.querySelector('h1');
    container.innerHTML = '';
    container.appendChild(title);

    blogPosts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'news-post';

        // Format the date nicely
        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Determine the correct path to the blog post file
        const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
        const blogPostPath = `${basePath}data/blog/${post.filename}`;

        article.innerHTML = `
            <div class="post-date">${formattedDate}</div>
            <h2 class="post-title">
                <a href="${blogPostPath}">${post.title}</a>
            </h2>
            <div class="post-content">
                <p>${post.description || post.preview}</p>
            </div>
        `;

        container.appendChild(article);
    });
}


// Render latest blog posts for the index page (if needed)
function renderLatestBlogPosts(blogPosts, limit = 2) {
    const latestBlogContainer = document.querySelector('.latest-blog');
    if (!latestBlogContainer) return;

    // Keep the title and remove existing blog items
    const title = latestBlogContainer.querySelector('h2');
    const viewAllLink = latestBlogContainer.querySelector('.view-all-link');
    latestBlogContainer.innerHTML = '';
    latestBlogContainer.appendChild(title);

    // Add latest blog posts
    blogPosts.slice(0, limit).forEach(post => {
        const blogItem = document.createElement('div');
        blogItem.className = 'blog-item';

        const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        blogItem.innerHTML = `
            <div class="blog-date">${formattedDate}</div>
            <div class="blog-title">${post.title}</div>
            <div class="blog-summary">${post.preview}</div>
        `;

        latestBlogContainer.appendChild(blogItem);
    });

    // Re-add the "View All" link
    if (viewAllLink) {
        latestBlogContainer.appendChild(viewAllLink);
    }
}