# Marijana's Stamps Page - Motion & Interaction Code

**Source:** https://marijanapav.com/stamps  
**Extracted:** All motion and interaction patterns

---

## 🎯 **Animation Library**

**No external animation libraries detected** - Uses **Framer Motion** (likely bundled with Next.js)

---

## 🎨 **Stamp Drag & Drop System**

### **Stamp Item Component Props** (from React Fiber)

```tsx
// Each stamp item uses Framer Motion with drag
<motion.li
  dragDisabled={false}
  data-index={0}
  data-id="typographic-0"
  index={0}
  id="typographic-0"
  initial={{
    opacity: 0,
    z: 1
  }}
  transition={{
    type: "spring",
    stiffness: 500,
    damping: 80
  }}
  role="listitem"
  tabIndex={-1}
  inert={false}
  dragTransition={{
    bounceStiffness: 100,
    bounceDamping: 10,
    power: 0.4
  }}
  dragConstraints={dragConstraintsRef}
  data-slot="stamp-container"
  className="focus-dashed group pointer-events-auto absolute z-[--z] flex items-center justify-center outline-offset-4 transition-[filter] duration-200 will-change-transform"
>
  <img
    src="/stamps/typographic/uruguay1.svg"
    alt="Uruguay"
    width={160}
    height={220}
    priority={true}
    loading="eager"
    style={{
      "--width": 160,
      "--height": 220,
      "--size-scale": 1
    }}
    data-slot="stamp-image"
    className="pointer-events-none h-auto w-[calc(var(--size-scale)*var(--width)*1px)] object-contain object-center drop-shadow transition-all duration-200"
  />
</motion.li>
```

### **Key Motion Properties:**

1. **Initial Animation:**
   ```tsx
   initial={{
     opacity: 0,
     z: 1
   }}
   ```

2. **Spring Transition:**
   ```tsx
   transition={{
     type: "spring",
     stiffness: 500,  // High stiffness = snappy
     damping: 80      // Medium damping = smooth but controlled
   }}
   ```

3. **Drag Physics:**
   ```tsx
   dragTransition={{
     bounceStiffness: 100,  // Lower = more bounce
     bounceDamping: 10,     // Lower = less resistance
     power: 0.4              // Lower = less momentum
   }}
   ```

4. **Drag Constraints:**
   ```tsx
   dragConstraints={dragConstraintsRef}  // Ref to container bounds
   ```

---

## 🎭 **CSS Keyframe Animations**

### **Enter/Exit Animations**

```css
@keyframes enter {
  0% {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(
      var(--tw-enter-translate-x, 0),
      var(--tw-enter-translate-y, 0),
      0
    ) scale3d(
      var(--tw-enter-scale, 1),
      var(--tw-enter-scale, 1),
      var(--tw-enter-scale, 1)
    ) rotate(var(--tw-enter-rotate, 0));
  }
}

@keyframes exit {
  100% {
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(
      var(--tw-exit-translate-x, 0),
      var(--tw-exit-translate-y, 0),
      0
    ) scale3d(
      var(--tw-exit-scale, 1),
      var(--tw-exit-scale, 1),
      var(--tw-exit-scale, 1)
    ) rotate(var(--tw-exit-rotate, 0));
  }
}
```

### **Slide Animations**

```css
@keyframes slideFromBottom {
  0% {
    transform: translate3d(0, var(--initial-transform, 100%), 0);
  }
  100% {
    transform: translate3d(0px, 0px, 0px);
  }
}

@keyframes slideToBottom {
  100% {
    transform: translate3d(0, var(--initial-transform, 100%), 0);
  }
}

@keyframes slideFromTop {
  0% {
    transform: translate3d(0, calc(var(--initial-transform, 100%) * -1), 0);
  }
  100% {
    transform: translate3d(0px, 0px, 0px);
  }
}

@keyframes slideToTop {
  100% {
    transform: translate3d(0, calc(var(--initial-transform, 100%) * -1), 0);
  }
}

@keyframes slideFromLeft {
  0% {
    transform: translate3d(calc(var(--initial-transform, 100%) * -1), 0, 0);
  }
  100% {
    transform: translate3d(0px, 0px, 0px);
  }
}

@keyframes slideToLeft {
  100% {
    transform: translate3d(calc(var(--initial-transform, 100%) * -1), 0, 0);
  }
}

@keyframes slideFromRight {
  0% {
    transform: translate3d(var(--initial-transform, 100%), 0, 0);
  }
  100% {
    transform: translate3d(0px, 0px, 0px);
  }
}

@keyframes slideToRight {
  100% {
    transform: translate3d(var(--initial-transform, 100%), 0, 0);
  }
}
```

### **Fade Animations**

```css
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  100% {
    opacity: 0;
  }
}
```

### **Text Animations**

```css
@keyframes shimmer-text {
  0% {
    background-position: -100% top;
  }
  100% {
    background-position: 250% top;
  }
}

@keyframes typewriter {
  0% {
    background-size: 0px 200%;
  }
}
```

---

## 🎯 **Filter Button Hover Interactions**

### **Button Classes & Transitions**

```tsx
<button
  className="flex h-full w-full items-center justify-center gap-1 px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-0 focus:outline-none focus-visible:bg-[--bg] focus-visible:text-[--fg] focus-visible:outline-none hover:enabled:border-solid hover:enabled:bg-[--bg] hover:enabled:text-[--fg] disabled:opacity-50 bg-[--bg] text-[--fg]"
>
  typographic
</button>
```

### **CSS Transition Properties:**

