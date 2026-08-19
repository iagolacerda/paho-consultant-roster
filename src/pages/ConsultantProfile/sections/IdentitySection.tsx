import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ConsultantProfileFormValues } from '../../../data/paho/schema';
import { useChoiceSets } from '../../../data/paho/useChoiceSets';
import { useTranslation } from '../../../i18n';
import { Input, Select } from '../../../components/Inputs';
import { Field, FieldGrid, SectionCard, SectionTitle, SectionDescription, CvAssistUpload } from '../../../components/FormFields';

export function IdentitySection() {
  const { register, formState: { errors } } = useFormContext<ConsultantProfileFormValues>();
  const { t } = useTranslation();
  const { COUNTRIES, GENDERS } = useChoiceSets();

  return (
    <>
      <CvAssistUpload />
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

        <div style={{ marginTop: 16 }}>
          <Field
            label={t('sections.identity.displayName')}
            hint={t('sections.identity.displayNameHint')}
            error={errors.displayName?.message}
          >
            <Input {...register('displayName')} />
          </Field>
        </div>

        <FieldGrid $cols={2} style={{ marginTop: 16 }}>
          <Field label={t('sections.identity.email')} required error={errors.email?.message}>
            <Input type="email" {...register('email')} />
          </Field>
          <Field label={t('sections.identity.phone')} required error={errors.phone?.message} hint={t('sections.identity.phoneHint')}>
            <Input {...register('phone')} />
          </Field>
        </FieldGrid>

        <FieldGrid $cols={3} style={{ marginTop: 16 }}>
          <Field label={t('sections.identity.countryResidence')} required error={errors.countryResidence?.message}>
            <Select {...register('countryResidence', { valueAsNumber: true })} defaultValue="">
              <option value="" disabled>{t('common.select')}</option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
          </Field>
          <Field label={t('sections.identity.city')} required error={errors.city?.message}>
            <Input {...register('city')} />
          </Field>
          <Field label={t('sections.identity.nationality')} required error={errors.nationality?.message}>
            <Select {...register('nationality', { valueAsNumber: true })} defaultValue="">
              <option value="" disabled>{t('common.select')}</option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
          </Field>
        </FieldGrid>

        <FieldGrid $cols={2} style={{ marginTop: 16 }}>
          <Field label={t('sections.identity.secondNationality')} error={errors.nationality2?.message}>
            <Select {...register('nationality2', { valueAsNumber: true })} defaultValue="">
              <option value="">{t('common.none')}</option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
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
    </>
  );
}
