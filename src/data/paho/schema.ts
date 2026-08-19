// Schema de validação do formulário de perfil do consultor.
// Implementa as 24 regras da aba "3. Validation Rules" do Field Dictionary
// que se aplicam no momento em que o consultor preenche/edita o perfil
// (as regras de expiração, unicidade de e-mail etc. dependem de dados que
// só existem no backend real e não têm equivalente aqui).

import { z } from 'zod';
import { NO_INSTITUTIONAL_TIE_VALUE } from './choiceSets';

// Letras (inclui acentuadas latinas), espaços, hífen, apóstrofo — 2 a 50 chars.
// Evita \p{L}/flag "u" porque o target do tsconfig (es5) não os suporta.
const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'\- ]{1,49}$/;
const PHONE_PATTERN = /^[0-9+\-\s]{7,20}$/;

type T = (key: string, vars?: Record<string, string | number>) => string;

// Selects nativos entregam string (ou NaN, via valueAsNumber quando vazio).
// Esses helpers normalizam para `number | undefined` antes da validação.
const requiredChoice = (message: string) =>
  z.preprocess(
    (v) => (v === '' || v === null || (typeof v === 'number' && Number.isNaN(v)) ? undefined : v),
    z.number({ error: message }),
  );

const optionalChoice = () =>
  z.preprocess(
    (v) => (v === '' || v === null || (typeof v === 'number' && Number.isNaN(v)) ? undefined : v),
    z.number().optional(),
  );

const mockFileSchema = z.object({ name: z.string(), size: z.number() });

function buildSkillEntrySchema(t: T) {
  return z.object({
    skill: requiredChoice(t('validation.selectSkill')),
    depth: requiredChoice(t('validation.selectDepth')),
    yearsUsing: z.number().int().min(0).max(60).optional(),
  });
}

function buildLanguageEntrySchema(t: T) {
  return z.object({
    language: requiredChoice(t('validation.selectLanguage')),
    proficiency: requiredChoice(t('validation.selectProficiency')),
  });
}

const currentYear = () => new Date().getFullYear();

function buildAssignmentRecordSchema(t: T) {
  return z
    .object({
      title: z.string().min(5, t('validation.minChars', { count: 5 })).max(150, t('validation.maxChars', { count: 150 })),
      client: z.string().min(2, t('validation.minChars', { count: 2 })).max(150, t('validation.maxChars', { count: 150 })),
      sector: requiredChoice(t('validation.selectSector')),
      country: requiredChoice(t('validation.selectCountry')),
      yearFrom: requiredChoice(t('validation.availableFromRequired')).refine((y) => y <= currentYear(), {
        message: t('validation.yearFromFuture'),
      }),
      yearTo: optionalChoice(),
      role: requiredChoice(t('validation.selectRole')),
      outcome: z
        .string()
        .min(30, t('validation.outcomeLength'))
        .max(500, t('validation.maxChars', { count: 500 })),
      relatedSkills: z.array(z.number()).default([]),
    })
    .superRefine((val, ctx) => {
      if (val.yearTo !== undefined && val.yearFrom !== undefined && val.yearTo < val.yearFrom) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: t('validation.yearToBeforeFrom'), path: ['yearTo'] });
      }
    });
}

const isoDate = (message: string) => z.string().min(1, message);

