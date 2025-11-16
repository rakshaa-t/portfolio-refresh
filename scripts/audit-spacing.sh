#!/bin/bash

# Spacing System Audit Script
# Finds all spacing issues in your components

echo "🔍 Auditing Spacing System..."
echo ""

# Colors
RED='\033[0:31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Find all tight gaps (less than 12px)
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${YELLOW}🔸 TIGHT GAPS (<12px) - Should be at least 12px:${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
grep -rn "gap-\[[0-9]px\]" src/components/ --include="*.tsx" --include="*.ts" || echo "  ${GREEN}✓ No issues found${NC}"
grep -rn "gap-\[1[01]px\]" src/components/ --include="*.tsx" --include="*.ts" || echo "  ${GREEN}✓ No issues found${NC}"
echo ""

# Find responsive gaps (should be fixed)
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${YELLOW}🔸 RESPONSIVE GAPS - Should be fixed (Marijana's way):${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
grep -rn "gap-\[.*md:gap" src/components/ --include="*.tsx" --include="*.ts" || echo "  ${GREEN}✓ No issues found${NC}"
echo ""

# Find non-standard gap values
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${YELLOW}🔸 NON-STANDARD GAP VALUES:${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "  ${YELLOW}(Recommended: 12px, 16px, 20px, 32px)${NC}"
grep -rn "gap-\[[0-9]*px\]" src/components/ --include="*.tsx" --include="*.ts" | \
  grep -v "gap-\[12px\]" | \
  grep -v "gap-\[16px\]" | \
  grep -v "gap-\[20px\]" | \
  grep -v "gap-\[32px\]" | \
  grep -v "gap-\[200px\]" || echo "  ${GREEN}✓ All gaps are standard values${NC}"
echo ""

# Find non-standard padding values
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${YELLOW}🔸 NON-STANDARD PADDING VALUES:${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "  ${YELLOW}(Recommended: 12px, 16px, 20px, 22px)${NC}"
grep -rn "p-\[[0-9]*px\]" src/components/ --include="*.tsx" --include="*.ts" | \
  grep -v "p-\[12px\]" | \
  grep -v "p-\[16px\]" | \
  grep -v "p-\[20px\]" | \
  grep -v "p-\[22px\]" | \
  grep -v "p-\[1px\]" | \
  grep -v "p-\[13px\]" || echo "  ${GREEN}✓ All padding values are standard${NC}"
echo ""

# Find responsive padding that should use helpers
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${YELLOW}🔸 RESPONSIVE PADDING - Should use tw helpers:${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
grep -rn "px-\[.*md:px" src/components/ --include="*.tsx" --include="*.ts" | \
  grep -v "tw.containerX" || echo "  ${GREEN}✓ All responsive padding uses helpers${NC}"
echo ""

# Find non-standard border radius
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${YELLOW}🔸 NON-STANDARD BORDER RADIUS:${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "  ${YELLOW}(Recommended: 12px, 16px, 20px, 24px, 32px, 44px, 9999px)${NC}"
grep -rn "rounded-\[[0-9]*px\]" src/components/ --include="*.tsx" --include="*.ts" | \
  grep -v "rounded-\[12px\]" | \
  grep -v "rounded-\[16px\]" | \
  grep -v "rounded-\[20px\]" | \
  grep -v "rounded-\[24px\]" | \
  grep -v "rounded-\[32px\]" | \
  grep -v "rounded-\[44px\]" | \
  grep -v "rounded-\[9999px\]" | \
  grep -v "rounded-\[100px\]" | \
  grep -v "rounded-\[3333px\]" | \
  grep -v "rounded-\[2222px\]" || echo "  ${GREEN}✓ All border radius values are standard${NC}"
echo ""

# Summary
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${GREEN}✅ Audit Complete!${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "${YELLOW}📋 Next Steps:${NC}"
echo "  1. Review issues above"
echo "  2. Fix high-priority components first"
echo "  3. Reference: SPACING_CHEAT_SHEET.md"
echo "  4. Use: import { tw, fixedGap, fixedPadding } from '@/styles/spacing-tokens'"
echo ""

