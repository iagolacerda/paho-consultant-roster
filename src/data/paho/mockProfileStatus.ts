// Local
import { CompletenessResult, COMPLETENESS_THRESHOLD } from './completeness';

// Estado mockado do perfil profissional do usuário logado, para exibir na
// dashboard — até existir um serviço real de perfil persistido, refletindo
// alguém que já preencheu identidade e expertise mas não o resto.
export const MOCK_PROFILE_STATUS: CompletenessResult = {
  score: 45,
  matchable: 45 >= COMPLETENESS_THRESHOLD,
  missing: [
    'completeness.twoAssignments',
    'completeness.languageProficiency',
    'completeness.availability',
    'completeness.compliance',
  ],
};
