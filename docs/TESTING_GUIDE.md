# MARKDOWN TESTING GUIDE

## Validation & Quality Assurance untuk Generated Documentation

---

## PURPOSE

Ensure generated `.md` files are:

- ✅ Valid markdown syntax
- ✅ Properly formatted
- ✅ Complete content (no empty sections)
- ✅ Readable and well-structured
- ✅ Actionable (users can follow instructions)

---

## TESTING APPROACH

### **Phase 1: Syntax Validation (5 min)**

#### Test 1.1: Markdown Parsing

```
For each .md file generated (README, SETUP, ARCHITECTURE):

1. Copy the markdown content
2. Paste into: https://dillinger.io (online markdown editor)
3. Check:
   [ ] No red errors/warnings
   [ ] All headers render correctly
   [ ] Code blocks have proper syntax highlighting
   [ ] Links are valid (blue/underlined)
   [ ] Lists are properly indented
   [ ] Tables render correctly (if any)
```

**Result:** ✅ PASS or ❌ FAIL (if fails, markdown syntax broken)

---

#### Test 1.2: Header Structure

```
Check that each .md file has proper heading hierarchy:

README.md should have:
  [ ] # Main title (1 H1)
  [ ] ## Sections (multiple H2s)
  [ ] No H4+ before H2 (hierarchy broken)

SETUP.md should have:
  [ ] # Setup Guide (1 H1)
  [ ] ## Prerequisites, Installation, Environment Variables (H2)
  [ ] ### Subsections (H3 for detailed steps)

ARCHITECTURE.md should have:
  [ ] # Architecture Guide (1 H1)
  [ ] ## System Overview, Components, Data Flow (H2)
  [ ] No random jumps (H1 → H4 bad, H1 → H2 good)
```

**Result:** ✅ Hierarchy correct or ⚠️ Fix needed

---

### **Phase 2: Content Completeness (10 min)**

#### Test 2.1: README.md Content

```markdown
✓ Checklist for README.md:

[ ] Title/Project Name present
[ ] Description (2+ paragraphs, not 1 sentence)
[ ] Quick Start section with 5+ steps
[ ] Features list (5+ items with descriptions)
[ ] Tech Stack with links to technologies
[ ] Folder Structure (ASCII tree or description)
[ ] Prerequisites mentioned
[ ] Installation instructions complete
[ ] How to run locally (dev commands)
[ ] Contributing guidelines (if applicable)
[ ] License mentioned (if applicable)

Grade:

- 9-10 items ✅ EXCELLENT
- 7-8 items ✅ GOOD
- 5-6 items ⚠️ ACCEPTABLE
- <5 items ❌ INCOMPLETE
```

**Testing script:** Count presence of each section

---

#### Test 2.2: SETUP.md Content

```markdown
✓ Checklist for SETUP.md:

[ ] Prerequisites section with version requirements
[ ] Installation steps (numbered, 5+ steps)
[ ] Environment variables section with .env template
[ ] Database setup instructions
[ ] Configuration for each service (frontend, backend, etc)
[ ] Running locally section with actual commands
[ ] Troubleshooting section (3+ common issues)
[ ] Commands are copy-paste ready (proper formatting)
[ ] Paths are correct and consistent
[ ] No references to undefined variables

Grade:

- 9-10 items ✅ EXCELLENT
- 7-8 items ✅ GOOD
- 5-6 items ⚠️ ACCEPTABLE
- <5 items ❌ INCOMPLETE
```

**Testing script:** Try following instructions - do they work?

---

#### Test 2.3: ARCHITECTURE.md Content

```markdown
✓ Checklist for ARCHITECTURE.md:

[ ] System overview (3+ paragraphs explaining architecture)
[ ] Architecture diagram (ASCII or description)
[ ] Component descriptions (Frontend, Backend, Database, Cache)
[ ] Data flow explanation (step-by-step)
[ ] API overview (endpoints or GraphQL schema)
[ ] Deployment strategy described
[ ] Scaling considerations mentioned
[ ] Security considerations mentioned
[ ] Technology choices justified
[ ] Example data flow with concrete example

Grade:

- 9-10 items ✅ EXCELLENT
- 7-8 items ✅ GOOD
- 5-6 items ⚠️ ACCEPTABLE
- <5 items ❌ INCOMPLETE
```

**Testing script:** Can someone understand how the system works from this?

---

### **Phase 3: Accuracy Testing (10 min)**

