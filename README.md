# Drone Soccer Website

A modern, professional website for a Drone Soccer Team & Organization built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, sporty, and futuristic interface with blue, red, and white color scheme
- **Fully Responsive**: Mobile-first design that works perfectly on all screen sizes
- **Optimized Performance**: Built with Next.js 14 for blazing-fast page loads
- **Type-Safe**: Written in TypeScript for better code quality and developer experience
- **Professional Components**:
  - Auto-rotating hero carousel
  - Interactive navigation with dropdown menus
  - Responsive forms
  - Animated progress bars
  - Product catalog with filtering

## Pages

1. **Home** - Hero carousel with auto-rotation, quick info cards, and statistics
2. **About Drone Soccer** - Comprehensive information about the sport with mission, values, and global impact
3. **About Team** - Team member profiles and achievements
4. **Lessons** - Four training courses (General, Racing, Class 40, Class 20)
5. **Apply** - Registration form for new members
6. **Competitions** - Information about Class 40, Class 20, and Racing competitions
7. **Shop** - E-commerce product catalog with category filtering

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Orbitron (headers) & Inter (body)
- **Icons**: Heroicons (SVG)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dronsoccer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
dronsoccer/
├── app/
│   ├── about-drone-soccer/
│   │   └── page.tsx
│   ├── about-team/
│   │   └── page.tsx
│   ├── apply/
│   │   └── page.tsx
│   ├── competitions/
│   │   └── page.tsx
│   ├── lessons/
│   │   └── page.tsx
│   ├── shop/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── HeroCarousel.tsx
├── public/
│   └── images/
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Customization

### Colors

The primary colors are defined in `tailwind.config.ts`:
- Blue: `#0066CC`
- Red: `#DC143C`
- White: `#FFFFFF`

### Fonts

Custom fonts are configured in `app/layout.tsx`:
- Orbitron: Used for headings and brand elements
- Inter: Used for body text

### Adding Images

To add actual images:
1. Place images in the `public/images/` directory
2. Reference them using `/images/your-image.jpg`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with one click

### Other Platforms

Build the project:
```bash
npm run build
```

The output will be in the `.next` folder, ready for deployment.

## Future Enhancements

- [ ] Add backend API integration
- [ ] Implement shopping cart functionality
- [ ] Add user authentication
- [ ] Integrate payment processing
- [ ] Add real-time competition scores
- [ ] Implement blog/news section
- [ ] Add multilingual support

## License

This project is proprietary and confidential.

## Contact

For questions or support, contact: info@dronesoccer.com

---

Built with ❤️ for the Drone Soccer community
