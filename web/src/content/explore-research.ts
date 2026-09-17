/**
 * Explore Deep Learning — Research Field Guide (public orientation).
 * Evidence-driven path: Question → Understanding → Reproduction → Experiment → Evidence.
 * Not a course catalog, LMS, paper DB, or progress model.
 */

export type ResearchStageId =
  | 'foundations'
  | 'modeling'
  | 'reading'
  | 'reproduction'
  | 'experiment'
  | 'research'

export interface ResearchStage {
  id: ResearchStageId
  index: string
  shortLabel: string
  title: string
  statement: string
  question: string
  practice: string
  concepts?: string[]
  evidence: string
  failureSignals: string[]
}

export interface ResearchLoopStep {
  id: string
  label: string
  statement: string
}

export interface EvidenceLedgerItem {
  id: string
  index: string
  label: string
  statement: string
}

export const exploreResearchHero = {
  eyebrow: 'Deep Learning × Research',
  title: 'Learn to understand models deeply enough to question them.',
  lede: 'Models are not diagrams to memorize. Read the assumptions. Reproduce the evidence. Change one thing. Observe what follows.',
}

export const researchPathIntro = {
  eyebrow: 'The Path',
  title: 'From model → evidence → question.',
  lede: 'Six stages of research orientation. Not levels. Not a gate sequence you must clear before thinking.',
}

export const researchStages: ResearchStage[] = [
  {
    id: 'foundations',
    index: '01',
    shortLabel: 'Foundations',
    title: 'Foundations',
    statement:
      'Enough fluency to write, run, inspect, and debug a small training loop yourself — not only to follow a notebook.',
    question:
      'Can you write, run, inspect, and debug a small training loop yourself?',
    practice:
      'Build a minimal dataset, model, loss, optimizer, and train/eval loop. Watch shapes, loss, gradients, device, and seed — do not only copy a tutorial.',
    concepts: [
      'Python',
      'NumPy',
      'PyTorch',
      'Tensor',
      'Autograd',
      'Dataset / DataLoader',
      'Training loop',
      'Loss',
      'Optimizer',
      'GPU basics',
      'Logging',
      'Random seed',
    ],
    evidence:
      'A reproducible training script with config, README, seed, metric output, and failure notes.',
    failureSignals: [
      'You only edit cells in a notebook and cannot restart cleanly.',
      'A shape error appears and you cannot locate where it came from.',
      'You cannot explain the difference between train and eval mode.',
    ],
  },
  {
    id: 'modeling',
    index: '02',
    shortLabel: 'Modeling',
    title: 'Modeling',
    statement:
      'Move from “the model runs” to “I can name the assumption this structure makes.”',
    question:
      'What assumption does this architecture make about representation, interaction, or optimization?',
    practice:
      'Take a simple model and change one structural choice — depth, normalization, or attention configuration — then compare training behavior. Orientation only; do not invent results.',
    concepts: [
      'Representation',
      'Inductive bias',
      'CNN locality',
      'Attention',
      'Transformer',
      'MLP / Embedding',
      'Normalization',
      'Regularization',
      'Generalization',
    ],
    evidence:
      'A short note: which assumption you changed, what you expected, and what you actually inspected.',
    failureSignals: [
      'You can name architectures but not their inductive biases.',
      'You change several knobs at once and call the outcome “ablation.”',
      'You treat a diagram as understanding without checking a forward pass.',
    ],
  },
  {
    id: 'reading',
    index: '03',
    shortLabel: 'Read',
    title: 'Read Papers',
    statement:
      'Learn to map a paper’s argument chain — not to translate every sentence on the first pass.',
    question:
      'What problem, assumption, method, baseline, experiment, claim, and limitation form this paper’s argument?',
    practice:
      'Before deep formula work, write a one-page paper map: Question, Claim, Method, Evidence, Limitation. Then return for implementation detail.',
    concepts: [
      'Problem',
      'Assumption',
      'Method',
      'Baseline',
      'Experiment',
      'Claim',
      'Limitation',
    ],
    evidence:
      'A paper map someone else can use to discuss the claim without reopening the PDF line by line.',
    failureSignals: [
      'Your first pass is only a Chinese paraphrase.',
      'You cannot name the baseline the claim depends on.',
      'You cannot point to which experiment supports which claim.',
    ],
  },
  {
    id: 'reproduction',
    index: '04',
    shortLabel: 'Reproduce',
    title: 'Reproduce',
    statement:
      'The question is not “did the code run?” — it is “can you recover the evidence?”',
    question: 'Can you recover the evidence under a fixed, inspectable setup?',
    practice:
      'Pick a small paper or baseline. Build a traceable chain: paper → code → config → run → metric → failure log. SOTA is not the goal.',
    concepts: [
      'Data split',
      'Seed',
      'Config',
      'Training steps',
      'Metrics',
      'Evaluation',
      'Environment / version',
      'Checkpoint policy',
    ],
    evidence:
      'A reproduction note with config snapshot, environment, metric definition, run log, and failed attempts — not only a final number.',
    failureSignals: [
      'You keep only the best number and delete failed runs.',
      'Seed and config cannot be reconstructed from your notes.',
      'You treat every mismatch as “my code is bad,” ignoring paper ambiguity, preprocessing, metric definition, or budget.',
    ],
  },
  {
    id: 'experiment',
    index: '05',
    shortLabel: 'Experiment',
    title: 'Experiment',
    statement:
      'Change one thing. Know what question that change answers. A higher number is not automatically better evidence.',
    question:
      'Does this controlled change produce evidence that answers the question you asked?',
    practice:
      'Pose a small question (stability, preprocessing, failure cases). Hold a fair baseline. Change only the related variable. Record config, results, failures, and limits — no fabricated outcomes.',
    concepts: [
      'Baseline',
      'Control',
      'Variable',
      'Ablation',
      'Metric',
      'Seed',
      'Failure case',
      'Qualitative inspection',
      'Compute budget',
    ],
    evidence:
      'An experiment note where baseline, variable, metric, and limitation are explicit enough for a peer to challenge.',
    failureSignals: [
      'You change multiple factors and still claim a clean conclusion.',
      'The baseline is unfair or unstated.',
      'The metric does not match the question.',
    ],
  },
  {
    id: 'research',
    index: '06',
    shortLabel: 'Research',
    title: 'Research',
    statement:
      'Not “publish a paper.” Form a question worth testing — and a habit of leaving evidence others can inspect.',
    question: 'What question is worth testing, and how would fair evidence look?',
    practice:
      'Assemble a full chain: Question → Hypothesis → Baseline → Experiment → Evidence → Interpretation → Limitation → Next Question. This path does not promise papers, admissions, or awards.',
    concepts: [
      'Question',
      'Hypothesis',
      'Baseline',
      'Experiment',
      'Evidence',
      'Interpretation',
      'Limitation',
      'Next question',
    ],
    evidence:
      'A research note that another student can read, challenge, and attempt to continue.',
    failureSignals: [
      'You jump to claims without a baseline or a controllable experiment.',
      'You cannot state what the result does not establish.',
      'You treat the route as a guarantee of publication or recommendation.',
    ],
  },
]

