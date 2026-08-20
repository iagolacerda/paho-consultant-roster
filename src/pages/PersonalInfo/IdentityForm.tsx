import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PersonalIdentityFormValues } from '../../data/paho/schema';
import { useChoiceSets } from '../../data/paho/useChoiceSets';
import { useTranslation } from '../../i18n';
import { Input, Select } from '../../components/Inputs';
import { CountrySelect } from '../../components/CountrySelect';
import { Field, FieldGrid, SectionCard, SectionTitle, SectionDescription } from '../../components/FormFields';

export function IdentityForm() {
  const { register, formState: { errors } } = useFormContext<PersonalIdentityFormValues>();
  const { t } = useTranslation();
  const { GENDERS } = useChoiceSets();

  return (
    <SectionCard>
      <SectionTitle>{t('sections.identity.title')}</SectionTitle>
      <SectionDescription>{t('sections.identity.description')}</SectionDescription>

      <FieldGrid $cols={2}>
        <Field label={t('sections.identity.firstName')} required error={errors.firstName?.message}>
          <Input {...register('firstName')} />
        </Field>
        <Field label={t('sections.identity.lastName')} required error={errors.lastName?.message}>
          <Input {...register('lastName')} />
        </Field>
      </FieldGrid>

      <div style={{ marginTop: 12 }}>
        <Field
          label={t('sections.identity.displayName')}
          hint={t('sections.identity.displayNameHint')}
          error={errors.displayName?.message}
        >
          <Input {...register('displayName')} />
        </Field>
      </div>

      <FieldGrid $cols={2} style={{ marginTop: 12 }}>
        <Field label={t('sections.identity.email')} required error={errors.email?.message}>
          <Input type="email" {...register('email')} />
        </Field>
        <Field label={t('sections.identity.phone')} required error={errors.phone?.message} hint={t('sections.identity.phoneHint')}>
          <Input {...register('phone')} />
        </Field>
      </FieldGrid>

      <FieldGrid $cols={3} style={{ marginTop: 12 }}>
        <Field label={t('sections.identity.countryResidence')} required error={errors.countryResidence?.message}>
          <CountrySelect name="countryResidence" />
        </Field>
        <Field label={t('sections.identity.city')} required error={errors.city?.message}>
          <Input {...register('city')} />
        </Field>
        <Field label={t('sections.identity.nationality')} required error={errors.nationality?.message}>
          <CountrySelect name="nationality" />
        </Field>
      </FieldGrid>

      <FieldGrid $cols={2} style={{ marginTop: 12 }}>
        <Field label={t('sections.identity.secondNationality')} error={errors.nationality2?.message}>
          <CountrySelect name="nationality2" emptyLabel={t('common.none')} emptySelectable />
        </Field>
        <Field label={t('sections.identity.gender')} hint={t('sections.identity.genderHint')}>
          <Select {...register('gender', { valueAsNumber: true })} defaultValue="">
            <option value="">{t('common.doNotInform')}</option>
            {GENDERS.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </Select>
        </Field>
      </FieldGrid>
    </SectionCard>
  );
}