#### Test 3.1: README Accuracy

```
For each tech mentioned in README:

1. Check tech stack matches Agent 1 recommendation
   [ ] Frontend framework matches recommendation
   [ ] Backend framework matches recommendation
   [ ] Database matches recommendation
   [ ] Deployment matches recommendation
   [ ] Authentication matches recommendation

2. Check features are realistic for the stack
   [ ] Features are achievable with chosen tech
   [ ] No features requiring incompatible tech
   [ ] Features match project description

Result: ✅ Consistent or ❌ Mismatches
```

---

#### Test 3.2: SETUP Accuracy

```
For each command in SETUP:

1. Check installation steps are correct
   [ ] npm install syntax correct
   [ ] Paths are correct (src/, backend/, etc)
   [ ] Commands match the project structure
   [ ] Port numbers match .env.example

2. Check environment variables
   [ ] All required vars listed
   [ ] Descriptions provided
   [ ] Example values given
   [ ] Format is correct (VAR_NAME=value)

3. Verify against .env.example
   [ ] All vars in .env.example documented in SETUP
   [ ] No conflicting instructions
   [ ] Same defaults mentioned

Result: ✅ Accurate or ❌ Errors found
```

---

#### Test 3.3: ARCHITECTURE Accuracy

```
For the architecture diagram/description:

1. Check component accuracy
   [ ] Frontend components match actual frontend setup
   [ ] Backend components match actual backend setup
   [ ] Database schema matches actual database
   [ ] External services mentioned in tech stack

2. Check data flow accuracy
   [ ] Flow matches how REST/GraphQL APIs work
   [ ] WebSocket flow (if mentioned) is correct
   [ ] Database operations are feasible
   [ ] No impossible data movements

3. Check deployment accuracy
   [ ] Deployment method matches chosen platform
   [ ] Scaling strategy matches chosen deployment
   [ ] Security measures are realistic

Result: ✅ Accurate or ❌ Errors/Inconsistencies
```

---

### **Phase 4: Readability Testing (5 min)**

#### Test 4.1: Code Block Quality

````
For each code block in documentation:

[ ] Syntax highlighting specified (```javascript, ```bash, etc)
[ ] Code is indented properly
[ ] Code examples are realistic (not placeholder)
[ ] Commands are copy-paste ready
[ ] No mixed indentation (tabs vs spaces)
[ ] Code is actually useful (not just "example code")

Grade examples:
✅ GOOD:
  ```bash
  cd backend
  npm install
  npm run start:dev
````

❌ BAD:

```
cd [project]
npm [command]
```

---

#### Test 4.2: Lists & Tables

```

Check formatting:

Lists:
[ ] Proper indentation (2 or 4 spaces)
[ ] Consistent bullet style (- or \* or 1. 2. 3.)
[ ] No mixing of styles
[ ] Nested items properly indented

Tables (if any):
[ ] Proper alignment (| col1 | col2 |)
[ ] Header separator correct (| --- | --- |)
[ ] All rows have same number of columns
[ ] Content readable in table format

Result: ✅ Properly formatted or ⚠️ Formatting issues

```

---

### **Phase 5: Rendering Test (5 min)**

#### Test 5.1: Frontend Display

```

For each markdown section displayed in web app:

[ ] Headers render with correct sizes (H1 bigger than H2)
[ ] Code blocks have background color/styling
[ ] Lists are visually indented
[ ] Links are clickable/underlined
[ ] Tables render with borders (if any)
[ ] Line breaks are preserved
[ ] No text overflow on mobile
[ ] Proper spacing between sections
[ ] Bold/italic formatting visible

```

**Test on:** Desktop (1920px) + Mobile (375px)

---

#### Test 5.2: Copy Functionality

```

For each markdown section:

[ ] Copy button works
[ ] Copies full markdown (not just visible text)
[ ] Copied markdown is valid (can paste into editor)
[ ] No extra whitespace/formatting added
[ ] Special characters preserved (backticks, brackets, etc)

Test:

1. Click copy button
2. Paste in: https://dillinger.io
3. Check if renders correctly

