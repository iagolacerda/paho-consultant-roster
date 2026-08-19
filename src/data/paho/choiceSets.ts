// Vocabulário controlado do PAHO SCIP Roster — extraído da aba "2. Choice Sets"
// do Field Dictionary (PAHO SCIP Roster - Profile Field Dictionary.xlsx).
// `value` é o valor armazenado (o que o Dataverse guardaria). Os rótulos não
// ficam aqui — são chaves de tradução (src/translations/{pt,en}.json),
// resolvidas em ./useChoiceSets. Conjuntos marcados como ORDERED na planilha
// (Skill Depth, Proficiency, Qualification) têm o `value` crescente com o nível.

export interface ChoiceDef {
  value: number;
  labelKey: string;
}

export interface SkillGroupDef {
  groupKey: string;
  items: ChoiceDef[];
}

export interface CountryGroupDef {
  regionKey: string;
  items: ChoiceDef[];
}

// Interfaces "resolvidas" (depois da tradução) — usadas pelos componentes.
export interface ChoiceOption {
  value: number;
  label: string;
}

export interface SkillGroup {
  group: string;
  items: ChoiceOption[];
}

export interface CountryGroup {
  region: string;
  items: ChoiceOption[];
}

// CS-01 — Technical Area
export const TECHNICAL_AREA_DEFS: ChoiceDef[] = [
  { value: 100, labelKey: 'choices.technicalArea.healthInformationSystems' },
  { value: 110, labelKey: 'choices.technicalArea.immunization' },
  { value: 120, labelKey: 'choices.technicalArea.epidemiology' },
  { value: 130, labelKey: 'choices.technicalArea.digitalHealth' },
  { value: 140, labelKey: 'choices.technicalArea.healthEconomics' },
  { value: 150, labelKey: 'choices.technicalArea.primaryCare' },
  { value: 160, labelKey: 'choices.technicalArea.nonCommunicableDiseases' },
  { value: 170, labelKey: 'choices.technicalArea.emergencyPreparedness' },
  { value: 180, labelKey: 'choices.technicalArea.environmentalHealth' },
  { value: 190, labelKey: 'choices.technicalArea.healthWorkforce' },
  { value: 200, labelKey: 'choices.technicalArea.maternalChildHealth' },
  { value: 210, labelKey: 'choices.technicalArea.healthPolicy' },
];

// CS-02 — Skill, agrupada por categoria (a planilha mantém como tabela, não
// como choice simples, justamente para permitir esse agrupamento)
export const SKILL_GROUP_DEFS: SkillGroupDef[] = [
  {
    groupKey: 'choices.skillGroup.dataAnalytics',
    items: [
      { value: 100, labelKey: 'choices.skill.dataQualityAssessment' },
      { value: 105, labelKey: 'choices.skill.statisticalAnalysis' },
      { value: 110, labelKey: 'choices.skill.dataVisualisation' },
      { value: 115, labelKey: 'choices.skill.registryDesign' },
      { value: 120, labelKey: 'choices.skill.epidemiologicalModelling' },
      { value: 125, labelKey: 'choices.skill.surveyDesign' },
    ],
  },
  {
    groupKey: 'choices.skillGroup.digitalInteroperability',
    items: [
      { value: 200, labelKey: 'choices.skill.fhirHl7' },
      { value: 205, labelKey: 'choices.skill.interoperabilityArchitecture' },
      { value: 210, labelKey: 'choices.skill.systemRequirements' },
      { value: 215, labelKey: 'choices.skill.masterPatientIndex' },
      { value: 220, labelKey: 'choices.skill.terminologyStandards' },
      { value: 225, labelKey: 'choices.skill.dataGovernance' },
    ],
  },
  {
    groupKey: 'choices.skillGroup.immunization',
    items: [
      { value: 300, labelKey: 'choices.skill.immunizationInfoSystems' },
      { value: 305, labelKey: 'choices.skill.coverageDropoutAnalysis' },
      { value: 310, labelKey: 'choices.skill.coldChainAssessment' },
      { value: 315, labelKey: 'choices.skill.vaccineLogistics' },
      { value: 320, labelKey: 'choices.skill.campaignPlanning' },
    ],
  },
  {
    groupKey: 'choices.skillGroup.programmePolicy',
    items: [
      { value: 400, labelKey: 'choices.skill.programmeEvaluation' },
      { value: 405, labelKey: 'choices.skill.normGuidelineDrafting' },
      { value: 410, labelKey: 'choices.skill.costingBudgeting' },
      { value: 415, labelKey: 'choices.skill.policyAnalysis' },
      { value: 420, labelKey: 'choices.skill.institutionalCapacity' },
    ],
  },
  {
    groupKey: 'choices.skillGroup.deliveryFacilitation',
    items: [
      { value: 500, labelKey: 'choices.skill.trainingDesign' },
      { value: 505, labelKey: 'choices.skill.workshopFacilitation' },
      { value: 510, labelKey: 'choices.skill.technicalReportWriting' },
      { value: 515, labelKey: 'choices.skill.stakeholderEngagement' },
      { value: 520, labelKey: 'choices.skill.changeManagement' },
    ],
  },
];

