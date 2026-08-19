import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ConsultantProfileFormValues } from '../../../data/paho/schema';
import { useChoiceSets } from '../../../data/paho/useChoiceSets';
import { useTranslation } from '../../../i18n';
import { Input, Select } from '../../../components/Inputs';
import {
  Field,
  FieldGrid,
  SectionCard,
  SectionTitle,
  SectionDescription,
  ChipMultiSelect,
  AssignmentRecordsField,
} from '../../../components/FormFields';

export function ExperienceSection() {
  const { register, formState: { errors } } = useFormContext<ConsultantProfileFormValues>();
  const { t } = useTranslation();
  const { QUALIFICATIONS, SECTORS, COUNTRIES } = useChoiceSets();

  return (
    <>
      <SectionCard>
        <SectionTitle>{t('sections.experience.title')}</SectionTitle>
        <SectionDescription>{t('sections.experience.description')}</SectionDescription>

        <FieldGrid $cols={3}>
          <Field label={t('sections.experience.yearsTotal')} required error={errors.yearsTotal?.message}>
            <Input type="number" {...register('yearsTotal', { valueAsNumber: true })} />
          </Field>
          <Field label={t('sections.experience.yearsPrimaryArea')} required error={errors.yearsPrimaryArea?.message}>
            <Input type="number" {...register('yearsPrimaryArea', { valueAsNumber: true })} />
          </Field>
          <Field label={t('sections.experience.highestDegree')} required error={errors.highestDegree?.message}>
            <Select {...register('highestDegree', { valueAsNumber: true })} defaultValue="">
              <option value="" disabled>{t('common.select')}</option>
              {QUALIFICATIONS.map((q) => (
                <option key={q.value} value={q.value}>{q.label}</option>
              ))}
            </Select>
          </Field>
        </FieldGrid>

        <div style={{ marginTop: 16 }}>
          <Field label={t('sections.experience.fieldOfStudy')} error={errors.fieldOfStudy?.message}>
            <Input placeholder={t('sections.experience.fieldOfStudyPlaceholder')} {...register('fieldOfStudy')} />
          </Field>
        </div>

        <div style={{ marginTop: 16 }}>
          <Field label={t('sections.experience.sectors')}>
            <ChipMultiSelect name="sectors" options={SECTORS} />
          </Field>
        </div>

        <div style={{ marginTop: 16 }}>
          <Field label={t('sections.experience.countriesWorked')}>
            <ChipMultiSelect name="countriesWorked" options={COUNTRIES} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard>
        <SectionTitle>{t('sections.experience.assignmentsTitle')}</SectionTitle>
        <SectionDescription>{t('sections.experience.assignmentsDescription')}</SectionDescription>
        <AssignmentRecordsField name="assignments" />
        {errors.assignments?.message && (
          <p style={{ color: '#c0392b', fontSize: 12, marginTop: 8 }}>{errors.assignments.message as string}</p>
        )}
      </SectionCard>
    </>
  );
}
