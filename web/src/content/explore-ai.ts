/**
 * Explore AI — public orientation for the Build with AI path.
 * Not a course catalog, enrollment, or progress model.
 */

export type AiStageId =
  | 'foundations'
  | 'ai-native-coding'
  | 'agent-systems'
  | 'rag-mcp'
  | 'workflow-eval'
  | 'ship'

export interface AiStageFacet {
  id: 'capability' | 'practice' | 'tools' | 'deliverable'
  label: string
  body: string
}

export interface AiStage {
  id: AiStageId
  index: string
  title: string
  lede: string
  facets: AiStageFacet[]
}

export interface PracticeLoopStep {
  id: string
  label: string
  statement: string
}

export const exploreAiHero = {
  eyebrow: 'AI Engineering',
  title: 'Learn to build with AI, not just ask it questions.',
  lede: 'This path treats models as part of an engineering process — context, tools, evaluation, and delivery. Chat is a surface. Shipping is the point.',
}

export const aiStages: AiStage[] = [
  {
    id: 'foundations',
    index: '01',
    title: 'Foundations',
    lede: 'Enough craft to express an idea in code, keep history, and read what the tools actually say.',
    facets: [
      {
        id: 'capability',
        label: 'Capability',
        body: 'Write a small program, version it, run it from a README, and split a vague goal into checkable steps.',
      },
      {
        id: 'practice',
        label: 'Practice',
        body: 'Build a tiny script or CLI. Commit in a trail someone else can follow. Fix one bug by reading the error, not by guessing.',
      },
      {
        id: 'tools',
        label: 'Tools / Concepts',
        body: 'Git, Python or TypeScript, the terminal, docs, problem decomposition.',
      },
      {
        id: 'deliverable',
        label: 'Deliverable',
        body: 'A public-shaped repo: something that runs, with a README that is enough for a peer to try it.',
      },
    ],
  },
  {
    id: 'ai-native-coding',
    index: '02',
    title: 'AI-Native Coding',
    lede: 'Use a model inside the repo — as a collaborator you review, not as a substitute for thinking.',
    facets: [
      {
        id: 'capability',
        label: 'Capability',
        body: 'Give the model the right context, accept or reject diffs, and keep ownership of the design.',
      },
      {
        id: 'practice',
        label: 'Practice',
        body: 'Ship a real feature with assistive coding. Keep notes on what you trusted, what you rewrote, and why.',
      },
      {
        id: 'tools',
        label: 'Tools / Concepts',
        body: 'AI coding environments, prompts as specs, context windows, tests as a backstop.',
      },
      {
        id: 'deliverable',
        label: 'Deliverable',
        body: 'A merged (or merge-ready) change plus a short record of how the model helped — and where it failed.',
      },
    ],
  },
  {
    id: 'agent-systems',
    index: '03',
    title: 'Agent Systems',
    lede: 'A loop of plan, tools, observation, and write-back — bounded enough to debug.',
    facets: [
      {
        id: 'capability',
        label: 'Capability',
        body: 'Design an agent that can act, see what happened, and stop when the task is done or unsafe.',
      },
      {
        id: 'practice',
        label: 'Practice',
        body: 'Give it a narrow job with a few tools. Read the trace. Tighten the contract until the loop is honest.',
      },
      {
        id: 'tools',
        label: 'Tools / Concepts',
        body: 'Tool calling, traces, memory limits, guardrails, human-in-the-loop.',
      },
      {
        id: 'deliverable',
        label: 'Deliverable',
        body: 'A small agent that completes one defined task and leaves an audit trail you can explain.',
      },
    ],
  },
  {
    id: 'rag-mcp',
    index: '04',
    title: 'RAG & MCP',
    lede: 'Ground answers in sources you control. Let the model reach local tools without pretending it “knows.”',
    facets: [
      {
        id: 'capability',
        label: 'Capability',
        body: 'Retrieve before you generate. Cite. Expose one local capability through a tool interface.',
      },
      {
        id: 'practice',
        label: 'Practice',
        body: 'Index a small corpus. Answer only from it. Add one MCP-style bridge to a file, repo, or command.',
      },
      {
        id: 'tools',
        label: 'Tools / Concepts',
        body: 'Retrieval, embeddings, chunking, citations, MCP / tool servers.',
      },
      {
        id: 'deliverable',
        label: 'Deliverable',
        body: 'Q&A over a known document set with sources, plus one working local tool connection.',
      },
    ],
  },
  {
    id: 'workflow-eval',
    index: '05',
    title: 'Workflow & Evaluation',
    lede: 'Compose steps. Know when the pipeline failed. Prefer a failing check over a lucky demo.',
    facets: [
      {
        id: 'capability',
        label: 'Capability',
        body: 'Turn a one-off prompt into a sequence with inputs, outputs, and a way to score quality.',
      },
      {
        id: 'practice',
        label: 'Practice',
        body: 'Chain two or more steps. Add a tiny eval set. Watch a case fail on purpose, then fix the contract.',
      },
      {
        id: 'tools',
        label: 'Tools / Concepts',
        body: 'Workflows, traces, eval sets, regression checks, observability.',
      },
      {
        id: 'deliverable',
        label: 'Deliverable',
        body: 'A documented workflow with at least one check that can fail — and a note of what “good” means.',
      },
    ],
  },
  {
    id: 'ship',
    index: '06',
    title: 'Ship',
    lede: 'Leave the notebook. Put the work where another person can actually try it.',
    facets: [
      {
        id: 'capability',
        label: 'Capability',
        body: 'Package, demo, and explain a working artifact without hiding the limits.',
      },
      {
        id: 'practice',
        label: 'Practice',
        body: 'Deploy or hand a demo to a peer. Watch them stall. Fix the onboarding, not the slide.',
      },
      {
        id: 'tools',
        label: 'Tools / Concepts',
        body: 'Hosting, README, demo path, issue notes, usage limits.',
      },
      {
        id: 'deliverable',
        label: 'Deliverable',
        body: 'Something a classmate can open and use — CLI, bot, small app, or documented workflow — without you in the room.',
      },
    ],
  },
]

export const practiceLoop = {
  eyebrow: 'The Practice Loop',
  title: 'How work actually moves.',
  lede: 'Stages are a map. The loop is the habit. Repeat it on every piece of work — not as a course module.',
  steps: [
    {
      id: 'understand',
      label: 'Understand',
      statement: 'Name the user, the constraint, and what “done” would look like.',
    },
    {
      id: 'build',
      label: 'Build',
      statement: 'Make the smallest version that can fail in public.',
    },
    {
      id: 'test',
      label: 'Test',
      statement: 'Try it. Break it. Write down what the model or the pipeline got wrong.',
    },
    {
      id: 'explain',
      label: 'Explain',
      statement: 'Tell a peer why it works — and where it must not be trusted.',
    },
    {
      id: 'ship',
      label: 'Ship',
      statement: 'Hand it to someone. Then start the loop again on what they could not do.',
    },
  ] satisfies PracticeLoopStep[],
}

export const aiCapstone = {
  eyebrow: 'Capstone',
  title: 'Build something someone can actually use.',
  lede: 'Not a prompt gallery. Not a slide about agents. A tool, a workflow, or a small system a person can try without you translating it live.',
  note: 'This is a community orientation, not a certificate. No enrollment, no progress bar — only the work you leave behind.',
}

export function getAiStage(id: AiStageId): AiStage | undefined {
  return aiStages.find((stage) => stage.id === id)
}
