export * from './interfaces';
// O tipo completo do formulário profissional é inferido a partir do schema
// zod em pages/ConsultantProfile/validators — assim schema e tipo nunca
// dessincronizam.
export type { ConsultantProfileFormValues, ConsultantProfileFormInput } from '../../../pages/ConsultantProfile/validators';
