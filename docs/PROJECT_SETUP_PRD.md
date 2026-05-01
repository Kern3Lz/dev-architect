# PROJECT SETUP AI AGENT
## Product Requirements Document

**Project Name:** DevArchitect (atau nama lain yang lu prefer)

**Tagline:** "Describe your project. Get a complete setup—tech stack, boilerplate, docs. Ready to code in seconds."

---

## 1. PRODUCT OVERVIEW

### What It Does
Developer inputs project description (3-5 sentences) → AI generates:
1. **Recommended tech stack** (with justifications)
2. **Production-ready boilerplate code** (folder structure + core files)
3. **Complete documentation** (README + setup guide + architecture explanation)

### Who It's For
- Junior developers overwhelmed by choices
- Experienced devs who want to skip repetitive setup
- Teams standardizing on tech stacks
- Anyone prototyping new ideas fast

### Core Value Prop
**Eliminate setup paralysis. From idea to code in 60 seconds.**

---

## 2. USER FLOW

### Entry Point
User lands on clean page with:
- Hero section: "Describe your project"
- Large textarea: "What are you building?"
- Optional fields: (Budget/Team size/Timeline - SKIP for MVP)
- Submit button: "Generate My Setup"

### User Input Example
```
I'm building a SaaS platform for team task management. 
It needs real-time collaboration, user authentication, 
and should scale to 10k+ users. Frontend for web and mobile.
Backend needs webhooks for integrations.
```

### What Happens
1. Input sent to **Agent 1 (Stack Advisor)**
2. Stack recommendation shown (+ brief explanation)
3. User clicks "Generate Boilerplate" → **Agent 2 (Scaffolder)** runs
4. Shows generated files (expandable code blocks)
5. User clicks "Create Documentation" → **Agent 3 (Documenter)** runs
6. Shows README + setup guide
7. **Final step:** User can download as ZIP or view/copy individual files

### Character Presence
- Avatar at corner (anime character or simple mascot)
- Personality in copy ("Nice choice! Here's why..." not "Stack recommendation:")
- Loading states have personality ("Architecting your setup..." not just loading bar)

---

## 3. TECHNICAL ARCHITECTURE

### Three-Agent System

#### **AGENT 1: Stack Advisor**
**Prompt engineering focus:**
```
You are a senior architect recommending tech stacks for projects.

Given project description: [USER INPUT]

Recommend a tech stack with:
1. Frontend framework + why
2. Backend framework + why
3. Database + why
4. Deployment platform + why
5. Authentication solution + why
6. Key libraries (3-4) + why

For each recommendation, provide 1-2 sentence justification.
Output as JSON for parsing.

Be opinionated but justify. Consider: scalability, team learning curve, community size.
```

**Output format (JSON):**
```json
{
  "frontend": {
    "framework": "Next.js 14",
    "reason": "Full-stack TypeScript, built-in API routes, excellent DX"
  },
  "backend": {
    "framework": "Node.js + Express",
    "reason": "Single language across stack, large ecosystem"
  },
  ...
}
```

---

#### **AGENT 2: Scaffolder**
**Prompt engineering focus:**
```
Generate production-ready boilerplate code for a [PROJECT TYPE] project.

Tech stack:
- Frontend: [FROM AGENT 1]
- Backend: [FROM AGENT 1]
- Database: [FROM AGENT 1]

Project description: [USER INPUT]

Generate:
1. Folder structure (as ASCII tree)
2. Key files with actual code:
   - package.json (both frontend & backend)
   - .env.example
   - Main app entry point (frontend)
   - Main server file (backend)
   - Database schema/models
   - Basic API route example
   - Authentication setup
3. Configuration files (.gitignore, tsconfig.json, etc)

Code should be:
- Production-ready (error handling, logging setup)
- TypeScript
- With helpful comments
- Following best practices for that stack

Output as code blocks with clear labels.
```

**What to generate:**
```
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── api/
│       └── [...routes]
├── components/
│   └── [key components]
├── lib/
│   └── [utilities]
└── [other folders]

[backend same structure]

Configuration files with content
```