export function buildConsultantProfileSchema(t: T) {
  const skillEntrySchema = buildSkillEntrySchema(t);
  const languageEntrySchema = buildLanguageEntrySchema(t);
  const assignmentRecordSchema = buildAssignmentRecordSchema(t);

  return z
    .object({
      // Seção 1 — Identidade e contato
      firstName: z.string().regex(NAME_PATTERN, t('validation.namePattern')),
      lastName: z.string().regex(NAME_PATTERN, t('validation.namePattern')),
      displayName: z.string().max(100).optional().default(''),
      email: z.string().email(t('validation.invalidEmail')),
      phone: z.string().regex(PHONE_PATTERN, t('validation.phonePattern')),
      countryResidence: requiredChoice(t('validation.selectCountryResidence')),
      city: z.string().min(2, t('validation.minChars', { count: 2 })).max(100, t('validation.maxChars', { count: 100 })),
      nationality: requiredChoice(t('validation.selectNationality')),
      nationality2: optionalChoice(),
      gender: optionalChoice(),

      // Seção 2 — Expertise técnica
      primaryArea: requiredChoice(t('validation.selectPrimaryArea')),
      secondaryAreas: z.array(z.number()).max(3, t('validation.maxSecondaryAreas')).default([]),
      skills: z.array(skillEntrySchema).min(5, t('validation.minSkills')).max(15, t('validation.maxSkills')),
      skillRequest: z.string().max(100).optional().default(''),

      // Seção 3 — Idiomas
      languages: z.array(languageEntrySchema).min(1, t('validation.addAtLeastOneLanguage')),

      // Seção 4 — Experiência
      yearsTotal: requiredChoice(t('validation.yearsTotalRequired')).refine((v) => v >= 0 && v <= 60, {
        message: t('validation.yearsRange'),
      }),
      yearsPrimaryArea: requiredChoice(t('validation.yearsPrimaryAreaRequired')).refine((v) => v >= 0 && v <= 60, {
        message: t('validation.yearsRange'),
      }),
      highestDegree: requiredChoice(t('validation.selectHighestDegree')),
      fieldOfStudy: z.string().max(100).optional().default(''),
      sectors: z.array(z.number()).default([]),
      countriesWorked: z.array(z.number()).default([]),

      // Seção 5 — Registros de atuação
      assignments: z
        .array(assignmentRecordSchema)
        .min(2, t('validation.minAssignments'))
        .max(5, t('validation.maxAssignments')),

      // Seção 6 — Disponibilidade
      availabilityStatus: requiredChoice(t('validation.selectAvailabilityStatus')),
      availableFrom: isoDate(t('validation.availableFromRequired')),
      availableUntil: z.string().optional().default(''),
      maxCommitment: requiredChoice(t('validation.selectMaxCommitment')),
      willingToTravel: requiredChoice(t('validation.selectWillingToTravel')),
      workMode: requiredChoice(t('validation.selectWorkMode')),
      indicativeBand: optionalChoice(),

      // Seção 7 — Documentos
      cvFile: mockFileSchema.optional(),
      cvLink: z.string().max(500).optional().default(''),

      // Seção 8 — Compliance
      institutionalTie: requiredChoice(t('validation.selectInstitutionalTie')),
      dedicationRegime: requiredChoice(t('validation.selectDedicationRegime')),
      employerAuth: mockFileSchema.optional(),
      authValidUntil: z.string().optional().default(''),
      tobaccoTie: z.boolean().default(false),
      alcoholTie: z.boolean().default(false),
      familyTie: z.boolean().default(false),
      debarment: z.boolean().default(false),
      attested: z.boolean().refine((v) => v === true, { message: t('validation.attestationRequired') }),
    })
    .superRefine((val, ctx) => {
      // V-06 — até 3 áreas secundárias, nenhuma igual à primária
      if (val.primaryArea !== undefined && val.secondaryAreas.includes(val.primaryArea)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('validation.secondaryAreaEqualsPrimary'),
          path: ['secondaryAreas'],
        });
      }

      // V-07 — anos na área primária não pode exceder o total
      if (
        val.yearsTotal !== undefined &&
        val.yearsPrimaryArea !== undefined &&
        val.yearsPrimaryArea > val.yearsTotal
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('validation.yearsInAreaExceedsTotal'),
          path: ['yearsPrimaryArea'],
        });
      }

      // V-09 — nacionalidade secundária deve diferir da principal
      if (val.nationality2 !== undefined && val.nationality2 === val.nationality) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('validation.selectSecondNationalityDifferent'),
          path: ['nationality2'],
        });
      }

      // V-14 — disponível-até deve ser posterior a disponível-de
      if (val.availableUntil && val.availableFrom && val.availableUntil <= val.availableFrom) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('validation.availableUntilAfterFrom'),
          path: ['availableUntil'],
        });
      }

      // V-15 — disponível-de não pode passar de 24 meses à frente
      if (val.availableFrom) {
        const horizon = new Date();
        horizon.setMonth(horizon.getMonth() + 24);
        if (new Date(val.availableFrom) > horizon) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validation.availableFromTooFar'),
            path: ['availableFrom'],
          });
        }
      }

      // V-16 — autorização do empregador obrigatória quando há vínculo institucional
      if (val.institutionalTie !== undefined && val.institutionalTie !== NO_INSTITUTIONAL_TIE_VALUE && !val.employerAuth) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('validation.employerAuthRequired'),
          path: ['employerAuth'],
        });
      }

      // F-034 — skills relacionadas de um registro de atuação devem existir no perfil
      const profileSkills = new Set(val.skills.map((s) => s.skill));
      val.assignments.forEach((a, i) => {
        const invalid = a.relatedSkills.some((s) => !profileSkills.has(s));
        if (invalid) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t('validation.relatedSkillsMustExist'),
            path: ['assignments', i, 'relatedSkills'],
          });
        }
      });
    });
}

