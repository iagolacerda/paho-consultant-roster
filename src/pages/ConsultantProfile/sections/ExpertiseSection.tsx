import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ConsultantProfileFormValues } from '../../../data/paho/schema';
import { useChoiceSets } from '../../../data/paho/useChoiceSets';
import { useTranslation } from '../../../i18n';
import { Input, Select } from '../../../components/Inputs';
import {
  Field,
  SectionCard,
  SectionTitle,
  SectionDescription,
  ChipMultiSelect,
  SkillsPicker,
  LanguagesPicker,
  CvAssistUpload,
} from '../../../components/FormFields';

export function ExpertiseSection() {
  const { register, watch, formState: { errors } } = useFormContext<ConsultantProfileFormValues>();
  const { t } = useTranslation();
  const { TECHNICAL_AREAS } = useChoiceSets();
  const primaryArea = watch('primaryArea');
  const skills = watch('skills') ?? [];

  return (
    <>
      <CvAssistUpload />
      <SectionCard>
        <SectionTitle>{t('sections.expertise.areaTitle')}</SectionTitle>
        <SectionDescription>{t('sections.expertise.areaDescription')}</SectionDescription>

        <Field label={t('sections.expertise.primaryArea')} required error={errors.primaryArea?.message}>
          <Select name="primaryArea" options={TECHNICAL_AREAS} placeholder={t('common.select')} />
        </Field>

        <div style={{ marginTop: 12 }}>
          <Field
            label={t('sections.expertise.secondaryAreas')}
            error={errors.secondaryAreas?.message as string | undefined}
          >
            <ChipMultiSelect
              name="secondaryAreas"
              options={TECHNICAL_AREAS}
              max={3}
              exclude={primaryArea !== undefined ? [primaryArea] : []}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard>
        <SectionTitle>{t('sections.expertise.skillsTitle')}</SectionTitle>
        <SectionDescription>{t('sections.expertise.skillsDescription')}</SectionDescription>

        <SkillsPicker name="skills" />
        {errors.skills?.message && (
          <p style={{ color: '#c0392b', fontSize: 12, marginTop: 8 }}>{errors.skills.message as string}</p>
        )}
        <p style={{ fontSize: 12, color: '#7a7a7a', marginTop: 8 }}>{t('sections.expertise.skillsSelected', { count: skills.length })}</p>

        <div style={{ marginTop: 12 }}>
          <Field label={t('sections.expertise.skillRequestLabel')} hint={t('sections.expertise.skillRequestHint')}>
            <Input placeholder={t('sections.expertise.skillRequestPlaceholder')} {...register('skillRequest')} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard>
        <SectionTitle>{t('sections.expertise.languagesTitle')}</SectionTitle>
        <SectionDescription>{t('sections.expertise.languagesDescription')}</SectionDescription>
        <LanguagesPicker name="languages" />
        {errors.languages?.message && (
          <p style={{ color: '#c0392b', fontSize: 12, marginTop: 8 }}>{errors.languages.message as string}</p>
        )}
      </SectionCard>
    </>
  );
}