---

#### **AGENT 3: Documenter**
**Prompt engineering focus:**
```
Create comprehensive documentation for a [PROJECT TYPE] project.

Tech stack: [FROM AGENT 1]
Project description: [USER INPUT]
Generated boilerplate structure: [FROM AGENT 2]

Generate 3 documents:

1. **README.md**
   - Project name & description
   - Quick start (3 steps max)
   - Tech stack with links
   - Project structure
   - Key features
   - Contributing guidelines

2. **SETUP.md**
   - Prerequisites
   - Installation steps (detailed)
   - Environment variables setup
   - Database setup
   - Running locally
   - Common issues & fixes

3. **ARCHITECTURE.md**
   - System diagram (ASCII)
   - Component descriptions
   - Data flow explanation
   - API endpoint overview
   - Deployment strategy

Make it clear, beginner-friendly but not condescending.
Use code blocks with proper syntax highlighting hints.
```

---

### System Flow (Backend Implementation)

```
User Input
    ↓
API Endpoint: POST /api/generate-setup
    ↓
[Parallel Calls via Promise.all or Sequential]
    ↓
Agent 1: Call Claude/GPT with Stack Advisor prompt
    ↓ [Parse JSON response]
    ↓
Agent 2: Call Claude/GPT with Scaffolder prompt + Agent 1 output
    ↓ [Extract code blocks]
    ↓
Agent 3: Call Claude/GPT with Documenter prompt + Agent 1 + Agent 2 outputs
    ↓ [Extract markdown]
    ↓
Combine all responses → Return to frontend
    ↓
Frontend displays all three sections (Stack + Boilerplate + Docs)
```

---

## 4. FRONTEND SPECIFICATION

### Pages/Routes

#### **/ (Landing Page)**
- Hero with tagline
- Big textarea for input
- Submit button
- (Optional) Show 2-3 example projects in carousel
- Footer with character/branding

#### **/result (Results Page)**
Shows 3 collapsible sections:

**Section 1: Your Tech Stack**
- Card layout showing each decision
- Small icons for each tech
- Expandable explanation for each choice

**Section 2: Project Structure & Code**
- File tree (expandable)
- Code blocks for each file (with syntax highlighting)
- Copy-to-clipboard button per file
- Download as ZIP button (ALL files)

**Section 3: Documentation**
- Three tabs: README / SETUP / ARCHITECTURE
- Markdown rendered nicely
- Copy button per section

### UI/UX Details
- Clean, modern design
- Character avatar present (top-right corner or sidebar)
- Loading states with personality
- Error states with helpful messages
- Mobile responsive
- Dark mode (optional, nice to have)

### Branding
**Character:** "The Architect" (or pick a name)
- Simple anime or vector art
- Consistent across pages
- Appears in loading states with different expressions

---

## 5. TECH STACK (YOUR BUILD)

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (or minimal custom)
- **Markdown Rendering:** react-markdown
- **Code Highlighting:** highlight.js or prism
- **Icons:** lucide-react

### Backend
- **API:** Next.js API Routes
- **AI:** Claude (via Anthropic API) or OpenRouter
- **Async:** Built-in Promise handling

### Deployment
- **Vercel** (native Next.js)

### Optional Libraries
- `zustand` or `useState` for state management (keep it simple)
- `react-hot-toast` for notifications
- `axios` for API calls (or fetch)

---

## 6. MVPS & NICE-TO-HAVES

### MVP (MUST HAVE - 2 days)
- ✅ Landing page with textarea
- ✅ Three agents working (Stack + Scaffolder + Documenter)
- ✅ Results page showing all three outputs
- ✅ Clean display of code + docs
- ✅ Character branding consistent
- ✅ Works on Vercel
- ✅ GitHub repo with good README
- ✅ Demo video

