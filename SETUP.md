# Personal Website Setup Guide

This guide will help you configure and customize your new Hugo personal website.

## Prerequisites

- Hugo (extended version) installed
- Git for version control
- Text editor or IDE

## Initial Configuration

### 1. Update Site Configuration

Edit `hugo.toml` to personalize your site:

```toml
baseURL = 'https://yourdomain.com/'  # Your actual domain
title = 'Your Name - Personal Website'

[params]
  author = 'Your Full Name'
  description = 'Personal website of Your Name - [Your Title/Profession]'
  profileImage = '/images/profile.jpg'  # Add your profile image
  github = 'https://github.com/yourusername'
  linkedin = 'https://linkedin.com/in/yourusername'
  googlescholar = 'https://scholar.google.com/citations?user=youruserid'
```

### 2. Add Your Profile Image

1. Take or find a professional headshot (square format recommended)
2. Resize to at least 500x500 pixels
3. Save as `themes/custom/static/images/profile.jpg`
4. Update the path in `hugo.toml` if using a different name

### 3. Create Your Favicon

1. Create a 32x32 pixel icon representing you or your brand
2. Convert to `.ico` format
3. Save as `themes/custom/static/images/favicon.ico`
4. Alternative: Use the provided SVG and convert online

### 4. Customize Homepage Content

Edit `content/_index.md` to introduce yourself:

```markdown
# Your Name

Welcome to my personal website! I am a [Your Title] passionate about [Your Interests].

## About Me

[Write your personal introduction here. This appears on the left side of your homepage next to your profile image.]

## What I Do

- Your primary activities
- Professional focus areas
- Research interests
- Personal projects
```

## Adding Content

### Blog Posts

Create new blog posts:

```bash
hugo new blog/my-post-title.md
```

Edit the front matter and content:

```markdown
+++
title = 'My Post Title'
date = '2024-01-15'
draft = false
summary = 'Brief description of the post'
tags = ['tag1', 'tag2']
categories = ['category']
+++

Your blog content here...
```

### Research Papers

Create research entries:

```bash
hugo new research/paper-title.md
```

Include academic details:

```markdown
+++
title = 'Paper Title'
date = '2024-01-10'
abstract = 'Brief abstract of your paper'
authors = ['Your Name', 'Co-author']
publication = 'Journal Name'
publication_year = 2024
paper_url = 'https://link-to-paper.com'
image = '/images/research/paper-diagram.png'
+++
```

### Projects

Create project showcases:

```bash
hugo new projects/project-name.md
```

Detail your work:

```markdown
+++
title = 'Project Name'
summary = 'Brief project description'
tech_stack = ['React', 'Node.js', 'PostgreSQL']
project_url = 'https://project-demo.com'
github_url = 'https://github.com/you/project'
image = '/images/projects/screenshot.png'
+++
```

### News Updates

Share announcements:

```bash
hugo new news/announcement.md
```

### Hobbies

Showcase personal interests:

```bash
hugo new hobbies/hobby-name.md
```

## Customization

### Colors and Styling

The site uses CSS custom properties for easy theming. Edit `themes/custom/static/css/style.css`:

```css
:root {
  --accent-color: #3182ce;  /* Change to your preferred color */
  --accent-hover: #2c5aa0;
  /* Other color variables... */
}
```

### Navigation Menu

Add or modify navigation items in `hugo.toml`:

```toml
[[menu.main]]
  name = 'New Section'
  url = '/new-section/'
  weight = 7
```

### Social Links

Update social media links in the site configuration:

```toml
[params]
  github = 'https://github.com/yourusername'
  linkedin = 'https://linkedin.com/in/yourusername'
  googlescholar = 'https://scholar.google.com/citations?user=yourid'
  # Add other social platforms as needed
```

## Development

### Local Development

Run the development server:

```bash
hugo server -D
```

Visit `http://localhost:1313` to see your site.

### Building for Production

Generate the static site:

```bash
hugo --minify
```

The generated site will be in the `public/` directory.

## Deployment

### GitHub Pages

1. Push your site to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Configure to deploy from the `gh-pages` branch or `docs/` folder

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `hugo --minify`
3. Set publish directory: `public`

### Custom Hosting

Upload the contents of the `public/` directory to your web server.

## Maintenance

### Regular Updates

1. **Content**: Add new blog posts, research papers, and project updates
2. **Images**: Optimize images for web and add alt text
3. **SEO**: Update meta descriptions and titles
4. **Performance**: Monitor site speed and optimize as needed

### Backup

Regularly backup your content and configuration:

- Commit all changes to Git
- Keep a backup of your images and media files
- Document any custom modifications

## Troubleshooting

### Common Issues

1. **Images not displaying**: Check file paths and ensure images are in `themes/custom/static/images/`
2. **Styles not loading**: Verify CSS file exists and is referenced correctly in templates
3. **Content not showing**: Ensure `draft = false` in front matter

### Getting Help

- Hugo Documentation: https://gohugo.io/documentation/
- Hugo Discourse: https://discourse.gohugo.io/
- Create issues in your repository for specific problems

## Next Steps

1. Add your actual content and images
2. Customize colors and styling to match your brand
3. Set up analytics (Google Analytics, etc.)
4. Configure SEO optimization
5. Add search functionality if needed
6. Consider adding a contact form

---

Enjoy your new personal website! Remember to keep it updated with your latest work and achievements.