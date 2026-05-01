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

export const SCAFFOLDER_PROMPT = (projectDescription: string, stack: any) => `
You are an expert Node.js/Next.js/React developer.

Generate production-ready boilerplate code for this project:
${projectDescription}

Using this tech stack:
- Frontend: ${stack.frontend.framework}
- Backend: ${stack.backend.framework}
- Database: ${stack.database.name}

Generate the complete project structure with actual working code.

IMPORTANT: Format your response as follows (no markdown code blocks):

==== FILE STRUCTURE ====
[ASCII tree of folder structure]

==== FILE: package.json ====
[Complete package.json content]

==== FILE: src/app/page.tsx ====
[Complete file content]

[Continue for 8-10 key files that represent the full stack]

Include:
- Folder structure (as ASCII art)
- package.json (both dependencies and devDependencies)
- Main app files (frontend)
- Main server files (backend)
- Database models/schema
- Basic API routes
- .env.example
- .gitignore
- tsconfig.json
- Configuration files

All code should be:
- Production-ready
- TypeScript
- With helpful comments
- Following best practices
- Ready to clone and start coding

Make it complete but not overwhelming. Include only essential files.
`

export const DOCUMENTER_PROMPT = (projectDescription: string, stack: any, boilerplate: string) => `
Create comprehensive documentation for this project.

PROJECT: ${projectDescription}
TECH STACK: ${JSON.stringify(stack, null, 2)}
BOILERPLATE: ${boilerplate}

Generate THREE markdown documents:

==== DOCUMENT: README.md ====
[Complete README.md content including: project name, description, quick start, features, tech stack with links, folder structure]

==== DOCUMENT: SETUP.md ====
[Complete SETUP.md content including: prerequisites, installation steps, environment variables, database setup, running locally, troubleshooting]

==== DOCUMENT: ARCHITECTURE.md ====
[Complete ARCHITECTURE.md with ASCII diagram, component descriptions, data flow, API overview, deployment strategy]

Each document should be:
- Clear and well-structured
- Beginner-friendly but not condescending
- Practical and actionable
- Include code examples where appropriate
`