export const researchLoop = {
  eyebrow: 'The Research Loop',
  title: 'Research is not a straight line.',
  lede: 'Evidence can reject the idea. Failure can change the question. Stages orient you; the loop is how work actually moves.',
  steps: [
    {
      id: 'question',
      label: 'Question',
      statement: 'Name what you are trying to learn — narrowly enough to test.',
    },
    {
      id: 'hypothesis',
      label: 'Hypothesis',
      statement: 'State what you expect if the idea is right.',
    },
    {
      id: 'reproduce',
      label: 'Reproduce',
      statement: 'Recover a baseline you can trust before you invent a change.',
    },
    {
      id: 'experiment',
      label: 'Experiment',
      statement: 'Change one related thing under a fair control.',
    },
    {
      id: 'inspect',
      label: 'Inspect',
      statement: 'Look at curves, failures, and edge cases — not only the mean.',
    },
    {
      id: 'explain',
      label: 'Explain',
      statement: 'Say what the evidence supports, and what it cannot.',
    },
    {
      id: 'new-question',
      label: 'New Question',
      statement: 'Let the result rewrite the next question — then return.',
    },
  ] satisfies ResearchLoopStep[],
}

export const evidenceLedger = {
  eyebrow: 'What Counts as Evidence?',
  title: 'Evidence is inspectable — not just impressive.',
  lede: 'A useful habit in this community: leave work another person can check, challenge, and continue.',
  items: [
    {
      id: 'config',
      index: '01',
      label: 'Config',
      statement: 'Can someone know exactly what changed?',
    },
    {
      id: 'metric',
      index: '02',
      label: 'Metric',
      statement: 'Does the metric answer the question?',
    },
    {
      id: 'failure',
      index: '03',
      label: 'Failure',
      statement: 'What examples contradict the average?',
    },
    {
      id: 'limitation',
      index: '04',
      label: 'Limitation',
      statement: 'What does the experiment not establish?',
    },
  ] satisfies EvidenceLedgerItem[],
}

export const researchCapstone = {
  eyebrow: 'Capstone',
  title: 'Ask a question worth testing.',
  lede: 'Not “write a paper.” Design one small question, one fair baseline, one controlled experiment, and leave evidence someone else can inspect.',
  note: 'A research note may include: Question, Hypothesis, Baseline, Experiment, Evidence, Failure Cases, Limitation, Next Question. This is orientation — not a certificate.',
}

export function getResearchStage(id: ResearchStageId): ResearchStage | undefined {
  return researchStages.find((stage) => stage.id === id)
}
