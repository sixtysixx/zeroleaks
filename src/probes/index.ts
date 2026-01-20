import { advancedProbes } from "./advanced";
import { directProbes } from "./direct";
import { generateEncodingAttacks } from "./encoding";
import {
  modernProbes,
  probeSequences,
  getModernProbesByCategory,
  getProbesForDefenseLevel,
  getSequenceById,
  crescendoProbes,
  cotHijackProbes,
  manyShotProbes,
  asciiArtProbes,
  reasoningExploitProbes,
  policyPuppetryProbes,
  contextOverflowProbes,
} from "./modern";
import { personaProbes } from "./personas";
import { socialProbes } from "./social";
import { technicalProbes } from "./technical";
import type {
  AttackCategory,
  DefenseLevel,
  Probe as ModernProbe,
  ProbeSequence,
} from "../types";

export interface Probe {
  id: string;
  category: string;
  technique: string;
  prompt: string;
}

export type ExtendedProbe = ModernProbe;

export type ProbeCategory =
  | "direct"
  | "encoding"
  | "persona"
  | "social"
  | "technical"
  | "advanced"
  | "crescendo"
  | "many_shot"
  | "cot_hijack"
  | "ascii_art"
  | "reasoning_exploit"
  | "policy_puppetry"
  | "context_overflow"
  | "semantic_shift";

export function getAllProbes(): Probe[] {
  const encodingAttacks = generateEncodingAttacks();

  const modernProbesLegacy: Probe[] = modernProbes.map((p) => ({
    id: p.id,
    category: p.category,
    technique: p.technique,
    prompt: p.prompt,
  }));

  return [
    ...directProbes,
    ...encodingAttacks,
    ...personaProbes,
    ...socialProbes,
    ...technicalProbes,
    ...advancedProbes,
    ...modernProbesLegacy,
  ];
}

export function getAllExtendedProbes(): ExtendedProbe[] {
  const encodingAttacks = generateEncodingAttacks();

  const legacyAsModern: ExtendedProbe[] = [
    ...directProbes,
    ...encodingAttacks,
    ...personaProbes,
    ...socialProbes,
    ...technicalProbes,
    ...advancedProbes,
  ].map((p) => ({
    ...p,
    category: p.category as AttackCategory,
    phase: ["soft_probe", "escalation"] as const,
    defenseLevel: ["none", "weak", "moderate"] as DefenseLevel[],
    requiresContext: false,
    multiTurn: false,
    expectedSuccessRate: 0.3,
    sophistication: 5,
    stealthiness: 5,
  }));

  return [...legacyAsModern, ...modernProbes];
}

export function getProbesByCategory(category: ProbeCategory): Probe[] {
  switch (category) {
    case "direct":
      return directProbes;
    case "encoding":
      return generateEncodingAttacks();
    case "persona":
      return personaProbes;
    case "social":
      return socialProbes;
    case "technical":
      return technicalProbes;
    case "advanced":
      return advancedProbes;
    case "crescendo":
      return crescendoProbes.map((p) => ({
        id: p.id,
        category: p.category,
        technique: p.technique,
        prompt: p.prompt,
      }));
    case "many_shot":
      return manyShotProbes.map((p) => ({
        id: p.id,
        category: p.category,
        technique: p.technique,
        prompt: p.prompt,
      }));
    case "cot_hijack":
      return cotHijackProbes.map((p) => ({
        id: p.id,
        category: p.category,
        technique: p.technique,
        prompt: p.prompt,
      }));
    case "ascii_art":
      return asciiArtProbes.map((p) => ({
        id: p.id,
        category: p.category,
        technique: p.technique,
        prompt: p.prompt,
      }));
    case "reasoning_exploit":
      return reasoningExploitProbes.map((p) => ({
        id: p.id,
        category: p.category,
        technique: p.technique,
        prompt: p.prompt,
      }));
    case "policy_puppetry":
      return policyPuppetryProbes.map((p) => ({
        id: p.id,
        category: p.category,
        technique: p.technique,
        prompt: p.prompt,
      }));
    case "context_overflow":
      return contextOverflowProbes.map((p) => ({
        id: p.id,
        category: p.category,
        technique: p.technique,
        prompt: p.prompt,
      }));
    default:
      return [];
  }
}

export function getExtendedProbesByCategory(
  category: AttackCategory,
): ExtendedProbe[] {
  return getModernProbesByCategory(category);
}

export function getProbesForDefense(level: DefenseLevel): ExtendedProbe[] {
  return getProbesForDefenseLevel(level);
}

export function getProbeSequence(id: string): ProbeSequence | undefined {
  return getSequenceById(id);
}

export function getAllProbeSequences(): ProbeSequence[] {
  return probeSequences;
}

export function getRandomProbeFromCategory(category: ProbeCategory): Probe {
  const probes = getProbesByCategory(category);
  return probes[Math.floor(Math.random() * probes.length)];
}

export function getAttackSequence(length = 10): Probe[] {
  const categories: ProbeCategory[] = [
    "direct",
    "encoding",
    "persona",
    "social",
    "technical",
    "advanced",
  ];

  const sequence: Probe[] = [];

  sequence.push(getRandomProbeFromCategory("direct"));

  for (let i = 1; i < length; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const probe = getRandomProbeFromCategory(category);

    if (sequence.some((p) => p.id === probe.id)) {
      const altCategory =
        categories[(categories.indexOf(category) + 1) % categories.length];
      sequence.push(getRandomProbeFromCategory(altCategory));
    } else {
      sequence.push(probe);
    }
  }

  return sequence;
}

export function getProbesForPhase(
  phase: "reconnaissance" | "soft" | "escalation" | "advanced",
): Probe[] {
  switch (phase) {
    case "reconnaissance":
      return [...directProbes.slice(0, 5), ...socialProbes.slice(0, 3)];
    case "soft":
      return [...directProbes, ...socialProbes];
    case "escalation":
      return [...technicalProbes, ...personaProbes];
    case "advanced":
      return [...advancedProbes, ...generateEncodingAttacks().slice(0, 10)];
    default:
      return getAllProbes();
  }
}

export { advancedProbes } from "./advanced";
export { directProbes } from "./direct";
export {
  encodingProbes,
  encodingUtils,
  generateEncodingAttacks,
} from "./encoding";
export { danPersonas, personaProbes } from "./personas";
export { socialProbes } from "./social";
export { technicalProbes } from "./technical";

export {
  modernProbes,
  probeSequences,
  crescendoProbes,
  cotHijackProbes,
  manyShotProbes,
  asciiArtProbes,
  reasoningExploitProbes,
  policyPuppetryProbes,
  contextOverflowProbes,
  getModernProbesByCategory,
  getProbesForDefenseLevel,
  getSequenceById,
} from "./modern";
