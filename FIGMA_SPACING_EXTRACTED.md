# 📐 Exact Spacing Values from Figma

**Source:** https://www.figma.com/design/ALGMQumxMv07s5sUYgx259/Personal-Portfolio?node-id=0-348&m=dev

---

## 🎨 **CHATBOX CONTAINER**

```
Width: 748.93px (desktop)
Height: 544px
Border Radius: 44px
Background: linear-gradient(to-b, #e9e8ff, #eff4ec)
Border: 2px solid white
```

---

## 💬 **CHAT MESSAGES**

### **Message Bubble**
```
Text Size: 16px
Font: Outfit Light
Width: 426px (text container)
Padding: Not explicitly defined (need to inspect bubble)
Border Radius: 30px (based on your current design)
```

### **Avatar**
```
Size: 48px × 48px (based on your current design)
Border Radius: 50% (circular)
Gap from text: 12px (estimated from layout)
```

---

## 🔘 **SUGGESTION PILLS**

```
Container Height: 115px
Container Width: 662px
Gap Between Pills: 12px

Individual Pill:
- Height: 37px
- Padding: Horizontal dynamic (auto-sized)
- Border Radius: 2222px (fully rounded)
- Background: rgba(255, 255, 255, 0.1)
- Text Size: 14px
- Text Color: rgba(0, 0, 0, 0.64)
- Font: Outfit Regular
```

---

## ⌨️ **INPUT CONTAINER**

```
Height: 63px
Horizontal Padding: 22px
Vertical Padding: 6px
Border Radius: 100px (fully rounded)
Background: linear-gradient(to-r, rgba(255,255,255,0.12), rgba(255,255,255,0.44))
Border: 1px solid white
Gap between elements: 12px
```

### **Input Text**
```
Text Size: 16px
Text Color: rgba(0, 0, 0, 0.44)
Placeholder: "talk 2 me"
Font: Outfit Regular
```

### **Send Button**
```
Size: 50px × 50px
Padding: 13px (internal for icon)
Border Radius: 3333px (fully rounded)
Background: white
Shadow: Complex multi-layer shadow
Icon: 24px arrow-up (blue #283fe4)
```

---

## 📏 **SECTION SPACING (Desktop)**

Based on your full portfolio layout:

```
Between Hero and Projects: ~120px (estimated)
Between Sections: 80-100px (estimated)
Container Max Width: 1293px (footer section)
Container Horizontal Padding: 22px
```

---

## 🎯 **KEY INSIGHTS**

### **Your Design Uses:**
1. **12px as base unit** (gaps, spacing)
2. **Extreme border radius values** (44px, 100px, 2222px, 3333px)
3. **22px horizontal padding** (consistent across containers)
4. **37px pill height** (specific height for interactive elements)
5. **50-63px for main interactive elements** (buttons, input bars)

### **Responsive Strategy:**

Since you only have desktop, I'll create mobile/tablet using these ratios:

```
Desktop → Tablet → Mobile

Container Width:
748.93px → 600px (80%) → 100% (full width)

Text Sizes:
16px → 16px → 14px

Padding:
22px → 18px (82%) → 16px (73%)

Gaps:
12px → 10px → 8px

Border Radius:
44px → 44px → 32px (for large elements)

Pills Height:
37px → 37px → 37px (maintain height)

Input Height:
63px → 56px → 56px
```

---

## 🔥 **NEXT STEPS**

I'll now:
1. ✅ Update `design-system.ts` with YOUR exact values
2. ✅ Create responsive scales (mobile/tablet) based on these
3. ✅ Refactor your chatbox to use exact Figma values
4. ✅ Document everything so I always reference it

**No guessing anymore!** 🎯

