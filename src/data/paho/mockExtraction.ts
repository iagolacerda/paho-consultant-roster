// Local
import { ConsultantProfileFormInput } from './types';

// Resultado mockado de uma extração de currículo por IA — usa os mesmos
// valores da aba "6. Sample Profile" do Field Dictionary. Quando a extração
// real existir, este objeto é substituído pela resposta do serviço.
export const MOCK_EXTRACTED_PROFILE: Partial<ConsultantProfileFormInput> = {
  primaryArea: 100,
  secondaryAreas: [110, 130],
  skills: [
    { skill: 300, depth: 30 },
    { skill: 200, depth: 20 },
    { skill: 100, depth: 30 },
    { skill: 115, depth: 20 },
    { skill: 500, depth: 20 },
  ],
  languages: [
    { language: 30, proficiency: 40 },
    { language: 10, proficiency: 30 },
    { language: 20, proficiency: 20 },
  ],
  yearsTotal: 14,
  yearsPrimaryArea: 11,
  highestDegree: 30,
  fieldOfStudy: 'Informática em saúde pública',
  sectors: [10, 20],
  countriesWorked: [76, 600],
  assignments: [
    {
      title: 'Reformulação nacional da qualidade de dados do SI-PNI',
      client: 'Ministério da Saúde',
      sector: 10,
      country: 76,
      yearFrom: 2022,
      yearTo: 2024,
      role: 10,
      outcome: 'Reformulou os fluxos de dados de imunização em seis estados, reduzindo registros duplicados em 38%.',
      relatedSkills: [300, 100],
    },
    {
      title: 'Revisão de interoperabilidade do registro de imunização',
      client: 'Secretaria de Saúde do Distrito Federal',
      sector: 20,
      country: 76,
      yearFrom: 2021,
      yearTo: 2021,
      role: 20,
      outcome: 'Especificou requisitos de interoperabilidade adotados na licitação de 2022.',
      relatedSkills: [115, 200],
    },
  ],
};

// Chaves de tradução (resolvidas em CvAssistUpload.tsx via t()), não texto exibido.
export const EXTRACTED_FIELD_SUMMARY_KEYS = [
  'formFields.cvAssist.summaryArea',
  'formFields.cvAssist.summarySkills',
  'formFields.cvAssist.summaryLanguages',
  'formFields.cvAssist.summaryExperience',
  'formFields.cvAssist.summaryAssignments',
];
