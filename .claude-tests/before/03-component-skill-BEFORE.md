# Test 3: Component Skill - BEFORE State

## Test Prompt
"Create a ServiceCard component showing an icon, title, and description"

## Current State
- No documented component patterns
- No skill teaching project-specific styling
- Claude must infer patterns from existing code

## Observations (Without Component Skill)

### What Claude Might Generate:
Without explicit guidance, Claude might create:

```tsx
// Option A: Tailwind utility classes (WRONG for this project)
const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

// Option B: Sans-serif font assumption (WRONG)
const ServiceCard = ({ icon, title, description }) => {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      ...
    </div>
  );
};
```

### Problems Without Skill:
1. **Wrong styling approach**: Might use Tailwind utilities instead of custom CSS classes
2. **Wrong colors**: Might use generic grays instead of project's brown theme
3. **Wrong font**: Might assume sans-serif instead of monospace
4. **Wrong card pattern**: Project uses bordered tables/grids, not rounded cards
5. **Missing CSS variables**: Won't use `var(--bg)`, `var(--text)`, etc.

### Expected Pattern Violations:
- Background: `bg-gray-800` vs `var(--bg-light)`
- Text: `text-white` vs `var(--text)`
- Border radius: `rounded-lg` vs sharp corners or `border`
- Font: System default vs `IBM Plex Mono`

## Quality Assessment (Before Enhancement)
- **Pattern Adherence**: Low - likely to deviate from project style
- **Styling Consistency**: Low - wrong approach likely
- **Reusability**: Medium - component works but doesn't fit
- **Integration Effort**: High - needs manual restyling