export const SKILL_DEFS: ChoiceDef[] = SKILL_GROUP_DEFS.flatMap((g) => g.items);

// CS-03 — Skill Depth (ORDERED)
export const SKILL_DEPTH_DEFS: ChoiceDef[] = [
  { value: 30, labelKey: 'choices.skillDepth.expert' },
  { value: 20, labelKey: 'choices.skillDepth.proficient' },
  { value: 10, labelKey: 'choices.skillDepth.familiar' },
];

// CS-04 — Language
export const LANGUAGE_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.language.english' },
  { value: 20, labelKey: 'choices.language.spanish' },
  { value: 30, labelKey: 'choices.language.portuguese' },
  { value: 40, labelKey: 'choices.language.french' },
];

// CS-05 — Proficiency (ORDERED). "Working ou superior" = stored value >= 20.
export const PROFICIENCY_DEFS: ChoiceDef[] = [
  { value: 40, labelKey: 'choices.proficiency.native' },
  { value: 30, labelKey: 'choices.proficiency.fluent' },
  { value: 20, labelKey: 'choices.proficiency.working' },
  { value: 10, labelKey: 'choices.proficiency.basic' },
];
export const WORKING_OR_ABOVE_PROFICIENCY = 20;

// CS-06 — Country (stored value = código numérico ISO 3166-1)
export const COUNTRY_GROUP_DEFS: CountryGroupDef[] = [
  {
    regionKey: 'choices.countryRegion.southAmerica',
    items: [
      { value: 32, labelKey: 'choices.country.argentina' },
      { value: 68, labelKey: 'choices.country.bolivia' },
      { value: 76, labelKey: 'choices.country.brazil' },
      { value: 152, labelKey: 'choices.country.chile' },
      { value: 170, labelKey: 'choices.country.colombia' },
      { value: 218, labelKey: 'choices.country.ecuador' },
      { value: 328, labelKey: 'choices.country.guyana' },
      { value: 600, labelKey: 'choices.country.paraguay' },
      { value: 604, labelKey: 'choices.country.peru' },
      { value: 740, labelKey: 'choices.country.suriname' },
      { value: 858, labelKey: 'choices.country.uruguay' },
      { value: 862, labelKey: 'choices.country.venezuela' },
    ],
  },
  {
    regionKey: 'choices.countryRegion.centralAmerica',
    items: [
      { value: 84, labelKey: 'choices.country.belize' },
      { value: 188, labelKey: 'choices.country.costaRica' },
      { value: 222, labelKey: 'choices.country.elSalvador' },
      { value: 320, labelKey: 'choices.country.guatemala' },
      { value: 340, labelKey: 'choices.country.honduras' },
      { value: 484, labelKey: 'choices.country.mexico' },
      { value: 558, labelKey: 'choices.country.nicaragua' },
      { value: 591, labelKey: 'choices.country.panama' },
    ],
  },
  {
    regionKey: 'choices.countryRegion.caribbean',
    items: [
      { value: 192, labelKey: 'choices.country.cuba' },
      { value: 214, labelKey: 'choices.country.dominicanRepublic' },
      { value: 332, labelKey: 'choices.country.haiti' },
      { value: 388, labelKey: 'choices.country.jamaica' },
      { value: 780, labelKey: 'choices.country.trinidadAndTobago' },
      { value: 52, labelKey: 'choices.country.barbados' },
      { value: 44, labelKey: 'choices.country.bahamas' },
    ],
  },
  {
    regionKey: 'choices.countryRegion.northAmerica',
    items: [
      { value: 124, labelKey: 'choices.country.canada' },
      { value: 840, labelKey: 'choices.country.unitedStates' },
    ],
  },
  {
    regionKey: 'choices.countryRegion.other',
    items: [{ value: 999, labelKey: 'choices.country.other' }],
  },
];

