import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ConsultantProfileFormValues } from '../../../data/paho/schema';
import { calculateCompleteness } from '../../../data/paho/completeness';
import { labelFor } from '../../../data/paho/choiceSets';
import { useChoiceSets } from '../../../data/paho/useChoiceSets';
import { useTranslation } from '../../../i18n';
import { SectionCard, SectionTitle, SectionDescription, CompletenessMeter } from '../../../components/FormFields';
import { SummaryGrid, SummaryTerm, SummaryValue } from '../styles';
import { SubmittedProfile } from '../../../services/consultantProfileService';

interface ReviewSectionProps {
  submitted?: SubmittedProfile;
  submitError?: string;
}

export function ReviewSection({ submitted, submitError }: ReviewSectionProps) {
  const { watch } = useFormContext<ConsultantProfileFormValues>();
  const { t, language } = useTranslation();
  const { TECHNICAL_AREAS, COUNTRIES, LANGUAGES, PROFICIENCIES } = useChoiceSets();
  const values = watch();
  const completeness = calculateCompleteness(values);

  if (submitted) {
    return (
      <SectionCard>
        <SectionTitle>{t('sections.review.submittedTitle')}</SectionTitle>
        <SectionDescription>{t('sections.review.submittedDescription')}</SectionDescription>
        <SummaryGrid as="dl">
          <SummaryTerm>{t('sections.review.rosterId')}</SummaryTerm>
          <SummaryValue>{submitted.rosterId}</SummaryValue>
          <SummaryTerm>{t('sections.review.status')}</SummaryTerm>
          <SummaryValue>{submitted.profileStatus}</SummaryValue>
          <SummaryTerm>{t('sections.review.submittedAt')}</SummaryTerm>
          <SummaryValue>{new Date(submitted.submittedAt).toLocaleString(language === 'pt' ? 'pt-BR' : 'en-US')}</SummaryValue>
        </SummaryGrid>
      </SectionCard>
    );
  }

  return (
    <>
      <SectionCard>
        <SectionTitle>{t('sections.review.completenessTitle')}</SectionTitle>
        <SectionDescription>{t('sections.review.completenessDescription')}</SectionDescription>
        <CompletenessMeter result={completeness} />
      </SectionCard>

      <SectionCard>
        <SectionTitle>{t('sections.review.summaryTitle')}</SectionTitle>
        <SummaryGrid as="dl">
          <SummaryTerm>{t('sections.review.name')}</SummaryTerm>
          <SummaryValue>{values.firstName} {values.lastName}</SummaryValue>
          <SummaryTerm>{t('sections.review.countryCity')}</SummaryTerm>
          <SummaryValue>{values.city}, {labelFor(COUNTRIES, values.countryResidence)}</SummaryValue>
          <SummaryTerm>{t('sections.review.primaryArea')}</SummaryTerm>
          <SummaryValue>{labelFor(TECHNICAL_AREAS, values.primaryArea) || t('sections.review.empty')}</SummaryValue>
          <SummaryTerm>{t('sections.review.skills')}</SummaryTerm>
          <SummaryValue>{t('sections.review.skillsCount', { count: values.skills?.length ?? 0 })}</SummaryValue>
          <SummaryTerm>{t('sections.review.languages')}</SummaryTerm>
          <SummaryValue>
            {(values.languages ?? [])
              .map((l) => `${labelFor(LANGUAGES, l.language)} · ${labelFor(PROFICIENCIES, l.proficiency)}`)
              .join(', ') || t('sections.review.empty')}
          </SummaryValue>
          <SummaryTerm>{t('sections.review.assignments')}</SummaryTerm>
          <SummaryValue>{values.assignments?.length ?? 0}</SummaryValue>
          <SummaryTerm>{t('sections.review.attestation')}</SummaryTerm>
          <SummaryValue>{values.attested ? t('sections.review.attestationSigned') : t('sections.review.attestationPending')}</SummaryValue>
        </SummaryGrid>
      </SectionCard>

      {submitError && (
        <SectionCard style={{ borderColor: '#c0392b' }}>
          <p style={{ color: '#c0392b', margin: 0, fontSize: 13 }}>{submitError}</p>
        </SectionCard>
      )}
    </>
  );
}