// Tipo de SAÍDA (pós-validação) — o que o service de submissão recebe.
export type ConsultantProfileFormValues = z.output<ReturnType<typeof buildConsultantProfileSchema>>;
// Tipo de ENTRADA (o que react-hook-form guarda enquanto o consultor digita,
// antes da validação rodar) — campos com preprocess aceitam `unknown`/undefined
// até serem normalizados. É o tipo usado por useForm/useFormContext.
export type ConsultantProfileFormInput = z.input<ReturnType<typeof buildConsultantProfileSchema>>;

// Tipado como Partial do tipo de ENTRADA: campos obrigatórios (ex. selects)
// começam vazios/undefined até o consultor preencher — react-hook-form aceita
// DeepPartial em defaultValues.
export const EMPTY_PROFILE: Partial<ConsultantProfileFormInput> = {
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  phone: '',
  countryResidence: undefined,
  city: '',
  nationality: undefined,
  nationality2: undefined,
  gender: undefined,

  primaryArea: undefined,
  secondaryAreas: [],
  skills: [],
  skillRequest: '',

  languages: [],

  yearsTotal: undefined,
  yearsPrimaryArea: undefined,
  highestDegree: undefined,
  fieldOfStudy: '',
  sectors: [],
  countriesWorked: [],

  assignments: [],

  availabilityStatus: 30, // "Não disponível" — default per CS-10
  availableFrom: '',
  availableUntil: '',
  maxCommitment: undefined,
  willingToTravel: undefined,
  workMode: undefined,
  indicativeBand: undefined,

  cvFile: undefined,
  cvLink: '',

  institutionalTie: undefined,
  dedicationRegime: undefined,
  employerAuth: undefined,
  authValidUntil: '',
  tobaccoTie: false,
  alcoholTie: false,
  familyTie: false,
  debarment: false,
  attested: false,
};

// Nomes de campo por seção — usado pelo stepper para validar (`trigger`)
// apenas a seção atual ao avançar, sem disparar erros das demais.
export const SECTION_FIELDS = {
  identity: ['firstName', 'lastName', 'displayName', 'email', 'phone', 'countryResidence', 'city', 'nationality', 'nationality2', 'gender'],
  expertise: ['primaryArea', 'secondaryAreas', 'skills', 'skillRequest', 'languages'],
  experience: ['yearsTotal', 'yearsPrimaryArea', 'highestDegree', 'fieldOfStudy', 'sectors', 'countriesWorked', 'assignments'],
  availability: ['availabilityStatus', 'availableFrom', 'availableUntil', 'maxCommitment', 'willingToTravel', 'workMode', 'indicativeBand', 'cvFile', 'cvLink'],
  compliance: ['institutionalTie', 'dedicationRegime', 'employerAuth', 'authValidUntil', 'tobaccoTie', 'alcoholTie', 'familyTie', 'debarment', 'attested'],
} as const;
