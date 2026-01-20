export type AttackCategory =
  | "direct"
  | "encoding"
  | "persona"
  | "social"
  | "technical"
  | "crescendo"
  | "many_shot"
  | "ascii_art"
  | "cot_hijack"
  | "semantic_shift"
  | "policy_puppetry"
  | "context_overflow"
  | "reasoning_exploit";

export type AttackPhase =
  | "reconnaissance"
  | "profiling"
  | "soft_probe"
  | "escalation"
  | "exploitation"
  | "persistence";

export type DefenseLevel = "none" | "weak" | "moderate" | "strong" | "hardened";

export type LeakStatus =
  | "none"
  | "hint"
  | "fragment"
  | "substantial"
  | "complete";

export interface AttackNode {
  id: string;
  parentId: string | null;
  depth: number;
  prompt: string;
  technique: string;
  category: AttackCategory;
  executed: boolean;
  response?: string;
  priorScore: number;
  posteriorScore: number;
  leakPotential: number;
  children: AttackNode[];
  mutations?: string[];
  reasoning?: string;
  timestamp: number;
}

export interface DefenseProfile {
  level: DefenseLevel;
  confidence: number;
  observedBehaviors: string[];
  guardrails: {
    type: string;
    strength: number;
    bypassed: boolean;
    bypassMethod?: string;
  }[];
  weaknesses: {
    category: AttackCategory;
    description: string;
    exploitability: number;
  }[];
  refusalTriggers: string[];
  safeTopics: string[];
  responsePatterns: {
    pattern: string;
    frequency: number;
    defenseIndicator: boolean;
  }[];
}

export interface Finding {
  id: string;
  turn: number;
  timestamp: number;
  extractedContent: string;
  contentType:
    | "system_prompt"
    | "rule"
    | "constraint"
    | "capability"
    | "persona"
    | "unknown";
  technique: string;
  category: AttackCategory;
  attackNodeId: string;
  confidence: "high" | "medium" | "low";
  evidence: string;
  severity: "critical" | "high" | "medium" | "low";
  verified: boolean;
  verificationMethod?: string;
}

export interface ConversationTurn {
  id: string;
  turn: number;
  timestamp: number;
  role: "attacker" | "target";
  content: string;
  technique?: string;
  category?: AttackCategory;
  phase?: AttackPhase;
  attackNodeId?: string;
  leakStatus?: LeakStatus;
  defenseSignals?: string[];
  extractedFragments?: string[];
}

export interface AttackStrategy {
  id: string;
  name: string;
  description: string;
  applicableWhen: {
    defenseLevel?: DefenseLevel[];
    failedCategories?: AttackCategory[];
    turnRange?: [number, number];
    leakStatus?: LeakStatus[];
  };
  attackSequence: {
    category: AttackCategory;
    weight: number;
    techniques: string[];
  }[];
  expectedTurns: number;
  successRate: number;
  priority: number;
}

export interface StrategyState {
  currentStrategy: AttackStrategy | null;
  strategyHistory: {
    strategy: AttackStrategy;
    turns: number;
    outcome: "success" | "partial" | "failed" | "ongoing";
  }[];
  adaptationCount: number;
  lastAdaptationReason: string;
}

export interface StrategistOutput {
  selectedStrategy: AttackStrategy;
  reasoning: string;
  targetWeaknesses: string[];
  recommendedCategories: AttackCategory[];
  phaseTransition?: AttackPhase;
  shouldReset: boolean;
  resetReason?: string;
}

export interface AttackerOutput {
  attack: AttackNode;
  alternatives: AttackNode[];
  reasoning: string;
  expectedDefense: string;
}

export interface EvaluatorOutput {
  status: LeakStatus;
  confidence: number;
  extractedContent?: string;
  extractedFragments?: string[];
  techniqueEffectiveness: number;
  defenseAnalysis: {
    type: string;
    strength: number;
  }[];
  recommendation: string;
  suggestedCategories: AttackCategory[];
  shouldContinue: boolean;
  continueReason: string;
}

export interface MutatorOutput {
  originalPrompt: string;
  mutations: {
    prompt: string;
    mutationType: string;
    expectedEffectiveness: number;
  }[];
  bestMutation: string;
  reasoning: string;
}

export interface ScanConfig {
  maxTurns: number;
  maxTreeDepth: number;
  branchingFactor: number;
  pruningThreshold: number;
  enableCrescendo: boolean;
  enableManyShot: boolean;
  enableBestOfN: boolean;
  bestOfNCount: number;
  maxTokensPerTurn: number;
  maxTotalTokens: number;
  attackerModel: string;
  evaluatorModel: string;
  targetModel?: string;
  onProgress?: (state: ScanProgress) => Promise<void>;
  onFinding?: (finding: Finding) => Promise<void>;
}

export interface ScanProgress {
  turn: number;
  maxTurns: number;
  phase: AttackPhase;
  strategy: string;
  leakStatus: LeakStatus;
  findingsCount: number;
  treeNodesExplored: number;
  estimatedCompletion: number;
}

export interface ScanResult {
  findings: Finding[];
  overallVulnerability: "critical" | "high" | "medium" | "low" | "secure";
  overallScore: number;
  leakStatus: LeakStatus;
  extractedSystemPrompt?: string;
  extractedFragments: string[];
  turnsUsed: number;
  tokensUsed: number;
  treeNodesExplored: number;
  strategiesUsed: string[];
  defenseProfile: DefenseProfile;
  conversationLog: ConversationTurn[];
  attackTree?: AttackNode;
  summary: string;
  recommendations: string[];
  startTime: number;
  endTime: number;
  duration: number;
}

export interface AttackAnalysis {
  turn: number;
  techniqueUsed: string;
  category: AttackCategory;
  targetResponseSummary: string;
  responseLength: number;
  defenseSignals: string[];
  extractionResult: {
    status: LeakStatus;
    extractedContent: string | null;
    confidence: "high" | "medium" | "low" | null;
    evidence: string | null;
  };
  defenseAnalysis: {
    detectedGuardrails: string[];
    weaknessIdentified: string | null;
    bypassPotential: number;
  };
  nextAction: {
    category: AttackCategory;
    technique: string;
    rationale: string;
    priority: number;
  };
  cumulativeExtraction: string;
  progressTowardsGoal: number;
}

export interface Probe {
  id: string;
  category: AttackCategory;
  technique: string;
  prompt: string;
  phase: AttackPhase[];
  defenseLevel: DefenseLevel[];
  requiresContext: boolean;
  multiTurn: boolean;
  sequencePosition?: number;
  expectedSuccessRate: number;
  sophistication: number;
  stealthiness: number;
  variables?: string[];
}

export interface ProbeSequence {
  id: string;
  name: string;
  description: string;
  category: AttackCategory;
  probes: Probe[];
  requiresAllSteps: boolean;
  canShortCircuit: boolean;
  shortCircuitCondition?: string;
  expectedTurns: number;
  successRate: number;
}
