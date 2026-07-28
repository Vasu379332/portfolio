# Vasu — Portfolio Website

A dark-mode, glassmorphism personal portfolio built with plain HTML5, CSS3, and vanilla
JavaScript (no build step required).

## Folder structure

```
portfolio/
├── index.html          Main page — all sections live here
├── css/
│   └── style.css        Design tokens, layout, components, responsiveness
├── js/
│   └── script.js         Loader, cursor, particles, filters, form, theme toggle
├── assets/
│   ├── Vasu_Resume.pdf   Replace with your real resume (same filename, or update the href)
│   └── images/           Put any project screenshots / avatar images here
└── README.md
```

## Before you deploy — things to personalize

1. **Resume** — replace `assets/Vasu_Resume.pdf` with your actual PDF (keep the same filename,
   or update the two `href="assets/Vasu_Resume.pdf"` links in `index.html`).
2. **GitHub stats section** — in `index.html`, replace every instance of
   `YOUR_GITHUB_USERNAME` with your real GitHub username so the stats/streak/language cards
   go live automatically (powered by github-readme-stats and ghchart, no API key needed).
3. **Links** — update the `href` placeholders for GitHub, LinkedIn, live demos, and case
   studies in the Projects and Contact sections.
4. **Email** — replace `your.email@example.com` in the Contact section and footer.
5. **Contact form** — the form validates on the client and shows a success message, but it is
   **not wired to a backend**. To actually receive messages, connect it to a service like
   [EmailJS](https://www.emailjs.com/), [Formspree](https://formspree.io/), or your own API —
   swap the `setTimeout` block in `js/script.js`'s submit handler for a real request.

## Running locally

No build tools needed — just open `index.html` in a browser, or serve it locally:

```bash
npx serve .
# or
python -m http.server 8000
```

## Deploying

- **GitHub Pages**: push this folder to a repo, enable Pages on the `main` branch (root).
- **Netlify**: drag-and-drop the folder onto the Netlify dashboard, or connect the repo.
- **Vercel**: `vercel deploy` from inside this folder, or import the repo in the dashboard.

No environment variables or build commands are required — it's a static site.

## Notes on features

- **Dark/Light toggle** — persists your choice using `localStorage`.
- **Custom cursor** — automatically disabled on touch devices.
- **Particle background** — plain `<canvas>`, respects `prefers-reduced-motion`.
- **Project filter & search** — pure JavaScript, matches on tags and card text.
- **AOS scroll animations** — loaded via CDN (`aos.css` / `aos.js`).
- **Icons** — Font Awesome via CDN.
- **Fonts** — Sora (display), Inter (body), JetBrains Mono (code/labels) via Google Fonts.
