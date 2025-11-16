# 📐 Spacing Cheat Sheet (Hybrid System)

**Quick reference for consistent spacing, padding, and sizing**

---

## 🎯 **The Simple Rule**

### **FIXED** = Keep the same everywhere (like Marijana)
### **RESPONSIVE** = Scale across breakpoints

---

## ✅ **FIXED VALUES** (Use these for most things)

### **Card & Element Padding**
```tsx
import { fixedPadding } from '@/styles/spacing-tokens'

✅ Card padding:     12px  (fixedPadding.sm)
✅ Button padding:   8px   (fixedPadding.xs)
✅ Input padding:    16px  (fixedPadding.md)
```

**Tailwind:**
```tsx
<div className="p-[12px]">        // Card padding
<button className="px-[16px] py-[8px]">  // Button
```

---

### **Gaps Between Elements**
```tsx
import { fixedGap } from '@/styles/spacing-tokens'

✅ Icon + text:      8px   (fixedGap.xs)
✅ Buttons/pills:    12px  (fixedGap.sm)  ← FROM FIGMA
✅ Cards in row:     16px  (fixedGap.md)
✅ Sections:         20px  (fixedGap.lg)
```

**Tailwind:**
```tsx
<div className="flex gap-[12px]">     // Buttons
<div className="grid gap-[16px]">    // Cards
```

---

### **Border Radius**
```tsx
import { fixedRadius } from '@/styles/spacing-tokens'

✅ Small buttons:    12px  (fixedRadius.md)
✅ Cards:            16px  (fixedRadius.lg)
✅ Chatbox:          44px  (fixedRadius['4xl'])  ← FROM FIGMA
✅ Pills:            9999px (fixedRadius.full)
```

**Tailwind:**
```tsx
<div className="rounded-[16px]">     // Cards
<div className="rounded-[44px]">     // Chatbox
<button className="rounded-full">   // Pills
```

---

## 📱 **RESPONSIVE VALUES** (Scale these!)

### **Container Horizontal Padding**
```tsx
import { containerPaddingX, tw } from '@/styles/spacing-tokens'

Mobile:  16px
Tablet:  20px  (Marijana's px-5)
Desktop: 22px  (FROM FIGMA)
```

**Tailwind (auto-generated):**
```tsx
<div className={tw.containerX()}>
// Outputs: "px-[16px] md:px-[20px] lg:px-[22px]"
```

---

### **Section Vertical Padding** (inside sections)
```tsx
import { sectionPaddingY, tw } from '@/styles/spacing-tokens'

Mobile:  20px  (Marijana: py-5)
Tablet:  32px
Desktop: 48px  (Marijana: md:py-12)
```

**Tailwind:**
```tsx
<section className={tw.sectionY()}>
// Outputs: "py-[20px] md:py-[32px] lg:py-[48px]"
```

---

### **Section Vertical Spacing** (between sections)
```tsx
import { sectionSpacingY, tw } from '@/styles/spacing-tokens'

Mobile:  40px
Tablet:  60px
Desktop: 80px
```

**Tailwind:**
```tsx
<section className={tw.spacingY()}>
// Outputs: "mt-[40px] md:mt-[60px] lg:mt-[80px]"
```

---

### **Font Sizes**
```tsx
import { fontSize } from '@/styles/spacing-tokens'

Body text:
Mobile:  14px → Desktop: 16px

Button text:
Mobile:  13px → Desktop: 14px (FROM FIGMA)

Headings:
Mobile:  32px → Desktop: 48px
```

---

## 🎨 **Common Patterns**

### **Pattern 1: Section Container**
```tsx
import { tw } from '@/styles/spacing-tokens'

<section className={`${tw.containerX()} ${tw.sectionY()} ${tw.spacingY()}`}>
  {/* Content */}
</section>

// Result:
// Horizontal padding: 16px → 20px → 22px
// Vertical padding:   20px → 32px → 48px
// Top margin:         40px → 60px → 80px
```

### **Pattern 2: Card**
```tsx
<div className="p-[12px] gap-[16px] rounded-[16px]">
  {/* FIXED values - same everywhere */}
</div>
```

### **Pattern 3: Flexbox with Pills**
```tsx
<div className="flex gap-[12px] items-center justify-center">
  <button className="px-[16px] py-[8px] rounded-full">
    Pill 1
  </button>
</div>

// Gap: 12px (FROM FIGMA)
// Padding: Fixed everywhere
```

### **Pattern 4: Chatbox**
```tsx
import { chatbox } from '@/styles/spacing-tokens'

<div 
  className={tw.containerX()}  // Responsive horizontal padding
  style={{
    height: chatbox.height.mobile,  // Changes per breakpoint
    borderRadius: chatbox.radius,   // Fixed 44px (FROM FIGMA)
  }}
>
  <div className="flex flex-col gap-[12px]">  // Fixed gap
    {/* Messages */}
  </div>
</div>
```

---

## 🔑 **Decision Tree**

```
Is it internal padding/gaps? 
  ↓ YES
  → Use FIXED values (12px, 16px, etc.)
  
Is it container padding?
  ↓ YES
  → Use RESPONSIVE (tw.containerX())
  
Is it spacing between sections?
  ↓ YES
  → Use RESPONSIVE (tw.spacingY())
  
Is it font size?
  ↓ YES
  → Use RESPONSIVE (fontSize.body, etc.)
```

---

## 📊 **Quick Values Table**

| What | Mobile | Tablet | Desktop | Type |
|------|--------|--------|---------|------|
| **Card padding** | 12px | 12px | 12px | FIXED |
| **Pills gap** | 12px | 12px | 12px | FIXED |
| **Cards gap** | 16px | 16px | 16px | FIXED |
| **Container padding** | 16px | 20px | 22px | RESPONSIVE |
| **Section padding** | 20px | 32px | 48px | RESPONSIVE |
| **Section spacing** | 40px | 60px | 80px | RESPONSIVE |

---

## 💡 **Pro Tips**

1. **When in doubt, keep it fixed** (Marijana's way)
2. **Only scale containers and sections** (not small elements)
3. **Use the `tw` helpers** for responsive values (auto-generates classes)
4. **Reference this sheet** when building new components

---

## 🚀 **Import Examples**

```tsx
// Option 1: Import what you need
import { fixedPadding, fixedGap, tw } from '@/styles/spacing-tokens'

// Option 2: Import everything
import spacing from '@/styles/spacing-tokens'

// Usage:
<div className={spacing.tw.containerX()}>
<div className="p-[12px]">
```

---

**Remember:** Your layouts stay the same, just use these values for consistency! ✨

