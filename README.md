 #  Mohamed Aslam I – Portfolio

Interactive developer portfolio featuring a starfield hero mini‑game, cinematic theme transitions, scroll‑spy navigation, and a working EmailJS contact form.

— Tech: React 19, Vite 7, Tailwind CSS , Framer Motion, EmailJS


##  Features

- Interactive hero section (Canvas mini‑game)
  - Animated spaceship with auto‑aim, comets, asteroids, alien ship, explosions, and live score.
- Dynamic navigation with scroll‑spy
  - Smooth section scroll via scrollIntoView, fixed‑navbar offsets with Tailwind scroll‑mt utilities, and active link highlighting using IntersectionObserver.
- Cinematic theme transition (light ↔ dark)
  - Full‑screen starfield sweeps right→left; body theme switches mid‑animation; solid overlay prevents white flashes.
- Themed space background and custom cursor
  - Theme‑aware starry background wrapper and a shooting‑star cursor trail.
- Polished About section
  - Responsive two‑column layout, glassmorphism card, circular profile image, and Framer Motion animations.
- Certifications with modal viewing
  - Certificate modal via context provider with scroll lock and clean animations.
- Contact form powered by EmailJS
  - Works without a backend; credentials via environment variables.


##  Sections

- Home (hero + CTAs)
- About (image + bio)
- Experience (cards)
- Skills (icons and stacks)
- Projects (labeled “Academia” in code)
- Certifications (modal viewer)
- Contact (links + working form)


##  Technologies Used

- **Frontend**: React 19.1.0 + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion + CSS Keyframes + Intersection Observer API
- **Email Service**: EmailJS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm


##  Project Structure

```
My_Portfolio/
├─ public/
│  ├─ Aslam.jpg                 # Profile image used by About section
│  └─ certificates/             # Public certificate images
├─ src/
│  ├─ App.jsx                   # App shell, scroll‑spy, theme/state wiring
│  ├─ main.jsx                  # React/Vite bootstrap
│  ├─ assets/
│  │  └─ logos/                 # Logos or images (optional)
│  ├─ components/
│  │  ├─ Navigation.jsx         # Navbar, theme toggle, mobile menu
│  │  ├─ HomeSection.jsx        # Hero + CTAs
│  │  ├─ HeroAnimation.jsx      # Canvas mini‑game
│  │  ├─ AboutSection.jsx       # Framer Motion + profile image
│  │  ├─ ExperienceSection.jsx
│  │  ├─ SkillsSection.jsx
│  │  ├─ SkillIcons.jsx
│  │  ├─ AcademiaSection.jsx    # Projects section
│  │  ├─ Cards.jsx              # Reusable cards (incl. certifications)
│  │  ├─ CertificationsSection.jsx
│  │  ├─ CertificateModal.jsx   # Modal (used via context)
│  │  ├─ ContactSection.jsx     # EmailJS contact form
│  │  ├─ ScrollToTop.jsx        # Back‑to‑top button
│  │  ├─ ShootingStarCursor.jsx # Custom cursor trail
│  │  ├─ SpaceBackground.jsx    # Theme‑aware starry bg wrapper
│  │  └─ SpaceBackground.css    # Styles for space background
│  └─ utils/
│     ├─ theme.js               # getThemeClasses(theme, key)
│     ├─ ModalContext.jsx       # Global modal provider
│     └─ emailConfig.js         # EmailJS env mapping
├─ index.html                   # Tailwind CDN + fonts + metadata
├─ vite.config.js
├─ eslint.config.js
├─ package.json
└─ README.md
```


##  Installation & Setup

1) Install dependencies
   - npm install

2) Start the dev server
   - npm run dev

3) Build for production
   - npm run build

4) Preview production build
   - npm run preview


##  Environment Variables (EmailJS)

Create a `.env` at the project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Restart the dev server after editing `.env`.


##  Add Resume & Certificates

- Resume for the Home “View Resume” button:
  - Place your PDF at: `public/Mohamed_Aslam_Resume.pdf`
- Certificates shown in Certifications:
  - Place images inside: `public/certificates/`
  - Update titles/paths in `src/components/CertificationsSection.jsx` as needed.


##  Accessibility & UX

- Keyboard‑navigable menu and buttons; Escape closes mobile menu.
- Clear focusable controls; ARIA labels on theme toggle and mobile menu button.
- High‑contrast themes; scroll margins to avoid content hidden under the fixed navbar.
- Smooth scrolling and reduced layout shift during transitions.


##  Deployment

- Vercel or Netlify recommended for zero‑config deployments.
- Set environment variables (EmailJS) in your platform dashboard.
- Framework preset: Vite. Build command: `npm run build`. Output: `dist`.


##  Contact

- **Email**: [mohamed.aslam.i.2004@gmail.com](mailto:mohamed.aslam.i.2004@gmail.com)
- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/mohamed-aslam-i)
- **Portfolio**: [Live Demo](https://mohamedaslam.tech)


Made with ❤️ by Mohamed Aslam


