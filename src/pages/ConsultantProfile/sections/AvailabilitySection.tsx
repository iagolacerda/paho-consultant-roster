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
  RadioOptionGroup,
  FileUploadField,
} from '../../../components/FormFields';

const STATUS_DESCRIPTION_KEYS: Record<number, string> = {
  10: 'sections.availability.statusAvailableDescription',
  20: 'sections.availability.statusLimitedDescription',
  30: 'sections.availability.statusUnavailableDescription',
};

export function AvailabilitySection() {
  const { register, formState: { errors } } = useFormContext<ConsultantProfileFormValues>();
  const { t } = useTranslation();
  const { AVAILABILITY_STATUSES, COMMITMENTS, TRAVEL_OPTIONS, WORK_MODES, PAY_BANDS } = useChoiceSets();

  return (
    <>
      <SectionCard>
        <SectionTitle>{t('sections.availability.title')}</SectionTitle>
        <SectionDescription>{t('sections.availability.description')}</SectionDescription>

        <Field label={t('sections.availability.status')} required error={errors.availabilityStatus?.message}>
          <RadioOptionGroup
            name="availabilityStatus"
            options={AVAILABILITY_STATUSES.map((s) => ({ value: s.value, label: s.label, description: t(STATUS_DESCRIPTION_KEYS[s.value]) }))}
          />
        </Field>

        <FieldGrid $cols={2} style={{ marginTop: 12 }}>
          <Field label={t('sections.availability.availableFrom')} required error={errors.availableFrom?.message}>
            <Input type="date" {...register('availableFrom')} />
          </Field>
          <Field label={t('sections.availability.availableUntil')} hint={t('sections.availability.availableUntilHint')} error={errors.availableUntil?.message}>
            <Input type="date" {...register('availableUntil')} />
          </Field>
        </FieldGrid>

        <FieldGrid $cols={2} style={{ marginTop: 12 }}>
          <Field label={t('sections.availability.maxCommitment')} required error={errors.maxCommitment?.message}>
            <Select {...register('maxCommitment', { valueAsNumber: true })} defaultValue="">
              <option value="" disabled>{t('common.select')}</option>
              {COMMITMENTS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </Select>
          </Field>
          <Field label={t('sections.availability.willingToTravel')} required error={errors.willingToTravel?.message}>
            <Select {...register('willingToTravel', { valueAsNumber: true })} defaultValue="">
              <option value="" disabled>{t('common.select')}</option>
              {TRAVEL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
          </Field>
        </FieldGrid>

        <FieldGrid $cols={2} style={{ marginTop: 12 }}>
          <Field label={t('sections.availability.workMode')} required error={errors.workMode?.message}>
            <Select {...register('workMode', { valueAsNumber: true })} defaultValue="">
              <option value="" disabled>{t('common.select')}</option>
              {WORK_MODES.map((w) => (
                <option key={w.value} value={w.value}>{w.label}</option>
              ))}
            </Select>
          </Field>
          <Field label={t('sections.availability.indicativeBand')} hint={t('sections.availability.indicativeBandHint')}>
            <Select {...register('indicativeBand', { valueAsNumber: true })} defaultValue="">
              <option value="">{t('common.doNotInform')}</option>
              {PAY_BANDS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </Select>
          </Field>
        </FieldGrid>
      </SectionCard>

      <SectionCard>
        <SectionTitle>{t('sections.availability.documentsTitle')}</SectionTitle>
        <SectionDescription>{t('sections.availability.documentsDescription')}</SectionDescription>

        <Field label={t('sections.availability.cvFile')}>
          <FileUploadField name="cvFile" accept=".pdf,.doc,.docx" acceptLabel={t('sections.availability.cvFileAcceptHint')} />
        </Field>

        <div style={{ marginTop: 12 }}>
          <Field
            label={t('sections.availability.cvLink')}
            hint={t('sections.availability.cvLinkHint')}
            error={errors.cvLink?.message}
          >
            <Input placeholder={t('sections.availability.cvLinkPlaceholder')} {...register('cvLink')} />
          </Field>
        </div>
      </SectionCard>
    </>
  );
}
