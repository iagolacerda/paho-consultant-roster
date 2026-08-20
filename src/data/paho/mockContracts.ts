// Contratos/atuações já firmadas — mock local, sem chamada de rede. Distinto
// de mockApplications.ts: candidatura é a etapa de seleção, contrato é o
// vínculo já assinado que resulta dela (por isso nem toda candidatura
// selecionada tem necessariamente um contrato aqui, e há contratos antigos
// sem uma candidatura mockada correspondente).

export type ContractStatus = 'active' | 'inactive';

export const CONTRACT_STATUS_STYLES: Record<ContractStatus, { bg: string; color: string }> = {
  active: { bg: '#e7f2e7', color: '#1e824c' },
  inactive: { bg: '#f0f0f0', color: '#6b6b6b' },
};

export interface Contract {
  id: string;
  reference: string;
  title: string;
  country: string;
  counterpartSector: string;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  // Quando presente, liga de volta à vaga original (ver mockOpportunities.ts).
  opportunityId?: string;
}

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'ctr-bra-2026-014',
    reference: 'CONTR-BRA-2026-014',
    title: 'Fortalecimento dos sistemas nacionais de informação em imunização',
    country: 'Brasil',
    counterpartSector: 'Ministério da Saúde',
    status: 'active',
    startDate: '2026-09-01',
    endDate: '2026-12-15',
    opportunityId: 'req-bra-2026-014',
  },
  {
    id: 'ctr-mex-2026-052',
    reference: 'CONTR-MEX-2026-052',
    title: 'Plano de preparação e resposta a emergências para surtos respiratórios',
    country: 'México',
    counterpartSector: 'Ministério da Saúde',
    status: 'active',
    startDate: '2026-12-01',
    endDate: '2027-04-30',
    opportunityId: 'req-mex-2026-052',
  },
  {
    id: 'ctr-cri-2026-005',
    reference: 'CONTR-CRI-2026-005',
    title: 'Apoio à digitalização de prontuários em unidades de atenção primária',
    country: 'Costa Rica',
    counterpartSector: 'Ministério da Saúde',
    status: 'active',
    startDate: '2026-05-01',
    endDate: '2026-10-31',
  },
  {
    id: 'ctr-ecu-2025-041',
    reference: 'CONTR-ECU-2025-041',
    title: 'Avaliação de capacidade de resposta a emergências sanitárias',
    country: 'Equador',
    counterpartSector: 'Ministério da Saúde',
    status: 'inactive',
    startDate: '2025-11-01',
    endDate: '2026-03-31',
  },
  {
    id: 'ctr-hnd-2025-028',
    reference: 'CONTR-HND-2025-028',
    title: 'Revisão de protocolos de vigilância nutricional',
    country: 'Honduras',
    counterpartSector: 'Ministério da Saúde',
    status: 'inactive',
    startDate: '2025-07-01',
    endDate: '2025-11-30',
  },
  {
    id: 'ctr-pan-2026-019',
    reference: 'CONTR-PAN-2026-019',
    title: 'Diagnóstico de capacidade laboratorial para vigilância genômica',
    country: 'Panamá',
    counterpartSector: 'Ministério da Saúde',
    status: 'inactive',
    startDate: '2026-02-01',
    endDate: '2026-06-30',
  },
];