```

---

## COMPREHENSIVE TEST MATRIX

| Test             | README | SETUP | ARCH  | Weight   |
| ---------------- | ------ | ----- | ----- | -------- |
| Markdown valid   | ✅/❌  | ✅/❌ | ✅/❌ | Critical |
| Headers correct  | ✅/❌  | ✅/❌ | ✅/❌ | High     |
| Content complete | ✅/❌  | ✅/❌ | ✅/❌ | Critical |
| Accurate info    | ✅/❌  | ✅/❌ | ✅/❌ | Critical |
| Code blocks good | ✅/❌  | ✅/❌ | ✅/❌ | High     |
| Lists formatted  | ✅/❌  | ✅/❌ | ✅/❌ | Medium   |
| Renders properly | ✅/❌  | ✅/❌ | ✅/❌ | High     |
| Copy works       | ✅/❌  | ✅/❌ | ✅/❌ | Medium   |

---

## TESTING WORKFLOW

### Morning Session

```

1. Generate setup with 3 different projects
2. Test each markdown file for syntax validity
3. Check content completeness (use checklists above)
4. Document results in matrix

```

### Mid-Day

```

1. Test accuracy (compare with Agent 1 & 2 outputs)
2. Test readability (code blocks, lists, formatting)
3. Fix any issues found
4. Redeploy

```

### Evening

```

1. Test rendering on web
2. Test copy functionality
3. Test on mobile
4. Final sign-off

```

---

## PASS/FAIL CRITERIA

### MINIMUM (Can Submit)

```

✅ All markdown is syntactically valid (no parse errors)
✅ README has description + quick start + features
✅ SETUP has installation + env vars + running instructions
✅ ARCHITECTURE has overview + components + data flow
✅ Code blocks are properly formatted
✅ Copy buttons work

```

### GOOD (Confident)

```

✅ All above PLUS:
✅ All checklists 7-10/10 for each doc
✅ Information accurate (matches agent outputs)
✅ Instructions are actionable (can follow them)
✅ Renders properly on web & mobile
✅ No typos or formatting issues

```

### EXCELLENT (Competitive)

```

✅ All GOOD PLUS:
✅ All checklists 9-10/10
✅ Professional polish (no "example" placeholders)
✅ Diagrams/visual aids included
✅ Comprehensive sections (security, scaling, etc)
✅ Zero markdown issues

```

---

## COMMON MARKDOWN ISSUES TO CHECK FOR

```

❌ Missing code block language:

```

npm install

````

✅ Correct:

```bash
npm install
````

---

❌ Improper heading hierarchy:

# Title

### Subsection (skipped H2!)

✅ Correct:

# Title

## Section

### Subsection

---

❌ Broken link:
[Click here](http://example)

✅ Correct:
[Click here](http://example.com)

---

❌ Code block with special chars not escaped:
Use `npm run start:dev` to start

✅ Correct:
Use \`npm run start:dev\` to start

---

❌ Table with misaligned columns:
| A | B |
| --- | --- |
| 1 | 2 | 3 |

✅ Correct:
| A | B |
| --- | --- |
| 1 | 2 |

---

## DOCUMENTATION SCORING

After testing, score each markdown file:

```

README.md Score: \_\_\_/10

- Syntax: \_\_\_/2
- Completeness: \_\_\_/3
- Accuracy: \_\_\_/2
- Readability: \_\_\_/2
- Rendering: \_\_\_/1

SETUP.md Score: \_\_\_/10

- Syntax: \_\_\_/2
- Completeness: \_\_\_/3
- Accuracy: \_\_\_/2
- Readability: \_\_\_/2
- Actionability: \_\_\_/1

ARCHITECTURE.md Score: \_\_\_/10

- Syntax: \_\_\_/2
- Completeness: \_\_\_/3
- Accuracy: \_\_\_/2
- Clarity: \_\_\_/2
- Usefulness: \_\_\_/1

TOTAL: \_\_\_/30

Grade:
27-30 = A (Excellent)
24-26 = B (Good)
20-23 = C (Acceptable)
<20 = D (Needs improvement)

```

---

## SIGN-OFF

Before submission:

```

[ ] All markdown files are syntactically valid
[ ] README score: **_/10 (minimum 7/10)
[ ] SETUP score: _**/10 (minimum 7/10)
[ ] ARCHITECTURE score: \_\_\_/10 (minimum 7/10)
[ ] All critical issues fixed
[ ] Copy functionality works
[ ] Renders properly on web & mobile
[ ] Ready to submit

Tested by: \***\*\_\_\_\*\***
Date: **\*\***\_\_\_**\*\***
Overall Quality: \_\_\_/10

```

---

**Use this checklist while testing. Be systematic. Document results.**

```

```
