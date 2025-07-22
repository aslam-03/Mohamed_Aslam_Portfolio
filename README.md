# 🚀 Mohamed Aslam I -  Portfolio

A modern, interactive portfolio website showcasing AI and Data Science projects with stunning space-themed animations and effects.

## ✨ Features

- 🌌 **Interactive Space Background** - Floating stars and cosmic animations in dark mode
- ⭐ **Custom Star Cursor** - Animated star cursor with trailing effects
- 🎮 **Spaceship Game** - Interactive hero section with animated spaceship
- 📜 **Scroll Animations** - Smooth entrance animations for all sections
- 🌓 **Theme Switching** - Light/Dark mode with automatic background adaptation
- 📧 **Contact Form** - Functional email contact form using EmailJS
- 📜 **Certificate Viewer** - Interactive certificate gallery with view buttons
- 📱 **Responsive Design** - Mobile-friendly across all devices
- ⬆️ **Scroll to Top** - Smooth scroll button for better navigation

## 🛠️ Technologies Used

- **Frontend**: React 19.1.0 + Vite
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: CSS Keyframes + Intersection Observer API
- **Email Service**: EmailJS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/aslam-03/My_Portfolio.git
cd My_Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

#### How to Get EmailJS Credentials:

1. Visit [EmailJS.com](https://www.emailjs.com/)
2. Create an account and verify your email
3. Create a new email service (Gmail, Outlook, etc.)
4. Create an email template
5. Get your Service ID, Template ID, and Public Key
6. Add them to your `.env` file

### 4. Add Your Resume/CV

Place your resume PDF in the `public` folder:
```
public/
  Mohamed Aslam.pdf  # Replace with your resume
```

### 5. Add Your Certificates

Place your certificate files in the `public/certificates/` folder:
```
public/certificates/
  certificate1.pdf
  certificate2.png
  # Add your certificates here
```

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 7. Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 📁 Project Structure

```
Portfolio/
├── public/                     # Static assets
│   ├── certificates/          # Certificate files (PDF/PNG)
│   ├── Mohamed Aslam.pdf      # Resume file
│   ├── vite.svg              # Favicon
│   └── index.html            # HTML template
├── src/
│   ├── components/           # React components
│   │   ├── AcademiaSection.jsx      # Projects section
│   │   ├── Cards.jsx               # Project and certificate cards
│   │   ├── CertificationsSection.jsx # Certifications display
│   │   ├── ContactSection.jsx       # Contact form
│   │   ├── ExperienceSection.jsx    # Experience timeline
│   │   ├── HeroAnimation.jsx        # Spaceship game animation
│   │   ├── HomeSection.jsx          # Hero section
│   │   ├── Icons.jsx               # Custom icon components
│   │   ├── Navigation.jsx          # Navigation bar
│   │   ├── ShootingStarCursor.jsx  # Star cursor effect
│   │   ├── SkillsSection.jsx       # Skills showcase
│   │   ├── SpaceBackground.jsx     # Space theme manager
│   │   └── SpaceBackground.css     # Space animations CSS
│   ├── utils/
│   │   └── theme.js               # Theme configuration
│   ├── assets/                    # Images and icons
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                 # App entry point
│   ├── App.css                  # Global styles
│   └── index.css               # Tailwind and custom CSS
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Update Personal Information

1. **Hero Section**: Edit `src/components/HomeSection.jsx`
2. **About Text**: Modify the description in HomeSection
3. **Projects**: Update `src/components/AcademiaSection.jsx`
4. **Experience**: Edit `src/components/ExperienceSection.jsx`
5. **Skills**: Modify `src/components/SkillsSection.jsx`
6. **Certificates**: Update `src/components/CertificationsSection.jsx`



## 📞 Contact

- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **GitHub**: [aslam-03](https://github.com/aslam-03)
- **Portfolio**: [Live Demo](https://your-portfolio-url.com)


Made with ❤️ by Mohamed Aslam

