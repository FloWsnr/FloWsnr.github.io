# News Snippets

This directory contains YAML files for news snippets that are automatically loaded into the website.

## File Format

Each news snippet should be a YAML file with the following structure:

```yaml
headline: "Your News Headline"
date: "YYYY-MM" or "YYYY"
text: |
  Your news content here. This supports:

  - **Bold text** using double asterisks
  - Lists using dashes
  - Multiple paragraphs separated by blank lines

  The text field uses YAML's literal block style (|) for multi-line content.
```

## Adding New News Items

1. Create a new YAML file in this directory
2. Use the format: `YYYY-MM-short-description.yaml`
3. Follow the structure above
4. The files are automatically loaded and sorted by date (newest first)

## File List Management

When adding new files, update the `files` array in `/news-loader.js` to include your new file.

## Examples

See the existing files in this directory for examples:
- `2025-01-uva-research.yaml`
- `2024-publications.yaml`
- `2023-advanced-engineering.yaml`