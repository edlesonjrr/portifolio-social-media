# Yasmin Labanca · Videomaker Portfolio

Personal portfolio website for Yasmin Labanca, a videomaker and social media professional based in Brazil.

## 🔗 Live

[yasminlabanca.com](#) <!-- replace with the real URL -->

## ✨ Features

- Fully responsive — mobile, tablet, desktop and ultrawide
- Hero section with mouse-reactive parallax (blobs + photo)
- Animated scroll reveals powered by GSAP + ScrollTrigger
- Portfolio grid linking directly to Instagram posts
- Interactive process section with floating icons reacting to mouse
- Testimonials infinite marquee
- WhatsApp floating button
- Custom animated cursor (desktop)
- Scroll progress bar
- Smooth anchor navigation with navbar offset

## 🛠 Tech Stack

| Layer | Tools |
|---|---|
| Markup | HTML5 semantic |
| Styling | CSS3 modular (14 files) |
| Animation | GSAP 3 + ScrollTrigger |
| 3D / Parallax | Vanilla JS (`hero-mouse.js`, `process-visual.js`) |
| Fonts | Playfair Display + DM Sans (Google Fonts) |

## 📁 Project Structure

```
yasmin-portfolio/
├── index.html
├── assets/
│   ├── YasminHero.png
│   ├── yasmin-about.png
│   ├── work-1.jpg ... work-6.jpg
│   └── og-image.jpg
├── css/
│   ├── variables.css
│   ├── typography.css
│   ├── buttons.css
│   ├── cursor.css
│   ├── navbar.css
│   ├── hero.css
│   ├── about.css
│   ├── portfolio.css
│   ├── services.css
│   ├── process.css
│   ├── testimonials.css
│   ├── footer.css
│   ├── animations.css
│   └── whatsapp.css
└── js/
    ├── cursor.js
    ├── navbar.js
    ├── scroll.js
    ├── modal.js
    ├── tilt.js
    ├── hero-mouse.js
    └── process-visual.js
```

## 🚀 Getting Started

No build tools required. Just open `index.html` in a browser or serve with any static server:

```bash
npx serve .
```

## 📸 Adding Portfolio Work

In `index.html`, find each `.work-item` and replace the Instagram link:

```html
<a class="work-item" href="https://www.instagram.com/p/YOUR_POST_ID/" ...>
```

## 📄 License

All rights reserved © Yasmin Labanca Films.

---

Developed by [Eddy Code](https://portifolio-eddy.vercel.app)
