import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  buildPersonalIdentitySchema,
  PersonalIdentityFormValues,
  PersonalIdentityFormInput,
  EMPTY_PERSONAL_IDENTITY,
} from '../validators';
import { CURRENT_USER } from '../../../data/paho/mockSession';
import { useTranslation } from '../../../i18n';

const DEFAULT_VALUES: Partial<PersonalIdentityFormInput> = {
  ...EMPTY_PERSONAL_IDENTITY,
  firstName: CURRENT_USER.firstName,
  lastName: CURRENT_USER.lastName,
  displayName: CURRENT_USER.displayName,
  email: CURRENT_USER.email,
  phone: CURRENT_USER.phone,
  countryResidence: CURRENT_USER.countryResidence,
  city: CURRENT_USER.city,
  nationality: CURRENT_USER.nationality,
  nationality2: CURRENT_USER.nationality2,
  gender: CURRENT_USER.gender,
};

// Dados de conta/identidade — separados do perfil profissional (ver
// pages/ConsultantProfile). Pré-preenchido a partir da sessão mockada.
export function useIdentityForm() {
  const { t } = useTranslation();
  const personalIdentitySchema = useMemo(() => buildPersonalIdentitySchema(t), [t]);

  return useForm<PersonalIdentityFormInput, unknown, PersonalIdentityFormValues>({
    resolver: zodResolver(personalIdentitySchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onBlur',
  });
}
