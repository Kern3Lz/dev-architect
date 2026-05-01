export interface StackRecommendation {
  frontend: {
    framework: string
    reason: string
  }
  backend: {
    framework: string
    reason: string
  }
  database: {
    name: string
    reason: string
  }
  deployment: {
    platform: string
    reason: string
  }
  authentication: {
    solution: string
    reason: string
  }
  keyLibraries: Array<{
    name: string
    reason: string
  }>
}

export interface GeneratedSetup {
  stack: StackRecommendation
  boilerplate: string
  documentation: {
    readme: string
    setup: string
    architecture: string
  }
}
