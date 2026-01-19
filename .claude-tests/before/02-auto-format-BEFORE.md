# Test 2: Auto-Format Hook - BEFORE State

## Test Prompt
"Add a ContactForm component with email and message fields"

## Current State
- Prettier is configured (`.prettierrc` exists)
- No automatic formatting after Claude edits files
- Manual `npm run format` required

## Observations (Without Auto-Format Hook)

### What Happens Now:
1. Claude creates/edits file
2. File may have inconsistent formatting:
   - Wrong indentation (2 vs 4 spaces)
   - Inconsistent quotes
   - Missing/extra semicolons
   - Line length violations
3. User must manually run `npm run format`
4. Git diff shows formatting changes mixed with logic changes

### Example Issue:
Claude might generate:
```tsx
const ContactForm: React.FC = () => {
    return (
        <form>
            <input type="email" placeholder="Email"/>
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send</button>
        </form>
    )
}
```

But project uses 2-space indentation, single quotes, and semicolons.

### Problems:
- Inconsistent code style in commits
- Extra step for user to format
- Messy git history (formatting mixed with changes)
- CI/CD might fail on format checks

## Quality Assessment (Before Enhancement)
- **Code Consistency**: Variable - depends on Claude's defaults
- **User Experience**: Extra manual step required
- **Git History**: Potentially cluttered
- **CI Compatibility**: Risk of format check failures
