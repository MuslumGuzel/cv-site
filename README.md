# 📄 Müslüm GÜZEL - Personal CV Website

A professional, responsive CV website built with **Astro** and **Tailwind CSS**.

## 🌐 Live Site
Visit: [muslumguzel.com](https://muslumguzel.com)

## ✨ Features

- **Professional Design**: Clean, minimalist layout with a blue accent theme
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Fast Performance**: Built with Astro for optimal loading speeds
- **SEO Optimized**: Complete meta tags, OpenGraph, and Twitter Card support
- **Privacy-first contact**: Direct email/phone and downloadable personal documents are not published
- **Accessibility**: Semantic HTML structure and keyboard navigation support

## 🛠 Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: Turkish (Primary) / English (SEO)
- **Deployment**: Ready for static hosting

## 📁 Project Structure

```
cv-site/
├── public/
│   └── favicon.svg                 # Site favicon
├── scripts/
│   └── check-no-sensitive-docs.mjs # Blocks sensitive docs in public/dist
├── src/
│   └── pages/
│       └── index.astro             # Main CV page
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to view the site.

### Build for Production
```bash
# Build static files
npm run build

# Preview production build
npm run preview
```

## 📋 Content Sections

1. **Header**: Name, title, location, and profile links
2. **About**: Professional summary and career overview
3. **Education**: University degree information
4. **Experience**: Complete work history with roles and responsibilities
5. **Skills**: Technical competencies organized by category
6. **Languages**: Language proficiency levels
7. **References**: Available upon request

## 🎨 Design Features

- **Color Scheme**: Light background with blue accents (#2563eb)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Cards**: Subtle shadows and borders for content sections
- **Buttons**: Smooth hover transitions and professional styling
- **Icons**: Emoji-based icons for visual appeal

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: > 768px

## 🔧 Customization

### Updating Content
- Edit the content directly in `src/pages/index.astro`
- Update meta tags and SEO information in the frontmatter
- Keep personal documents outside of `public/`

### Styling Changes
- Modify Tailwind classes in the HTML
- Color scheme can be updated by changing blue color classes

## 🔒 Privacy Guard

- `npm run check:no-sensitive-docs` blocks `.pdf/.doc/.docx/.odt/.rtf` files in `public/`
- Deployment workflow also verifies `dist/` to ensure sensitive docs are never published

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run check:no-sensitive-docs` | Verifies no sensitive documents exist in `public/` |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deployment Options

This static site can be deployed to:
- **Vercel** (Recommended for Astro)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- Any static hosting service

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```

## 📧 Contact

**Müslüm GÜZEL**
- LinkedIn: [müslüm-güzel-2b60037a](https://linkedin.com/in/müslüm-güzel-2b60037a)

---

**© 2024 Müslüm GÜZEL. All rights reserved.**
