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
];
