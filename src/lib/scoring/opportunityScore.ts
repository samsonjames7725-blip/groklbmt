/**
 * Explainable 0–100 Opportunity Score
 * Weights from master prompt §11
 */

export interface ScoreInput {
  sourceCredibility?: number; // 0–20
  healthcareRelevance?: number; // 0–15
  businessFit?: number; // 0–15
  opportunityValue?: number; // 0–15
  deadlineUrgency?: number; // 0–10
  organizationConfidence?: number; // 0–10
  contactAvailability?: number; // 0–5
  dataCompleteness?: number; // 0–5
  crossSourceConfirmation?: number; // 0–5
}

export interface ScoreResult {
  totalScore: number;
  factors: Required<ScoreInput>;
  priorityBand: "HOT" | "QUALIFIED" | "NURTURE" | "LOW";
  explanation: string[];
}

const MAX = {
  sourceCredibility: 20,
  healthcareRelevance: 15,
  businessFit: 15,
  opportunityValue: 15,
  deadlineUrgency: 10,
  organizationConfidence: 10,
  contactAvailability: 5,
  dataCompleteness: 5,
  crossSourceConfirmation: 5,
} as const;

function clamp(value: number, max: number): number {
  return Math.max(0, Math.min(max, Math.round(value)));
}

export function calculateOpportunityScore(input: ScoreInput): ScoreResult {
  const factors = {
    sourceCredibility: clamp(input.sourceCredibility ?? 0, MAX.sourceCredibility),
    healthcareRelevance: clamp(input.healthcareRelevance ?? 0, MAX.healthcareRelevance),
    businessFit: clamp(input.businessFit ?? 0, MAX.businessFit),
    opportunityValue: clamp(input.opportunityValue ?? 0, MAX.opportunityValue),
    deadlineUrgency: clamp(input.deadlineUrgency ?? 0, MAX.deadlineUrgency),
    organizationConfidence: clamp(input.organizationConfidence ?? 0, MAX.organizationConfidence),
    contactAvailability: clamp(input.contactAvailability ?? 0, MAX.contactAvailability),
    dataCompleteness: clamp(input.dataCompleteness ?? 0, MAX.dataCompleteness),
    crossSourceConfirmation: clamp(input.crossSourceConfirmation ?? 0, MAX.crossSourceConfirmation),
  };

  const totalScore = Object.values(factors).reduce((a, b) => a + b, 0);

  let priorityBand: ScoreResult["priorityBand"] = "LOW";
  if (totalScore >= 80) priorityBand = "HOT";
  else if (totalScore >= 60) priorityBand = "QUALIFIED";
  else if (totalScore >= 40) priorityBand = "NURTURE";

  const explanation = [
    `Opportunity Score: ${totalScore}/100`,
    `Source credibility: ${factors.sourceCredibility}/20`,
    `Healthcare relevance: ${factors.healthcareRelevance}/15`,
    `Business fit: ${factors.businessFit}/15`,
    `Value: ${factors.opportunityValue}/15`,
    `Deadline: ${factors.deadlineUrgency}/10`,
    `Organization confidence: ${factors.organizationConfidence}/10`,
    `Contact: ${factors.contactAvailability}/5`,
    `Completeness: ${factors.dataCompleteness}/5`,
    `Cross-source confirmation: ${factors.crossSourceConfirmation}/5`,
  ];

  return { totalScore, factors, priorityBand, explanation };
}
