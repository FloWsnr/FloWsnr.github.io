# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Florian Wiesner (FloWsnr.github.io). The site showcases research, projects, hobbies, publications, and blog posts. It's built with vanilla HTML, CSS, and JavaScript without any build tools or frameworks.

## Architecture

### Dynamic Header System
The website uses a JavaScript-based header injection system that allows consistent navigation across all pages:

- `header.js`: Dynamically loads and injects navigation and head elements
- `header.html`: Template containing navigation structure and head elements with placeholders
- Path resolution handles both root and subdirectory pages automatically
- Placeholders (FAVICON_PATH, STYLE_PATH, etc.) are replaced based on current location

### File Structure
```
/
├── index.html              # Main landing page with hero section
├── header.html             # Header template with placeholders
├── header.js               # Dynamic header injection logic
├── styles.css              # Global styles for all pages
├── pages/                  # Individual content pages
│   ├── blog.html
│   ├── hobbies.html
│   ├── news.html
│   ├── projects.html
│   └── publications.html
└── assets/
    ├── favicon/
    ├── images/
    │   ├── hobbies/
    │   ├── profile/
    │   ├── projects/
    │   └── research/
```

### Page Structure Pattern
All pages follow this pattern:
1. Load header.js in `<head>`
2. Header injection happens on DOMContentLoaded
3. Navigation appears at top, content below with proper spacing

## Development

### Local Development Server
Start a local development server:
```bash
python -m http.server 8000
# or
python3 -m http.server 8000
```

Then visit `http://localhost:8000` to view the site.

### Common Tasks

**Adding new pages:**
1. Create HTML file in `/pages/` directory
2. Include `<script src="../header.js"></script>` in head
3. Use `.container` class for consistent layout
4. CSS styles will be automatically applied

**Adding images:**
- Profile images: `assets/images/profile/`
- Project images: `assets/images/projects/`
- Research images: `assets/images/research/`
- Hobby images: `assets/images/hobbies/`

**Navigation updates:**
Modify the navigation structure in `header.html`. The JavaScript will handle path resolution automatically.

### Styling Guidelines
- Uses CSS Grid and Flexbox for layouts
- Responsive design with mobile breakpoints at 768px
- Consistent color scheme: #333 for primary, #666 for secondary text
- Hover effects on interactive elements
- Card-based design for project and research items

### No Build Process
This is a static site with no build tools, package managers, or dependencies. All code is vanilla HTML/CSS/JavaScript that runs directly in browsers.