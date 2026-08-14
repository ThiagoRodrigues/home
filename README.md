# Thiago Rodrigues — Personal Website & Academic Portfolio (`home`)

A modern, responsive, and robust personal and professional website hosted on **GitHub Pages**. Engineered with high-performance vanilla web standards, decoupled JSON content management, modular typography-first CSS custom properties, and automated GitHub Actions CI/CD.

🌐 **Live URL:** [https://thiagorodrigues.github.io/home/](https://thiagorodrigues.github.io/home/) *(once GitHub Pages is enabled)*  
📦 **Repository:** [https://github.com/ThiagoRodrigues/home](https://github.com/ThiagoRodrigues/home)

---

## 1. Features & Architectural Highlights

- **Zero-Dependency Architecture:** Clean, lightning-fast HTML5, modular CSS, and vanilla ES6 JavaScript. No heavy build toolchains or node modules required to run or maintain.
- **Warm Neutral & Off-White Palette:** Tailored typography and warm neutral palette (alabaster, linen, charcoal, slate blue, and terracotta accents) optimized for high readability.
- **Switchable Dark Mode:** Automatic system preference detection with persistent manual toggle (`localStorage`).
- **Decoupled Content Management:** Update bio, social links, repositories, and hobbies by modifying JSON files inside `content/` without touching HTML markup.
- **Interactive Project Discovery:** Real-time search query filtering and category tag chips.
- **Modular Expansion Pages:** Pre-configured sub-pages for [Research & Publications](research/index.html), [Teaching & Mentorship](teaching/index.html), and [Blog & Notes](blog/index.html).
- **Automated CI/CD:** GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`.
- **Accessibility & SEO:** Semantic HTML5, Open Graph and Twitter Card metadata, responsive viewport scaling, and keyboard-navigable components.

---

## 2. Quick Start / Local Development

Since this site has zero runtime dependencies, you can start a local development server with live preview immediately using Python or any static server:

### Option A: Using Python (Recommended)
```bash
# From the repository root:
python3 -m http.server 8000
```
Open your browser and navigate to: **`http://localhost:8000`**

### Option B: Using Node / npx (if installed)
```bash
npx serve .
# or
npx live-server .
```

### Option C: Direct File Inspection
You can also open `index.html` directly in any web browser.

---

## 3. How to Update Content

All main content is decoupled from layout markup and stored in human-readable JSON files in the `content/` directory.

### 3.1 Editing Your Profile, Bio, and Social Links
Open **[`content/profile.json`](content/profile.json)**:
```json
{
  "name": "Thiago Rodrigues",
  "title": "Researcher & Software Engineer",
  "affiliation": "University of Toronto",
  "location": "Toronto, ON, Canada",
  "email": "thiago.rodrigues@utoronto.ca",
  "bio": "Your custom bio statement here...",
  "status": {
    "available": true,
    "text": "Open to research collaborations & talks"
  },
  "avatar": "assets/images/profile.jpg",
  "socials": [ ... ]
}
```

### 3.2 Updating Your Profile Picture
1. Place your new portrait or photo into `assets/images/` (e.g., `assets/images/profile.jpg`).
2. Verify that the `"avatar"` field in `content/profile.json` points to your image path.

### 3.3 Adding / Editing Featured Repositories & Projects
Open **[`content/projects.json`](content/projects.json)** and add a new item:
```json
{
  "id": "my-new-project",
  "title": "my-new-repo",
  "description": "Short summary of what this tool or research pipeline accomplishes.",
  "language": "Python",
  "languageColor": "#3572A5",
  "stars": 42,
  "tags": ["Python", "Machine Learning", "Workflow"],
  "githubUrl": "https://github.com/ThiagoRodrigues/my-new-repo",
  "demoUrl": "https://doi.org/10.xxxx/xxxx",
  "featured": true
}
```

### 3.4 Adding / Editing Hobbies & Personal Interests
Open **[`content/hobbies.json`](content/hobbies.json)** to modify your extracurricular pursuits, sports, reading lists, or creative hobbies.

### 3.5 Adding a New Page or Section
1. Duplicate one of the modular templates (e.g., `research/index.html` or `blog/index.html`).
2. Create a new directory (e.g., `projects/`) and place `index.html` inside it.
3. Add the link to the navbar in `index.html`:
   ```html
   <a href="projects/index.html" class="nav-link">Projects</a>
   ```

---

## 4. How to Customize Design, Colors & Typography

All global styling tokens and variables are centralized in a single file:  
📁 **[`assets/css/theme.css`](assets/css/theme.css)**

### Key CSS Custom Properties:
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--bg-page` | `#faf9f5` | Main page background (warm off-white / alabaster) |
| `--bg-surface` | `#ffffff` | Card and container surface background |
| `--bg-surface-hover` | `#f7f6f1` | Hover state background for cards and interactive items |
| `--text-primary` | `#1e2227` | Primary text color (deep ink/charcoal) |
| `--text-secondary` | `#57606a` | Secondary text color (soft slate neutral) |
| `--accent-primary` | `#2b5784` | Accent brand color (academic slate blue) |
| `--accent-warm` | `#b85d19` | Warm highlight color (terracotta / amber) |
| `--border-subtle` | `#e8e5dc` | Hairline border for cards and dividers |
| `--font-sans` | `'Inter', sans-serif` | Primary body and heading typeface |
| `--font-mono` | `'JetBrains Mono', monospace` | Code, tags, and badge typeface |

*To modify the dark mode palette, edit the `[data-theme="dark"]` section inside `assets/css/theme.css`.*

---

## 5. Deployment & GitHub Pages Configuration

### Automatic Deployment with GitHub Actions
Every commit pushed to the `main` branch automatically triggers `.github/workflows/deploy.yml` which deploys the static site to GitHub Pages.

### Repository Setup Checklist:
1. Go to your repository on GitHub: **`https://github.com/ThiagoRodrigues/home`**
2. Click **Settings** &rarr; **Pages** (in the left sidebar).
3. Under **Build and deployment** &rarr; **Source**, select **`GitHub Actions`**.
4. Push your code to `main`:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```
5. Check the **Actions** tab in GitHub to watch the workflow deploy your site in ~30 seconds.

---

## 6. Project Directory Tree

```text
home/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Actions deployment workflow
├── assets/
│   ├── css/
│   │   ├── theme.css            # Centralized CSS variables & design tokens
│   │   ├── reset.css            # Modern CSS reset
│   │   ├── components.css       # Navbar, cards, badges, buttons, modals
│   │   └── style.css            # Main stylesheet combining all CSS modules
│   ├── js/
│   │   ├── main.js              # Theme switcher, smooth scroll, clipboard helpers
│   │   └── render.js            # Dynamic JSON content loader & search/tag filter
│   └── images/
│       ├── profile.jpg          # Primary profile portrait image
│       └── profile-alt.jpg      # Alternative portrait image
├── content/
│   ├── profile.json             # Personal bio, affiliation, titles, and social links
│   ├── projects.json            # Featured GitHub repositories & research projects
│   └── hobbies.json             # Side interests, hobbies, and personal pursuits
├── research/
│   └── index.html               # Modular section: Research & Publications
├── teaching/
│   └── index.html               # Modular section: Teaching & Mentorship
├── blog/
│   └── index.html               # Modular section: Technical Notes & Essays
├── 404.html                     # Custom 404 error page for GitHub Pages
├── index.html                   # Main landing page
├── .gitignore                   # Standard git ignore configuration
└── README.md                    # Project documentation & maintainer guide
```

---

## License
MIT License &copy; 2026 Thiago Rodrigues.
