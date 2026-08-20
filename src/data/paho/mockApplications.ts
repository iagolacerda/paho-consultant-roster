export type ApplicationStatus = 'underReview' | 'selected' | 'notSelected';

// Chave estável (não o rótulo exibido, que é resolvido via t('applicationStatus.xxx')).
export const APPLICATION_STATUS_STYLES: Record<ApplicationStatus, { bg: string; color: string }> = {
  underReview: { bg: '#fdf3e7', color: '#8a5a06' },
  selected: { bg: '#e7f2e7', color: '#1e824c' },
  notSelected: { bg: '#fbeae8', color: '#c0392b' },
};

export interface Application {
  opportunityId: string;
  status: ApplicationStatus;
  appliedAt: string;
  response?: string;
}

// Seed inicial — histórico de candidaturas já existente, para a tela de
// "Minhas candidaturas" não começar vazia. Novas candidaturas feitas pela
// tela de detalhe (mock) entram na mesma lista, em src/services/applicationsService.ts.
// A maioria das vagas não deve ter candidatura — só algumas, pra refletir o
// uso real (a maior parte da lista de vagas fica sem badge de status).
export const SEED_APPLICATIONS: Application[] = [
  {
    opportunityId: 'req-pry-2026-008',
    status: 'notSelected',
    appliedAt: '2026-08-02T14:20:00.000Z',
    response: 'A contraparte optou por um perfil com experiência prévia na região do Chaco. Obrigado pelo interesse.',
  },
  {
    opportunityId: 'req-bra-2026-014',
    status: 'selected',
    appliedAt: '2026-07-18T09:05:00.000Z',
    response: 'Perfil selecionado. A country office entrará em contato para os próximos passos contratuais.',
  },
  {
    opportunityId: 'req-mex-2026-052',
    status: 'selected',
    appliedAt: '2026-08-05T10:00:00.000Z',
    response: 'Perfil selecionado. Aguarde o envio do termo de referência final.',
  },
];
