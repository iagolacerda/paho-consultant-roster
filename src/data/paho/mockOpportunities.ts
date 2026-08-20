// Vagas/Termos de Referência abertos — mock local, sem chamada de rede.
// Estrutura inspirada na entidade "Terms of Reference" do modelo de dados
// (referência, área requerida, país, banda, janela de datas).

export interface Opportunity {
  id: string;
  reference: string;
  title: string;
  technicalArea: string;
  country: string;
  band: string;
  // Instituição de contraparte (ministério/órgão governamental) que solicitou a consultoria.
  counterpartSector: string;
  startDate: string;
  endDate: string;
  summary: string;
  description: string;
  requirements: string[];
}

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'req-bra-2026-014',
    reference: 'REQ-BRA-2026-014',
    title: 'Fortalecimento dos sistemas nacionais de informação em imunização',
    technicalArea: 'Sistemas de informação em saúde',
    country: 'Brasil',
    band: 'Faixa C',
    counterpartSector: 'Ministério da Saúde',
    startDate: '2026-09-01',
    endDate: '2026-12-15',
    summary: 'Apoio técnico à revisão dos registros de imunização em cinco estados.',
    description:
      'A consultoria vai apoiar a atualização dos fluxos de dados de imunização, incluindo qualidade de dados, ' +
      'interoperabilidade com sistemas estaduais e capacitação de equipes locais. Viagens a cinco estados são esperadas.',
    requirements: [
      'Mínimo de 10 anos de experiência em sistemas de informação em saúde',
      'Experiência com registros de imunização (SI-PNI ou similar)',
      'Português em nível intermediário de trabalho ou superior',
      'Disponibilidade para viagens nacionais',
    ],
  },
  {
    id: 'req-pry-2026-008',
    reference: 'REQ-PRY-2026-008',
    title: 'Avaliação de capacidade institucional em vigilância epidemiológica',
    technicalArea: 'Epidemiologia e vigilância',
    country: 'Paraguai',
    band: 'Faixa B',
    counterpartSector: 'Ministério da Saúde',
    startDate: '2026-10-01',
    endDate: '2027-01-31',
    summary: 'Diagnóstico da capacidade de resposta a surtos em nível departamental.',
    description:
      'Consultoria de curto prazo para mapear lacunas de capacidade institucional em vigilância epidemiológica ' +
      'nos departamentos priorizados, com entrega de um plano de fortalecimento.',
    requirements: [
      'Experiência prévia em avaliações de capacidade institucional',
      'Espanhol nativo ou fluente',
      'Disponibilidade a partir de outubro de 2026',
    ],
  },
  {
    id: 'req-col-2026-021',
    reference: 'REQ-COL-2026-021',
    title: 'Arquitetura de interoperabilidade para prontuário eletrônico regional',
    technicalArea: 'Saúde digital e interoperabilidade',
    country: 'Colômbia',
    band: 'Faixa D',
    counterpartSector: 'Ministério da Saúde',
    startDate: '2026-11-15',
    endDate: '2027-05-15',
    summary: 'Definição de padrões FHIR para troca de dados entre redes de atenção primária.',
    description:
      'Especificação da arquitetura de interoperabilidade entre os sistemas de prontuário eletrônico de três ' +
      'redes regionais de atenção primária, com base no padrão FHIR.',
    requirements: [
      'Experiência comprovada com FHIR / HL7',
      'Trabalho anterior em projetos de interoperabilidade em saúde',
      'Inglês ou espanhol em nível avançado',
    ],
  },
  {
    id: 'req-per-2026-033',
    reference: 'REQ-PER-2026-033',
    title: 'Avaliação de programa de saúde materno-infantil em zonas andinas',
    technicalArea: 'Saúde materna, neonatal e infantil',
    country: 'Peru',
    band: 'Faixa C',
    counterpartSector: 'Ministério da Saúde',
    startDate: '2026-10-15',
    endDate: '2027-02-28',
    summary: 'Avaliação de cobertura e qualidade do pré-natal em comunidades andinas priorizadas.',
    description:
      'Avaliação externa do programa de saúde materno-infantil em três regiões andinas, com foco em cobertura ' +
      'de pré-natal, parto institucional e desfechos neonatais, incluindo visitas de campo.',
    requirements: [
      'Experiência em avaliação de programas de saúde materno-infantil',
      'Espanhol nativo ou fluente',
      'Disponibilidade para viagens a zonas rurais de altitude',
    ],
  },
  {
    id: 'req-arg-2026-040',
    reference: 'REQ-ARG-2026-040',
    title: 'Desenho de programa de capacitação em força de trabalho digital em saúde',
    technicalArea: 'Força de trabalho em saúde',
    country: 'Argentina',
    band: 'Faixa B',
    counterpartSector: 'Ministério do Trabalho',
    startDate: '2026-09-20',
    endDate: '2026-12-20',
    summary: 'Desenho curricular de um programa nacional de capacitação em saúde digital.',
    description:
      'Elaboração do currículo e materiais de um programa de capacitação em saúde digital voltado a profissionais ' +
      'de nível municipal, incluindo módulos de interoperabilidade e proteção de dados.',
    requirements: [
      'Experiência em desenho curricular na área de saúde',
      'Conhecimento de políticas de saúde digital na região',
      'Espanhol nativo ou fluente',
    ],
  },
  {
    id: 'req-mex-2026-052',
    reference: 'REQ-MEX-2026-052',
    title: 'Plano de preparação e resposta a emergências para surtos respiratórios',
    technicalArea: 'Preparação e resposta a emergências',
    country: 'México',
    band: 'Faixa D',
    counterpartSector: 'Ministério da Saúde',
    startDate: '2026-12-01',
    endDate: '2027-04-30',
    summary: 'Atualização do plano nacional de resposta a surtos respiratórios sazonais.',
    description:
      'Revisão e atualização do plano de contingência para surtos respiratórios, incluindo protocolos de ' +
      'vigilância sindrômica, capacidade hospitalar e coordenação intersetorial.',
    requirements: [
      'Experiência em planejamento de resposta a emergências de saúde pública',
      'Conhecimento de vigilância sindrômica',
      'Espanhol nativo ou fluente',
    ],
  },
  {
    id: 'req-gtm-2026-061',
    reference: 'REQ-GTM-2026-061',
    title: 'Fortalecimento de agentes comunitários de saúde em áreas rurais',
    technicalArea: 'Serviços de saúde e atenção primária',
    country: 'Guatemala',
    band: 'Faixa B',
    counterpartSector: 'Ministério da Agricultura',
    startDate: '2027-01-10',
    endDate: '2027-06-10',
    summary: 'Revisão do modelo de atuação de agentes comunitários de saúde em municípios rurais.',
    description:
      'Diagnóstico e proposta de fortalecimento do programa de agentes comunitários de saúde, com foco em ' +
      'supervisão, incentivos e integração com a rede de atenção primária.',
    requirements: [
      'Experiência com programas de agentes comunitários de saúde',
      'Espanhol nativo ou fluente',
      'Disponibilidade para viagens a áreas rurais',
    ],
  },
  {
    id: 'req-bol-2026-070',
    reference: 'REQ-BOL-2026-070',
    title: 'Auditoria de qualidade de dados do sistema nacional de vigilância',
    technicalArea: 'Sistemas de informação em saúde',
    country: 'Bolívia',
    band: 'Faixa C',
    counterpartSector: 'Ministério da Saúde',
    startDate: '2026-11-01',
    endDate: '2027-01-31',
    summary: 'Auditoria de completude e consistência dos dados de vigilância em nível departamental.',
    description:
      'Auditoria técnica da qualidade de dados do sistema nacional de vigilância, com recomendações de ' +
      'melhoria de fluxos de captura e validação em nível departamental.',
    requirements: [
      'Experiência com auditoria ou qualidade de dados em sistemas de saúde',
      'Espanhol em nível avançado',
    ],
  },
  {
    id: 'req-chl-2026-078',
    reference: 'REQ-CHL-2026-078',
    title: 'Análise de custo-efetividade de intervenções em doenças não transmissíveis',
    technicalArea: 'Economia e financiamento da saúde',
    country: 'Chile',
    band: 'Faixa D',
    counterpartSector: 'Ministério da Fazenda',
    startDate: '2027-02-01',
    endDate: '2027-07-31',
    summary: 'Modelagem de custo-efetividade de intervenções prioritárias em doenças crônicas.',
    description:
      'Modelagem econômica comparando intervenções de prevenção e tratamento de doenças não transmissíveis, ' +
      'para subsidiar a priorização de investimentos do ministério da saúde.',
    requirements: [
      'Experiência em avaliação econômica em saúde',
      'Domínio de modelagem de custo-efetividade',
      'Espanhol ou inglês em nível avançado',
    ],
  },
];
