# 🎨 Figma to Code: Perfect Translation Guide

This guide ensures your Figma designs translate perfectly to responsive code.

---

## 🎯 Problem: Why Figma → Code is Hard

1. **Figma uses fixed px values** → Code needs responsive %/rem
2. **Figma has static breakpoints** → Code needs fluid responsiveness  
3. **Manual translation loses precision** → Need automated tools
4. **No spacing standards** → Developers guess values

---

## ✅ Solution 1: Setup Figma Correctly

### **Step 1: Use Auto Layout (Critical!)**

Instead of absolute positioning, use **Auto Layout** for EVERYTHING:

```
✅ Auto Layout:
- Spacing between items: 16px (not manual positioning)
- Padding: 24px (not eyeballing it)
- Direction: Vertical/Horizontal
- Alignment: Center/Start/End

❌ Absolute Positioning:
- X: 245px, Y: 389px (breaks on different screens)
```

**How to convert:**
1. Select your frame
2. Right-click → "Add Auto Layout" (or Shift+A)
3. Set padding, gap, and alignment in the right panel

---

### **Step 2: Use Variables for Spacing**

Create **Figma Variables** that match our design system:

**In Figma:**
1. Go to "Variables" panel (right sidebar)
2. Create a collection called "Spacing"
3. Add these values:

```
spacing/xs   = 8
spacing/sm   = 16
spacing/md   = 24
spacing/lg   = 32
spacing/xl   = 48
spacing/2xl  = 64
spacing/3xl  = 80
```

4. Now use these variables everywhere instead of typing numbers

**Why this matters:**
When you use variables in Figma, Dev Mode shows the variable name, making it CLEAR what value to use in code.

---

### **Step 3: Create 3 Frames (Not Just 2)**

Most designers create:
- ❌ Desktop (1440px)
- ❌ Mobile (375px)

**You should create:**
- ✅ Mobile (375px)
- ✅ Tablet (768px) ← Missing!
- ✅ Desktop (1440px)

**Why?** Cursor AI and I can see the tablet design and understand how things should transition.

---

### **Step 4: Name Layers Semantically**

```
❌ Bad: Rectangle 47, Frame 123, Group 89
✅ Good: hero-card, stats-container, principle-card-1

❌ Bad: Text Layer
✅ Good: section-heading, card-title, body-text
```

This helps when converting to code - I can see what each element IS, not just what it looks like.

---

## ✅ Solution 2: Use Figma Dev Mode

**Figma Dev Mode** is a game-changer (and it's FREE):

1. In Figma, click "Dev Mode" (bottom right, or Shift+D)
2. Select any element
3. See the exact spacing, padding, colors, fonts
4. Copy CSS/Tailwind values directly

**This eliminates guessing!**

When you send me a Figma link, I can inspect it in Dev Mode and get EXACT values.

---

## ✅ Solution 3: Figma-to-Code Plugins

These plugins can auto-generate React code from your Figma designs:

### **1. Anima (Recommended)**
- Exports React + Tailwind
- Preserves responsive behavior
- $0-39/month

### **2. Locofy.ai**
- AI-powered Figma → React
- Good for complex layouts
- Free tier available

### **3. Figma to Code (VS Code Extension)**
- Right-click in Figma → "Copy as React"
- Free, open source
- Good for simple components

### **How to use:**
1. Design in Figma with Auto Layout
2. Run plugin to generate code
3. Paste into your project
4. Refine with Cursor AI

**This gives us 80% accuracy instead of starting from 0%.**

---

## ✅ Solution 4: Component Library Workflow

**The Pro Way (What Marijana does):**

1. **Design in Figma** with components
2. **Build in Storybook** (component library)
3. **Compose in pages** (assembling pre-built components)

**For you:**
1. Design reusable components in Figma (buttons, cards, inputs)
2. Build them ONCE in code using shadcn/ui or custom
3. Store in `src/components/ui/`
4. Reuse everywhere - guaranteed consistency

---

## 📏 Responsive Design Checklist

When designing in Figma, ensure:

- [ ] All frames use **Auto Layout** (not absolute positioning)
- [ ] **Spacing uses variables** from design system
- [ ] **3 breakpoints** designed (mobile, tablet, desktop)
- [ ] **Text has max-width** (so it doesn't stretch on large screens)
- [ ] **Images have constraints** (scale, fill, fit)
- [ ] **Layers are named semantically**
- [ ] **Components are reusable** (not one-off designs)

---

## 🛠️ Using the Design System in Code

Import the design system we just created:

```tsx
import { 
  spacing, 
  sectionSpacing, 
  borderRadius,
  getResponsiveSectionPadding,
  getResponsiveSectionSpacing 
} from '@/styles/design-system';

// Example: Section with consistent spacing
<section 
  className={`
    ${getResponsiveSectionPadding()}
    ${getResponsiveSectionSpacing()}
    w-full max-w-[1280px] mx-auto
  `}
>
  {/* Your content */}
</section>

// Example: Card with design system values
<div 
  style={{
    padding: spacing.lg,           // 32px
    borderRadius: borderRadius.xl, // 20px
    gap: spacing.md                // 24px
  }}
>
  {/* Card content */}
</div>
```

---

## 🎯 The Perfect Workflow

```
1. Design in Figma
   ↓ (with Auto Layout, Variables, 3 breakpoints)
   
2. Get exact values from Dev Mode
   ↓ (or use Anima/Locofy for auto-generation)
   
3. Use design-system.ts tokens
   ↓ (ensures consistency)
   
4. Test in browser
   ↓ (on real devices)
   
5. Refine with Cursor AI
   ↓ (I can now see the design system and match it perfectly)
```

---

## 💡 Quick Wins for Your Current Project

Let me help you:

1. **Share your Figma file** with me (send link)
2. I'll extract the spacing/padding values
3. We'll update design-system.ts to match YOUR designs
4. I'll refactor your existing components to use it
5. **Everything will be pixel-perfect and consistent**

---

## 📚 Resources

- [Figma Auto Layout Guide](https://help.figma.com/hc/en-us/articles/360040451373)
- [Figma Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247)
- [Design Tokens in Figma](https://help.figma.com/hc/en-us/articles/15339657135383)
- [Marijana's GitHub (for reference)](https://github.com/buka-studio/www-marijanapav)

---

**Bottom line:** The problem isn't you or me - it's the workflow. Fix the workflow, and development becomes 10x easier. 🚀

