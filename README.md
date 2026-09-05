# Safal Kumar Shrestha — Portfolio

Personal digital laboratory and portfolio of **Safal Kumar Shrestha** — AI/ML Engineer, MLOps Engineer, and Android Software Engineer from Chitwan, Nepal. Built with pure HTML/CSS/JS and optimized for search engines and AI answer engines.

![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## Features

- **Fully Responsive** — Optimized for mobile, tablet, and desktop with fluid typography and breakpoints at 1024px, 900px, 768px, 480px, and 360px
- **Dark/Light Theme** — Toggle between themes with localStorage persistence and system preference detection
- **Premium UI/UX** — Glassmorphism, gradient borders, animated background orbs, hover effects, scroll reveal animations, loading screen, magnetic buttons, and animated counters
- **Photography Gallery** — Dynamic masonry gallery with category filtering and lightbox navigation, powered by `static/json/photos.json`
- **Project Case Studies** — Modal-based project detail view with comprehensive case study data
- **SEO/AEO Optimized** — Comprehensive JSON-LD structured data including `Person`, `ProfilePage`, `WebSite`, `Organization`, `BreadcrumbList`, `ItemList` (projects as `SoftwareApplication`), and `FAQPage` with 10 Q&A pairs
- **Accessibility** — Skip links, ARIA labels, semantic HTML, reduced motion support
- **Performance** — DNS prefetch, preconnect hints, async image decoding, lazy loading

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3 (Custom Design System), Vanilla JavaScript |
| **Fonts** | Plus Jakarta Sans, Cormorant (Serif), DM Mono, Inter |
| **Icons** | Font Awesome 6, inline SVGs |
| **Data** | JSON (`static/json/photos.json`) |
| **Deployment** | Static site — deploy to any web server or CDN |

---

## Project Structure

```
portfolio/
├── index.html                 # Main portfolio page
├── script.js                  # Main JavaScript logic
├── static/
│   ├── css/
│   │   ├── style.css          # Primary stylesheet (design system, responsive, animations)
│   │   └── index.css          # Alternative stylesheet (editorial layout)
│   ├── js/
│   │   └── script.js          # Interactive modules (gallery, modals, theme, counters)
│   ├── img/
│   │   └── safal.png          # Profile image
│   └── json/
│       └── photos.json        # Photography gallery data
├── safal_cv.pdf               # Downloadable CV
├── sitemap.xml                # XML sitemap for search engines
├── robots.txt                 # Search engine crawler directives
└── README.md                  # This file
```

---

## Getting Started

### Prerequisites

No build process or dependencies required. This is a static site.

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/whoamisafal/portfolio.git
   cd portfolio
   ```

2. Serve with any static HTTP server (optional, for gallery JSON fetching):
   ```bash
   # Python
   python -m http.server 8000

   # Node.js
   npx serve .

   # VS Code Live Server extension
   ```
   
   > **Note:** The photography gallery fetches `static/json/photos.json` via HTTP, so serving via a local server is recommended rather than opening `file://` directly.

3. Open `http://localhost:8000` in your browser.

---

## Customization

### Personal Information

Update the following in `index.html`:
- **Name, title, bio** — Hero section (~line 437)
- **Contact details** — Contact section (~line 1564) and footer (~line 1658)
- **Social links** — Footer Connect section and JSON-LD `sameAs` arrays
- **Projects** — Project cards (~line 730-940) and `static/js/script.js` `projectsData` object
- **Skills** — Skills section (~line 977-1049)
- **Experience** — Experience timeline (~line 1066-1190)
- **Education** — Education cards (~line 1214-1270)
- **FAQ** — FAQ section (~line 1474-1650) and JSON-LD `FAQPage` schema

### Photography Gallery

Edit `static/json/photos.json`:
```json
{
  "gallery": [
    {
      "url": "static/img/photo1.jpg",
      "title": "Photo Title",
      "category": "landscape"
    }
  ]
}
```

Supported categories: `landscape`, `trekking`, `portrait`, `tech`, `nature`, `urban`

### CV

Replace `safal_cv.pdf` with your own CV file. Update download links in `index.html` if needed.

### Theme Colors

Modify CSS custom properties in `static/css/style.css`:
```css
:root {
  --bg-primary: #08090c;
  --accent-cyan: #06b6d4;
  --accent-blue: #38bdf8;
  /* ... */
}
```

---

## SEO/AEO Features

- **JSON-LD Structured Data:**
  - `Person` — Name, job titles, education, awards, contact info
  - `ProfilePage` — Entity profile signals
  - `WebSite` with `SearchAction` — Sitelinks search box
  - `Organization` (bala.ai) — Brand entity
  - `BreadcrumbList` — Navigation hierarchy
  - `ItemList` with `SoftwareApplication` — Project listings
  - `FAQPage` — 10 questions for featured snippets and AI answer engines

- **Meta Tags:**
  - Open Graph (Facebook/LinkedIn)
  - Twitter Cards
  - Canonical URL
  - Geo location tags
  - Color scheme
  - Theme color

- **Technical SEO:**
  - XML sitemap (`sitemap.xml`)
  - `robots.txt` with sitemap reference
  - Semantic HTML5 elements
  - Accessible navigation and skip links
  - Lazy loading images with `decoding="async"`

---

## Deployment

Deploy to any static hosting service:

- **Netlify / Vercel** — Connect repository, auto-deploy on push
- **GitHub Pages** — Enable Pages in repository settings
- **Cloudflare Pages** — Connect Git repository
- **Nginx / Apache** — Upload files to web root

Ensure `sitemap.xml` and `robots.txt` are served from the root directory.

---

## License

MIT License — feel free to use this template for your own portfolio.

---

## Contact

**Safal Kumar Shrestha**
- 📧 hello@safalkumarshrestha.com.np
- 💻 [github.com/whoamisafal](https://github.com/whoamisafal)
- 🔗 [linkedin.com/in/itsmesafal](https://www.linkedin.com/in/itsmesafal)
- 🌐 [safalkumarshrestha.com.np](https://www.safalkumarshrestha.com.np)
