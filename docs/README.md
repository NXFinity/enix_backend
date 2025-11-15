# Backend Documentation

This directory contains the GitHub Pages documentation for the Meta EN|IX Backend.

## Setup GitHub Pages

### Option 1: Using Jekyll (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository Settings → Pages
   - Select source: `/docs` folder
   - Select branch: `main` (or your default branch)

2. **Configure Jekyll Theme:**
   - The `_config.yml` file is already configured
   - Default theme: `jekyll-theme-minimal`
   - To change theme, edit `_config.yml` and update the `theme:` line

3. **Supported Themes:**
   - `jekyll-theme-minimal`
   - `jekyll-theme-cayman`
   - `jekyll-theme-dinky`
   - `jekyll-theme-hacker`
   - `jekyll-theme-merlot`
   - `jekyll-theme-midnight`
   - `jekyll-theme-slate`
   - `jekyll-theme-tactile`

4. **Custom Theme:**
   - Use `remote_theme:` instead of `theme:` in `_config.yml`
   - Example: `remote_theme: pages-themes/minimal`

### Option 2: Using GitHub Actions

If you prefer GitHub Actions over Jekyll:

1. Create `.github/workflows/pages.yml`:
```yaml
name: Deploy GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './docs'
```

2. Enable GitHub Pages in repository settings
3. Select "GitHub Actions" as the source

## Local Development

To preview the documentation locally:

```bash
# Install Jekyll (if not already installed)
gem install bundler
bundle install

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

## File Structure

```
docs/
├── index.md              # Introduction page
├── _config.yml           # Jekyll configuration
├── Gemfile              # Jekyll dependencies
├── README.md            # This file
└── [other documentation files]
```

## Customization

### Custom CSS

Create `assets/css/style.scss`:
```scss
---
---
@import "{{ site.theme }}";

/* Your custom CSS here */
```

### Custom Layout

Create `_layouts/default.html` and customize as needed.

## References

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Themes](https://pages.github.com/themes/)
- [Adding a Theme to GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll)

