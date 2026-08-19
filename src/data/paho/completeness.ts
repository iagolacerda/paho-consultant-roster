// Réplica da aba "4. Completeness Scoring" do Field Dictionary.
// Um perfil abaixo de 70 não é retornado pelo matching (BR-05 / V-20).

import { ConsultantProfileFormValues } from './types';

export const COMPLETENESS_THRESHOLD = 70;

interface ScoreElement {
  labelKey: string;
  weight: number;
  earned: (p: ConsultantProfileFormValues) => boolean;
}

const ELEMENTS: ScoreElement[] = [
  {
    labelKey: 'completeness.locationContact',
    weight: 10,
    earned: (p) => Boolean(p.firstName && p.lastName && p.email && p.countryResidence && p.city),
  },
  {
    labelKey: 'completeness.primaryArea',
    weight: 10,
    earned: (p) => p.primaryArea !== undefined,
  },
  {
    labelKey: 'completeness.fiveSkills',
    weight: 15,
    earned: (p) => p.skills.length >= 5,
  },
  {
    labelKey: 'completeness.languageProficiency',
    weight: 10,
    earned: (p) => p.languages.length >= 1,
  },
  {
    labelKey: 'completeness.yearsExperience',
    weight: 10,
    earned: (p) => p.yearsTotal !== undefined && p.yearsPrimaryArea !== undefined,
  },
  {
    labelKey: 'completeness.highestDegree',
    weight: 5,
    earned: (p) => p.highestDegree !== undefined,
  },
  {
    labelKey: 'completeness.sectors',
    weight: 5,
    earned: (p) => p.sectors.length >= 1,
  },
  {
    labelKey: 'completeness.twoAssignments',
    weight: 20,
    earned: (p) => p.assignments.length >= 2,
  },
  {
    labelKey: 'completeness.availability',
    weight: 5,
    earned: (p) => Boolean(p.availabilityStatus && p.availableFrom),
  },
  {
    labelKey: 'completeness.compliance',
    weight: 10,
    earned: (p) => Boolean(p.attested && p.institutionalTie !== undefined && p.dedicationRegime !== undefined),
  },
];

export interface CompletenessResult {
  score: number;
  matchable: boolean;
  missing: string[]; // chaves de tradução (namespace "completeness.*"), resolvidas em CompletenessMeter
}

export function calculateCompleteness(profile: ConsultantProfileFormValues): CompletenessResult {
  let score = 0;
  const missing: string[] = [];

  for (const el of ELEMENTS) {
    if (el.earned(profile)) {
      score += el.weight;
    } else {
      missing.push(el.labelKey);
    }
  }

  return { score, matchable: score >= COMPLETENESS_THRESHOLD, missing };
}
