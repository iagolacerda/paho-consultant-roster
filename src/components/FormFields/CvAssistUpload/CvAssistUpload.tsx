import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../../Buttons';
import { useTranslation } from '../../../i18n';
import { MOCK_EXTRACTED_PROFILE, EXTRACTED_FIELD_SUMMARY_KEYS } from '../../../data/paho/mockExtraction';
import {
  AssistCard,
  AssistBadge,
  AssistTitle,
  AssistText,
  AssistActions,
  UploadLabel,
  ProgressTrack,
  ProgressFill,
  SummaryList,
  SummaryItem,
} from './styles';

type Stage = 'offer' | 'reading' | 'review' | 'done' | 'skipped';

// F-045 / FR-B-14 do dicionário de campos: preenchimento assistido a partir
// de um currículo enviado. A extração de verdade fica para uma fase futura —
// por ora simula o tempo de processamento e usa um conjunto fixo de valores
// (o mesmo perfil de exemplo do dicionário) para validar o fluxo de ponta a
// ponta: enviar, revisar, aplicar ou descartar.
export function CvAssistUpload() {
  const { setValue } = useFormContext();
  const { t } = useTranslation();
  const [stage, setStage] = useState<Stage>('offer');
  const [fileName, setFileName] = useState('');

  const handleUpload = (file: File) => {
    setFileName(file.name);
    setStage('reading');
    setTimeout(() => setStage('review'), 1200);
  };

  const handleApply = () => {
    Object.entries(MOCK_EXTRACTED_PROFILE).forEach(([key, value]) => {
      setValue(key as never, value as never, { shouldValidate: false, shouldDirty: true });
    });
    setStage('done');
  };

  if (stage === 'skipped') return null;

  if (stage === 'done') {
    return (
      <AssistCard>
        <AssistBadge>✓</AssistBadge>
        <div>
          <AssistTitle>{t('formFields.cvAssist.doneTitle')}</AssistTitle>
          <AssistText>{t('formFields.cvAssist.doneDescription', { fileName })}</AssistText>
        </div>
      </AssistCard>
    );
  }

  if (stage === 'reading') {
    return (
      <AssistCard>
        <AssistBadge>⋯</AssistBadge>
        <div>
          <AssistTitle>{t('formFields.cvAssist.processingTitle', { fileName })}</AssistTitle>
          <AssistText>{t('formFields.cvAssist.processingDescription')}</AssistText>
          <ProgressTrack><ProgressFill /></ProgressTrack>
        </div>
      </AssistCard>
    );
  }

  if (stage === 'review') {
    return (
      <AssistCard>
        <AssistBadge>?</AssistBadge>
        <div>
          <AssistTitle>{t('formFields.cvAssist.reviewTitle')}</AssistTitle>
          <AssistText>{t('formFields.cvAssist.reviewDescription')}</AssistText>
          <SummaryList>
            {EXTRACTED_FIELD_SUMMARY_KEYS.map((key) => (
              <SummaryItem key={key}>{t(key)}</SummaryItem>
            ))}
          </SummaryList>
          <AssistActions>
            <Button type="button" $variant="primary" onClick={handleApply}>{t('formFields.cvAssist.apply')}</Button>
            <Button type="button" $variant="ghost" onClick={() => setStage('offer')}>{t('formFields.cvAssist.discard')}</Button>
          </AssistActions>
        </div>
      </AssistCard>
    );
  }

  return (
    <AssistCard>
      <AssistBadge>↑</AssistBadge>
      <div>
        <AssistTitle>{t('formFields.cvAssist.importTitle')}</AssistTitle>
        <AssistText>{t('formFields.cvAssist.importDescription')}</AssistText>
        <AssistActions>
          <UploadLabel>
            <Button as="span" $variant="primary">{t('formFields.cvAssist.selectFile')}</Button>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = '';
                if (file) handleUpload(file);
              }}
            />
          </UploadLabel>
        </AssistActions>
      </div>
    </AssistCard>
  );
}
