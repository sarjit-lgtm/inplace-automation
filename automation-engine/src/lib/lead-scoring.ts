/**
 * Lead Scoring Module
 * Calculates a 0–100 score for a contact based on source, budget, timeline,
 * and kitchen type. Exports calculateLeadScore() and getScoreTier().
 */

export type LeadSource =
  | "Google Ads"
  | "GBP"
  | "Phone Call"
  | "Walk-In"
  | "Website Chat"
  | "Meta"
  | "Referral"
  | string; // allow unknown sources without type errors

export type BudgetRange =
  | "$200K+"
  | "$100K-$200K"
  | "$50K-$100K"
  | "$25K-$50K"
  | "Under $25K"
  | "Not Disclosed"
  | string;

export type Timeline =
  | "ASAP"
  | "1-3 Months"
  | "3-6 Months"
  | "6-12 Months"
  | "12+ Months"
  | string;

export type KitchenType = "Renovation" | "New Build" | "Remodel" | string;

export type ScoreTier = "High" | "Medium" | "Low";

export interface LeadScoringInput {
  source?: LeadSource;
  budgetRange?: BudgetRange;
  timeline?: Timeline;
  kitchenType?: KitchenType;
}

// ─── Scoring tables ───────────────────────────────────────────────────────────

const SOURCE_SCORES: Record<string, number> = {
  "Google Ads": 30,
  GBP: 25,
  "Phone Call": 25,
  "Walk-In": 30,
  "Website Chat": 20,
  Meta: 15,
  Referral: 35,
};

const BUDGET_SCORES: Record<string, number> = {
  "$200K+": 25,
  "$100K-$200K": 20,
  "$50K-$100K": 15,
  "$25K-$50K": 10,
  "Under $25K": 5,
  "Not Disclosed": 10,
};

const TIMELINE_SCORES: Record<string, number> = {
  ASAP: 25,
  "1-3 Months": 20,
  "3-6 Months": 15,
  "6-12 Months": 10,
  "12+ Months": 5,
};

const KITCHEN_TYPE_SCORES: Record<string, number> = {
  Renovation: 10,
  "New Build": 15,
  Remodel: 10,
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Calculate a lead score from 0–100.
 * Max possible: 35 (source) + 25 (budget) + 25 (timeline) + 15 (kitchen) = 100
 */
export function calculateLeadScore(input: LeadScoringInput): number {
  let score = 0;

  if (input.source) {
    score += SOURCE_SCORES[input.source] ?? 0;
  }

  if (input.budgetRange) {
    score += BUDGET_SCORES[input.budgetRange] ?? 0;
  }

  if (input.timeline) {
    score += TIMELINE_SCORES[input.timeline] ?? 0;
  }

  if (input.kitchenType) {
    score += KITCHEN_TYPE_SCORES[input.kitchenType] ?? 0;
  }

  // Clamp to 0–100
  return Math.min(100, Math.max(0, score));
}

/**
 * Classify a numeric score into High / Medium / Low tier.
 * > 70 = High (flag to Sarjit)
 * > 50 = Medium
 * <= 50 = Low (nurture)
 */
export function getScoreTier(score: number): ScoreTier {
  if (score > 70) return "High";
  if (score > 50) return "Medium";
  return "Low";
}