```css
/* Computed transition values */
transition: color cubic-bezier(0.4, 0, 0.2, 1),
            background-color cubic-bezier(0.4, 0, 0.2, 1),
            border-color cubic-bezier(0.4, 0, 0.2, 1),
            text-decoration-color cubic-bezier(0.4, 0, 0.2, 1),
            fill cubic-bezier(0.4, 0, 0.2, 1),
            stroke cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 0s;  /* Instant on hover */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

### **Hover States:**

- **Active Button:** `bg-[--bg] text-[--fg]`
- **Inactive Button:** `bg-[--muted-bg] text-[--muted-fg]`
- **Hover:** `hover:enabled:border-solid hover:enabled:bg-[--bg] hover:enabled:text-[--fg]`
- **Focus:** `focus-visible:bg-[--bg] focus-visible:text-[--fg]`

---

## ⌨️ **Keyboard Navigation**

**Keyboard Shortcuts:**
- **Arrow Keys** (Left/Right/Up/Down): Move focus between stamps
- **Home**: Jump to first stamp
- **End**: Jump to last stamp
- **Space**: Open stamp details

**Implementation Pattern:**
```tsx
// Stamps list container
<div
  role="list"
  tabIndex={0}
  aria-label="typographic Stamps List"
  className="pointer-events-none absolute inset-0 transform-gpu border focus-visible:outline-none"
>
  {/* Keyboard event handlers on container */}
</div>

// Individual stamp items
<li
  role="listitem"
  tabIndex={-1}  // Managed by parent container
  className="focus-dashed group pointer-events-auto absolute z-[--z] flex items-center justify-center outline-offset-4 transition-[filter] duration-200 will-change-transform"
>
  {/* Stamp content */}
</li>
```

---

## 🎨 **CSS Transform & GPU Acceleration**

### **Transform GPU Class:**

```css
.transform-gpu {
  transform: translate3d(
    var(--tw-translate-x),
    var(--tw-translate-y),
    0
  ) rotate(var(--tw-rotate))
    skewX(var(--tw-skew-x))
    skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x))
    scaleY(var(--tw-scale-y));
}
```

### **Will-Change Optimization:**

```css
.will-change-transform {
  will-change: transform;
}
```

### **Transition Duration:**

```css
.transition-[filter] {
  transition-property: filter;
  transition-duration: 200ms;
}
```

---

## 🎯 **Group Hover Effects**

### **Scale on Hover:**

```css
.group:hover .group-hover:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover:scale-110 {
  transform: scale(1.10);
}
```

### **Translate on Hover:**

```css
.group:hover .group-hover:translate-y-[-4px] {
  transform: translateY(-4px);
}

.group:hover .group-hover:translate-y-[calc(var(--title-height)*-1px)] {
  transform: translateY(calc(var(--title-height) * -1px));
}
```

---

## 📐 **Stamps List Container**

### **Container Props:**

```tsx
<div
  className="pointer-events-none absolute inset-0 transform-gpu border focus-visible:outline-none"
  role="list"
  tabIndex={0}
  aria-label="typographic Stamps List"
  style={{
    transform: "matrix(1, 0, 0, 1, 0, 0)",
    transformOrigin: "275.5px 372px"  // Center point for transforms
  }}
>
  {/* Stamp items */}
</div>
```

---

## 🎨 **Image Transitions**

### **Stamp Image Styles:**

```tsx
<img
  className="pointer-events-none h-auto w-[calc(var(--size-scale)*var(--width)*1px)] object-contain object-center drop-shadow transition-all duration-200"
  style={{
    "--width": 160,
    "--height": 220,
    "--size-scale": 1
  }}
/>
```

**Key Properties:**
- `transition-all duration-200`: Smooth transitions on all properties
- `drop-shadow`: CSS filter for depth
- `object-contain object-center`: Maintains aspect ratio
- CSS Variables for dynamic sizing

---

## 🎯 **Complete Implementation Example**

```tsx
import { motion } from 'framer-motion';
import { useRef } from 'react';

function StampsList() {
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dragConstraintsRef}
      className="pointer-events-none absolute inset-0 transform-gpu"
      role="list"
      tabIndex={0}
      aria-label="typographic Stamps List"
    >
      {stamps.map((stamp, index) => (
        <motion.li
          key={stamp.id}
          drag
          dragConstraints={dragConstraintsRef}
          dragTransition={{
            bounceStiffness: 100,
            bounceDamping: 10,
            power: 0.4
          }}
          initial={{ opacity: 0, z: 1 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 80
          }}
          className="focus-dashed group pointer-events-auto absolute z-[--z] flex items-center justify-center outline-offset-4 transition-[filter] duration-200 will-change-transform"
          role="listitem"
          tabIndex={-1}
        >
          <img
            src={stamp.src}
            alt={stamp.alt}
            width={160}
            height={220}
            className="pointer-events-none h-auto w-[calc(var(--size-scale)*var(--width)*1px)] object-contain object-center drop-shadow transition-all duration-200"
            style={{
              "--width": 160,
              "--height": 220,
              "--size-scale": 1
            }}
          />
        </motion.li>
      ))}
    </div>
  );
}
```

---

## 📝 **Summary of Motion Values**

| Property | Value | Purpose |
|----------|-------|---------|
| **Spring Stiffness** | 500 | High responsiveness |
| **Spring Damping** | 80 | Smooth but controlled |
| **Drag Bounce Stiffness** | 100 | Moderate bounce |
| **Drag Bounce Damping** | 10 | Less resistance |
| **Drag Power** | 0.4 | Lower momentum |
| **Transition Duration** | 200ms | Quick transitions |
| **Transition Timing** | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth easing |

---

**Note:** All code extracted from live React Fiber props and computed styles. These are the exact values used in production.

