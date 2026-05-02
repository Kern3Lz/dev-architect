interface StackData {
  frontend?: { framework?: string; reason?: string };
  backend?: { framework?: string; reason?: string };
  database?: { name?: string; reason?: string };
  deployment?: { platform?: string; reason?: string };
  authentication?: { solution?: string; reason?: string };
  keyLibraries?: { name: string; reason: string }[];
  [key: string]: unknown;
}

export const STACK_ADVISOR_PROMPT = (projectDescription: string) => `
You are a senior software architect with 15+ years of experience recommending tech stacks.

PROJECT DESCRIPTION:
${projectDescription}

Based on this project description, recommend the BEST tech stack for success.

Respond ONLY with valid JSON (no markdown, no explanation):
{
  "frontend": {
    "framework": "framework name",
    "reason": "1-2 sentence justification"
  },
  "backend": {
    "framework": "framework name",
    "reason": "1-2 sentence justification"
  },
  "database": {
    "name": "database name",
    "reason": "1-2 sentence justification"
  },
  "deployment": {
    "platform": "platform name",
    "reason": "1-2 sentence justification"
  },
  "authentication": {
    "solution": "solution name",
    "reason": "1-2 sentence justification"
  },
  "keyLibraries": [
    {
      "name": "library name",
      "reason": "what it does"
    }
  ]
}

Be opinionated. Prioritize: scalability, developer experience, community size.
Make choices that will make this project succeed.
`

export const SCAFFOLDER_PROMPT = (projectDescription: string, stack: StackData) => `
You are a senior full-stack engineer generating a complete, production-ready project scaffold.

PROJECT: ${projectDescription}

TECH STACK (use EXACTLY these — do not substitute):
- Frontend: ${stack.frontend?.framework ?? "React"}
- Backend: ${stack.backend?.framework ?? "Node.js/Express"}
- Database: ${stack.database?.name ?? "PostgreSQL"}
- Authentication: ${stack.authentication?.solution ?? "JWT"}
- Deployment: ${stack.deployment?.platform ?? "Vercel"}
- Key Libraries: ${(stack.keyLibraries ?? []).map((l: { name: string }) => l.name).join(", ")}

OUTPUT FORMAT — strict, no deviations:
Do NOT use markdown code fences (\`\`\`) around file content.
Use EXACTLY these separators:

==== FILE STRUCTURE ====
<ASCII tree showing the complete folder structure you are generating below>

==== FILE: <exact-path> ====
<complete file content>

==== FILE: <exact-path> ====
<complete file content>

... (continue for all files)

REQUIRED FILES (generate ALL of these, in this order):

1. ==== FILE: package.json ====
   Complete with all dependencies for the EXACT chosen stack. Include scripts: dev, build, start, lint.

2. ==== FILE: .env.example ====
   All environment variables needed: DB_URL, JWT_SECRET, PORT, any API keys etc.

3. ==== FILE: .gitignore ====
   Standard Node.js + framework-specific gitignore.

4. ==== FILE: tsconfig.json ====
   TypeScript config for the chosen frontend/backend framework.

5. ==== FILE: <main entry point> ====
   e.g., src/index.ts for Express, app.ts for NestJS, main.py for FastAPI — the server/app entry.

6. ==== FILE: <database config or schema> ====
   e.g., prisma/schema.prisma, src/db/schema.ts, mongoose models — matching the chosen database.

7. ==== FILE: <auth module> ====
   Authentication logic, JWT/session handling, middleware.

8. ==== FILE: <main API routes/controller> ====
   Core REST/GraphQL API routes for the primary feature (e.g., tasks CRUD).

9. ==== FILE: <frontend entry / layout> ====
   The main page component or layout file.

10. ==== FILE: <frontend primary page/component> ====
    A meaningful component that shows the main feature (e.g., task board, dashboard).

11. ==== FILE: <frontend API client or fetch helper> ====
    API utility for making requests from frontend to backend.

12. ==== FILE: README.md ====
    A brief 1-paragraph summary (Agent 3 will write the full README).

RULES:
- Write REAL, working code. No "// TODO" or "[your code here]" placeholders.
- Every file must be TypeScript unless the stack requires otherwise.
- Paths in FILE STRUCTURE must EXACTLY match the ==== FILE: ... ==== paths below it.
- Code must be consistent across files (import paths, variable names, types).
- Match the chosen tech stack exactly — if the stack is NestJS, use NestJS decorators, not Express syntax.
`


export const DOCUMENTER_PROMPT = (projectDescription: string, stack: StackData, boilerplate: string) => `
Create comprehensive, production-ready documentation for this project.

PROJECT: ${projectDescription}
TECH STACK: ${JSON.stringify(stack, null, 2)}
BOILERPLATE: ${boilerplate}

Generate THREE markdown documents exactly as requested below.

==== DOCUMENT: README.md ====
Include the following sections (ensure proper H1/H2 hierarchy):
- # Project Title (1 H1)
- Description: 2+ paragraphs explaining what the project is and its purpose.
- Quick Start: 5+ numbered steps to get started.
- Features: 5+ items with descriptions.
- Tech Stack: List frontend, backend, database, etc. WITH markdown links to their official websites.
- Folder Structure: Include a clear ASCII tree.
- Prerequisites: Things needed before installing.
- Installation: Complete instructions.
- Running Locally: Exact dev commands to run the project.
- Contributing Guidelines & License.

==== DOCUMENT: SETUP.md ====
Include the following sections (ensure proper H1/H2 hierarchy):
- # Setup Guide (1 H1)
- Prerequisites: With specific version requirements (e.g., Node.js v18+).
- Installation Steps: Numbered, 5+ steps, copy-paste ready code blocks.
- Environment Variables: Provide a complete .env.example template.
- Database Setup: Instructions for schemas or migrations.
- Configuration: For each service (frontend, backend).
- Running Locally: Actual commands in \`\`\`bash blocks.
- Troubleshooting: 3+ common issues and how to fix them.
*Ensure paths are correct and there are no undefined variables.*

==== DOCUMENT: ARCHITECTURE.md ====
Include the following sections (ensure proper H1/H2 hierarchy):
- # Architecture Guide (1 H1)
- System Overview: 3+ paragraphs explaining the architecture conceptually.
- Architecture Diagram: Use ASCII art to draw the system components.
- Component Descriptions: Frontend, Backend, Database, Cache, etc.
- Data Flow: Step-by-step explanation of a core user action.
- API Overview: Endpoints or GraphQL schema summary.
- Deployment Strategy: How to deploy this stack.
- Scaling Considerations: How to handle more traffic.
- Security Considerations: Authentication, CORS, etc.
- Technology Choices: Justify why this stack was chosen.

CRITICAL RULES FOR ALL DOCUMENTS:
- Use valid markdown syntax. Code blocks MUST have language identifiers (e.g., \`\`\`bash, \`\`\`typescript).
- Headers must follow strict hierarchy (H1 -> H2 -> H3). No jumping from H1 to H4.
- Make it practical, accurate (matching the tech stack), and professional. No placeholders like "[add command here]".
`
