# Portfolio-Refresh Project

## Stack
- **Framework**: React 19 + TypeScript
- **Build**: Vite
- **Styling**: Custom CSS with CSS variables (retro terminal aesthetic)
- **Font**: IBM Plex Mono (monospace throughout)
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Key Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run format   # Run Prettier
```

## Project Structure
```
src/
├── components/
│   ├── portfolio/     # Main portfolio components
│   │   └── Portfolio.tsx  # Homepage with all sections
│   ├── generated/     # Case study pages
│   └── ui/            # Reusable UI components
├── index.css          # Global styles + design system
└── App.tsx            # Router setup
```

## Design System

### Colors (CSS Variables)
```css
--bg: #1a1715           /* Dark brown background */
--bg-light: #252220     /* Card/hover background */
--text: #e8e4e0         /* Primary text (cream) */
--text-muted: #a8a4a0   /* Secondary text */
--accent: #ff6b35       /* Orange accent */
--border: #3a3835       /* Borders/dividers */
```

### Layout Pattern
All sections use a **two-column layout**:
```html
<div class="section-row">
  <div class="section-label">Section Title</div>
  <div class="section-content">Content here</div>
</div>
```

### Key CSS Classes
- `.section-row` - Two-column grid (140px label | content)
- `.section-label` - Uppercase, muted, right-aligned label
- `.section-content` - Main content area (max 560px)
- `.data-table` - Bordered table with header
- `.dither-pattern` - Decorative pixel divider
- `.social-grid` - 3x2 grid with borders

### Link Style
Links use **underline** (not color change):
```css
a { text-decoration: underline; text-underline-offset: 3px; }
```

## Code Style
- Functional components only
- Inline styles for one-off styling, CSS classes for reusable patterns
- All text lowercase for headings (aesthetic choice)
- Keep components in Portfolio.tsx unless reused elsewhere

## Routes
- `/` - Main portfolio (Portfolio.tsx)
- `/greex`, `/ova`, `/ioc`, `/dealdoc` - Case study pages

## Critical Notes
- **Monospace font everywhere** - no sans-serif
- **Dark theme** - never use light backgrounds
- **Retro terminal aesthetic** - pixel patterns, bordered tables, ASCII art
- **Mobile responsive** - sections stack on mobile (<768px)
