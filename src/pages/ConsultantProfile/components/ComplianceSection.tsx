import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ConsultantProfileFormValues } from '../validators';
import { NO_INSTITUTIONAL_TIE_VALUE } from '../../../data/paho/choiceSets';
import { useChoiceSets } from '../../../data/paho/useChoiceSets';
import { useTranslation } from '../../../i18n';
import { Input } from '../../../components/Inputs';
import { colors } from '../../../styles/tokens';
import { Field, FieldGrid, SectionCard, SectionTitle, SectionDescription } from '../../../components/FormFields';
import { RadioOptionGroup } from './RadioOptionGroup/RadioOptionGroup';
import { CheckboxField } from './CheckboxField/CheckboxField';
import { FileUploadField } from './FileUploadField/FileUploadField';

const TIE_DESCRIPTION_KEYS: Record<number, string> = {
  10: 'sections.compliance.tieFederalDescription',
  20: 'sections.compliance.tieStateDescription',
  30: 'sections.compliance.tieMunicipalDescription',
  40: 'sections.compliance.tieNoneDescription',
};

const REGIME_DESCRIPTION_KEYS: Record<number, string> = {
  10: 'sections.compliance.regimeExclusiveDescription',
  20: 'sections.compliance.regimePartialDescription',
  30: 'sections.compliance.regimeNotApplicableDescription',
};

export function ComplianceSection() {
  const { register, watch, formState: { errors } } = useFormContext<ConsultantProfileFormValues>();
  const { t } = useTranslation();
  const { INSTITUTIONAL_TIES, DEDICATION_REGIMES } = useChoiceSets();
  const institutionalTie = watch('institutionalTie');
  const tobaccoTie = watch('tobaccoTie');
  const alcoholTie = watch('alcoholTie');
  const needsAuth = institutionalTie !== undefined && institutionalTie !== NO_INSTITUTIONAL_TIE_VALUE;
  const blocked = tobaccoTie || alcoholTie;

  return (
    <SectionCard>
      <SectionTitle>{t('sections.compliance.title')}</SectionTitle>
      <SectionDescription>{t('sections.compliance.description')}</SectionDescription>

      <Field label={t('sections.compliance.institutionalTie')} required error={errors.institutionalTie?.message}>
        <RadioOptionGroup
          name="institutionalTie"
          options={INSTITUTIONAL_TIES.map((tie) => ({ value: tie.value, label: tie.label, description: t(TIE_DESCRIPTION_KEYS[tie.value]) }))}
        />
      </Field>

      <div style={{ marginTop: 12 }}>
        <Field label={t('sections.compliance.dedicationRegime')} required error={errors.dedicationRegime?.message}>
          <RadioOptionGroup
            name="dedicationRegime"
            options={DEDICATION_REGIMES.map((r) => ({ value: r.value, label: r.label, description: t(REGIME_DESCRIPTION_KEYS[r.value]) }))}
          />
        </Field>
      </div>

      {needsAuth && (
        <div style={{ marginTop: 12 }}>
          <SectionDescription style={{ color: colors.inkMuted80, fontWeight: 600 }}>
            {t('sections.compliance.employerAuthNotice')}
          </SectionDescription>
          <FieldGrid $cols={2}>
            <Field label={t('sections.compliance.employerAuth')} required error={errors.employerAuth?.message as string | undefined}>
              <FileUploadField name="employerAuth" accept=".pdf,.jpg,.png" acceptLabel={t('sections.compliance.employerAuthAcceptHint')} />
            </Field>
            <Field label={t('sections.compliance.employerAuthValidUntil')} error={errors.authValidUntil?.message}>
              <Input type="date" {...register('authValidUntil')} />
            </Field>
          </FieldGrid>
        </div>
      )}

      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Field label={t('sections.compliance.declareLabel')}>
          <CheckboxField
            name="tobaccoTie"
            label={t('sections.compliance.tobaccoTie')}
            description={t('sections.compliance.tobaccoAlcoholDescription')}
            warn
          />
          <CheckboxField
            name="alcoholTie"
            label={t('sections.compliance.alcoholTie')}
            description={t('sections.compliance.tobaccoAlcoholDescription')}
            warn
          />
          <CheckboxField
            name="familyTie"
            label={t('sections.compliance.familyTie')}
            description={t('sections.compliance.familyTieDescription')}
          />
          <CheckboxField
            name="debarment"
            label={t('sections.compliance.debarment')}
            description={t('sections.compliance.debarmentDescription')}
          />
        </Field>
      </div>

      {blocked && (
        <div style={{ marginTop: 12, background: colors.dangerSurface, color: colors.danger, borderRadius: 8, padding: '10px 13px', fontSize: 12.8 }}>
          {t('sections.compliance.blockedNotice')}
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <CheckboxField
          name="attested"
          label={t('sections.compliance.attestation')}
          description={t('sections.compliance.attestationDescription')}
        />
        {errors.attested?.message && (
          <p style={{ color: '#c0392b', fontSize: 12, marginTop: 6 }}>{errors.attested.message as string}</p>
        )}
      </div>
    </SectionCard>
  );
}
