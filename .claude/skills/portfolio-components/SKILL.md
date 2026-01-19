---
name: portfolio-components
description: Use this skill when creating React components for the portfolio. Covers styling patterns, CSS classes, colors, typography, and component structure. Activate for tasks involving: new components, UI elements, cards, sections, grids, tables, buttons.
allowed-tools:
  - Read
  - Edit
  - Write
  - Glob
---

# Portfolio Components Skill

## When to Use
Activate this skill when:
- Creating new React components
- Adding UI elements (cards, grids, tables)
- Styling existing components
- Building new sections for the portfolio

## Design System

### Color Palette (USE THESE EXACTLY)
```css
var(--bg)          /* #1a1715 - Main background (dark brown) */
var(--bg-light)    /* #252220 - Card/hover background */
var(--text)        /* #e8e4e0 - Primary text (cream) */
var(--text-muted)  /* #a8a4a0 - Secondary text */
var(--accent)      /* #ff6b35 - Orange accent */
var(--border)      /* #3a3835 - Borders */
```

### Typography
- **Font**: `'IBM Plex Mono', monospace` (ALWAYS monospace)
- **Headings**: Lowercase, 11-14px for labels
- **Body**: 14px base, line-height 1.6

### DO NOT USE
❌ Tailwind utility classes like `bg-gray-800`, `rounded-lg`
❌ Sans-serif fonts
❌ Light backgrounds
❌ Rounded corners (use sharp or subtle border-radius)
❌ Box shadows (use borders instead)

## Component Patterns

### Section Component
```tsx
const NewSection: React.FC = () => {
  return (
    <div className="section-row">
      <div className="section-label">
        section<br />title
      </div>
      <div className="section-content">
        {/* Content here */}
      </div>
    </div>
  );
};
```

### Card Component
```tsx
// Use borders, not shadows. Use CSS variables.
<div style={{
  background: 'var(--bg-light)',
  border: '1px solid var(--border)',
  padding: '24px',
}}>
  <h3 style={{ color: 'var(--text)', fontSize: '14px' }}>Title</h3>
  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Description</p>
</div>
```

### Grid Component
```tsx
// Use the social-grid pattern for icon/item grids
<div className="social-grid">
  {items.map(item => (
    <a key={item.id} href={item.url}>
      {item.icon}
    </a>
  ))}
</div>
```

### Table Component
```tsx
<table className="data-table">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    {data.map(row => (
      <tr key={row.id}>
        <td>{row.value1}</td>
        <td>{row.value2}</td>
      </tr>
    ))}
  </tbody>
</table>
<div className="dither-pattern"></div>
```

### Button Component
```tsx
<button className="play-button">
  ▶ Button Text
</button>

// Or inline:
<button style={{
  background: 'transparent',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '8px 16px',
  fontFamily: 'inherit',
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  cursor: 'pointer',
}}>
  Button
</button>
```

### Link Style
```tsx
// Links are underlined, not colored differently
<a href="#" style={{
  color: 'var(--text)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
}}>
  Link text
</a>
```

## Good Examples

### ✅ Correct: Service Card
```tsx
const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div style={{
      background: 'var(--bg-light)',
      border: '1px solid var(--border)',
      padding: '24px',
    }}>
      <div style={{ color: 'var(--accent)', marginBottom: '16px' }}>
        {icon}
      </div>
      <h3 style={{
        color: 'var(--text)',
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '8px',
        textTransform: 'lowercase',
      }}>
        {title}
      </h3>
      <p style={{
        color: 'var(--text-muted)',
        fontSize: '13px',
        lineHeight: 1.6,
      }}>
        {description}
      </p>
    </div>
  );
};
```

## Bad Examples

### ❌ Wrong: Using Tailwind
```tsx
// DON'T DO THIS
const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
    <h3 className="text-xl font-bold text-white">{title}</h3>
  </div>
);
```

### ❌ Wrong: Using wrong colors
```tsx
// DON'T DO THIS
<div style={{ background: '#333', color: '#fff' }}>
```

### ❌ Wrong: Sans-serif font
```tsx
// DON'T DO THIS
<p style={{ fontFamily: 'Inter, sans-serif' }}>
```

## File Location
- New sections: Add to `src/components/portfolio/Portfolio.tsx`
- Reusable components: Create in `src/components/ui/`
- Case study specific: Add to relevant file in `src/components/generated/`
