// React
import { useMemo } from 'react';
// Components
import { useTranslation } from '../../i18n';
// Local
import {
  ChoiceDef,
  ChoiceOption,
  SkillGroupDef,
  SkillGroup,
  CountryGroupDef,
  CountryGroup,
  TECHNICAL_AREA_DEFS,
  SKILL_GROUP_DEFS,
  SKILL_DEFS,
  SKILL_DEPTH_DEFS,
  LANGUAGE_DEFS,
  PROFICIENCY_DEFS,
  COUNTRY_GROUP_DEFS,
  COUNTRY_DEFS,
  QUALIFICATION_DEFS,
  SECTOR_DEFS,
  ASSIGNMENT_ROLE_DEFS,
  AVAILABILITY_STATUS_DEFS,
  GENDER_DEFS,
  COMMITMENT_DEFS,
  TRAVEL_DEFS,
  WORK_MODE_DEFS,
  PAY_BAND_DEFS,
  INSTITUTIONAL_TIE_DEFS,
  DEDICATION_REGIME_DEFS,
} from './choiceSets';

type TFunc = (key: string) => string;

const resolveOptions = (defs: ChoiceDef[], t: TFunc): ChoiceOption[] =>
  defs.map((d) => ({ value: d.value, label: t(d.labelKey) }));

const resolveSkillGroups = (defs: SkillGroupDef[], t: TFunc): SkillGroup[] =>
  defs.map((g) => ({ group: t(g.groupKey), items: resolveOptions(g.items, t) }));

const resolveCountryGroups = (defs: CountryGroupDef[], t: TFunc): CountryGroup[] =>
  defs.map((g) => ({ region: t(g.regionKey), items: resolveOptions(g.items, t) }));

// Traduz o vocabulário controlado (src/data/paho/choiceSets.ts) para o
// idioma atual. Reativo: muda de valor quando o idioma muda, porque cada
// componente que precisa das listas chama este hook (não importa mais os
// arrays direto de choiceSets.ts).
export function useChoiceSets() {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      TECHNICAL_AREAS: resolveOptions(TECHNICAL_AREA_DEFS, t),
      SKILL_GROUPS: resolveSkillGroups(SKILL_GROUP_DEFS, t),
      SKILLS: resolveOptions(SKILL_DEFS, t),
      SKILL_DEPTHS: resolveOptions(SKILL_DEPTH_DEFS, t),
      LANGUAGES: resolveOptions(LANGUAGE_DEFS, t),
      PROFICIENCIES: resolveOptions(PROFICIENCY_DEFS, t),
      COUNTRY_GROUPS: resolveCountryGroups(COUNTRY_GROUP_DEFS, t),
      COUNTRIES: resolveOptions(COUNTRY_DEFS, t),
      QUALIFICATIONS: resolveOptions(QUALIFICATION_DEFS, t),
      SECTORS: resolveOptions(SECTOR_DEFS, t),
      ASSIGNMENT_ROLES: resolveOptions(ASSIGNMENT_ROLE_DEFS, t),
      AVAILABILITY_STATUSES: resolveOptions(AVAILABILITY_STATUS_DEFS, t),
      GENDERS: resolveOptions(GENDER_DEFS, t),
      COMMITMENTS: resolveOptions(COMMITMENT_DEFS, t),
      TRAVEL_OPTIONS: resolveOptions(TRAVEL_DEFS, t),
      WORK_MODES: resolveOptions(WORK_MODE_DEFS, t),
      PAY_BANDS: resolveOptions(PAY_BAND_DEFS, t),
      INSTITUTIONAL_TIES: resolveOptions(INSTITUTIONAL_TIE_DEFS, t),
      DEDICATION_REGIMES: resolveOptions(DEDICATION_REGIME_DEFS, t),
    }),
    [t],
  );
}