export const COUNTRY_DEFS: ChoiceDef[] = COUNTRY_GROUP_DEFS.flatMap((g) => g.items);

// CS-07 — Qualification (ORDERED)
export const QUALIFICATION_DEFS: ChoiceDef[] = [
  { value: 40, labelKey: 'choices.qualification.doctorate' },
  { value: 30, labelKey: 'choices.qualification.masters' },
  { value: 20, labelKey: 'choices.qualification.bachelors' },
  { value: 10, labelKey: 'choices.qualification.technical' },
];

// CS-08 — Sector
export const SECTOR_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.sector.ministryOfHealth' },
  { value: 20, labelKey: 'choices.sector.subnationalHealthAuthority' },
  { value: 30, labelKey: 'choices.sector.unMultilateral' },
  { value: 40, labelKey: 'choices.sector.academiaResearch' },
  { value: 50, labelKey: 'choices.sector.ngoCivilSociety' },
  { value: 60, labelKey: 'choices.sector.privateSector' },
];

// CS-09 — Assignment Role
export const ASSIGNMENT_ROLE_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.assignmentRole.teamLead' },
  { value: 20, labelKey: 'choices.assignmentRole.soleConsultant' },
  { value: 30, labelKey: 'choices.assignmentRole.technicalSpecialist' },
  { value: 40, labelKey: 'choices.assignmentRole.adviser' },
  { value: 50, labelKey: 'choices.assignmentRole.trainerFacilitator' },
];

// CS-10 — Availability Status
export const AVAILABILITY_STATUS_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.availabilityStatus.available' },
  { value: 20, labelKey: 'choices.availabilityStatus.limitedAvailability' },
  { value: 30, labelKey: 'choices.availabilityStatus.notAvailable' },
];

// CS-11 — Gender (opcional, nunca usado no matching)
export const GENDER_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.gender.woman' },
  { value: 20, labelKey: 'choices.gender.man' },
  { value: 30, labelKey: 'choices.gender.selfDescribe' },
  { value: 40, labelKey: 'choices.gender.preferNotToSay' },
];

// CS-12 — Commitment
export const COMMITMENT_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.commitment.fullTime' },
  { value: 20, labelKey: 'choices.commitment.upTo50' },
  { value: 30, labelKey: 'choices.commitment.upTo25' },
];

// CS-13 — Travel
export const TRAVEL_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.travel.domesticAndRegional' },
  { value: 20, labelKey: 'choices.travel.regionalOnly' },
  { value: 30, labelKey: 'choices.travel.domesticOnly' },
  { value: 40, labelKey: 'choices.travel.no' },
];

// CS-14 — Work Mode
export const WORK_MODE_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.workMode.onSite' },
  { value: 20, labelKey: 'choices.workMode.hybrid' },
  { value: 30, labelKey: 'choices.workMode.remoteOnly' },
];

// CS-15 — Pay Band (expectativa autodeclarada; nunca exclui)
export const PAY_BAND_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.payBand.bandA' },
  { value: 20, labelKey: 'choices.payBand.bandB' },
  { value: 30, labelKey: 'choices.payBand.bandC' },
  { value: 40, labelKey: 'choices.payBand.bandD' },
];

// CS-16 — Institutional Tie
export const INSTITUTIONAL_TIE_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.institutionalTie.federal' },
  { value: 20, labelKey: 'choices.institutionalTie.state' },
  { value: 30, labelKey: 'choices.institutionalTie.municipal' },
  { value: 40, labelKey: 'choices.institutionalTie.none' },
];
export const NO_INSTITUTIONAL_TIE_VALUE = 40;

// CS-17 — Dedication Regime
export const DEDICATION_REGIME_DEFS: ChoiceDef[] = [
  { value: 10, labelKey: 'choices.dedicationRegime.exclusive' },
  { value: 20, labelKey: 'choices.dedicationRegime.partial' },
  { value: 30, labelKey: 'choices.dedicationRegime.notApplicable' },
];

export function labelFor(options: ChoiceOption[], value: number | undefined): string {
  return options.find((o) => o.value === value)?.label ?? '';
}
