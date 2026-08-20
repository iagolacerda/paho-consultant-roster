// Schema de validação da tela "Meu perfil" — identidade e contato
// (F-001–F-010). Implementa as regras da aba "3. Validation Rules" do Field
// Dictionary que se aplicam à identidade pessoal.

// Libs
import { z } from 'zod';

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

export function buildPersonalIdentitySchema(t: T) {
  return z
    .object({
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
    })
    .superRefine((val, ctx) => {
      // V-09 — nacionalidade secundária deve diferir da principal
      if (val.nationality2 !== undefined && val.nationality2 === val.nationality) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('validation.selectSecondNationalityDifferent'),
          path: ['nationality2'],
        });
      }
    });
}

export type PersonalIdentityFormValues = z.output<ReturnType<typeof buildPersonalIdentitySchema>>;
export type PersonalIdentityFormInput = z.input<ReturnType<typeof buildPersonalIdentitySchema>>;

export const EMPTY_PERSONAL_IDENTITY: Partial<PersonalIdentityFormInput> = {
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
};