### Nice-to-Haves (If Time)
- 📌 Download as ZIP
- 📌 Copy-to-clipboard buttons
- 📌 Example projects carousel on landing
- 📌 Dark mode
- 📌 Mobile optimization (beyond responsive)
- 📌 Syntax highlighting for code blocks

### Don't Build (Time Sink)
- ❌ User accounts/auth
- ❌ Save previous projects
- ❌ Custom templates
- ❌ Multi-language support
- ❌ Real-time collaboration

---

## 7. AI INTEGRATION DETAILS

### API Choice
**Recommendation: OpenRouter (allows choice of Claude/GPT-4o)**

Why:
- Simple API
- Flexible model selection
- Cost-efficient
- No vendor lock-in

### Prompt Engineering Strategy

**Keep prompts:**
- Specific (describe exact output format)
- Structured (mention JSON/markdown/code blocks)
- Constrained (max length, focus)

**Model choice:**
- Claude 3.5 Sonnet (best code generation)
- Or GPT-4o (if you prefer)

### Error Handling
- If Agent 1 fails → Show error, ask to retry
- If Agent 2 fails → Show Agent 1 result, suggest manual scaffolding
- If Agent 3 fails → Show first 2, offer generic documentation template

---

## 8. SUCCESS CRITERIA (For Recruitment)

### Functional
- ✅ All 3 agents work reliably
- ✅ Generated code is actually usable (not just syntactically correct)
- ✅ Documentation is clear and complete
- ✅ No broken links/references
- ✅ Deployment live and fast

### Design/Polish
- ✅ Character/branding feels intentional
- ✅ UI is clean and professional
- ✅ Loading states don't feel generic
- ✅ Error messages are helpful

### Conceptual
- ✅ Multi-agent architecture is clear (not just wrapper around single agent)
- ✅ Each agent has distinct purpose
- ✅ Problem solved is genuine (not forced)
- ✅ Shows system design thinking

---

## 9. TIMELINE (2 Days)

### Day 1 (8-10 hours)
- **Hour 1:** Setup Next.js project, basic structure
- **Hour 2-3:** Landing page + basic form
- **Hour 4-5:** API endpoint setup, test Agent 1 (Stack Advisor)
- **Hour 6:** Test Agent 2 (Scaffolder)
- **Hour 7:** Test Agent 3 (Documenter)
- **Hour 8-10:** Results page layout, display all three outputs nicely

### Day 2 (6-8 hours)
- **Hour 1:** Polish UI, character branding
- **Hour 2:** Error handling + edge cases
- **Hour 3:** Deploy to Vercel, test live
- **Hour 4:** Create demo video (15-20 min)
- **Hour 5:** Write documentation (README, PRD submission)
- **Hour 6-8:** Buffer for debugging, final polish

---

## 10. SUBMISSION CHECKLIST

- [ ] Live URL (Vercel) - works and fast
- [ ] GitHub repo - public, clean code
- [ ] Demo video - 2-3 min walkthrough
- [ ] Character/Logo - clear visual identity
- [ ] Project overview (150-300 words) - describes what it does + why useful
- [ ] Tech stack documented - AI integration explained
- [ ] Branding notes - color palette, design decisions
- [ ] All form fields complete
- [ ] Demo video shows actual agent outputs (not fake demo)

---

## 11. UNIQUE POSITIONING

### Why This Stands Out
1. **Multi-agent architecture** - Not a single-agent wrapper
2. **Genuinely useful** - Solves real developer pain
3. **Broad appeal** - Any dev can use it
4. **Shows architectural thinking** - Clear system design
5. **Character integration** - Personality throughout, not just mascot

### How It's Different from Resume Roaster
- **Resume Roaster:** Takes input → gives feedback (single purpose)
- **DevArchitect:** Takes input → coordinates 3 specialized agents with different outputs → user gets complete product
- **Signal:** You understand how to decompose problems into agent responsibilities

---

## NEXT STEPS

1. Confirm this direction with you
2. Build detailed API specs
3. Write Agent prompts (refine together)
4. Start coding
5. Iterate based on output quality

**LETS BUILD THIS.**
