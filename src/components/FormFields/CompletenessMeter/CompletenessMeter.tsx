import React from 'react';
import { CompletenessResult, COMPLETENESS_THRESHOLD } from '../../../data/paho/completeness';
import { useTranslation } from '../../../i18n';
import { MeterTrack, MeterFill, ScoreLabel, MissingList, MissingItem } from './styles';

interface CompletenessMeterProps {
  result: CompletenessResult;
}

export function CompletenessMeter({ result }: CompletenessMeterProps) {
  const { t } = useTranslation();

  return (
    <div>
      <ScoreLabel>
        {result.matchable
          ? t('formFields.completenessMeter.aboveThreshold', { score: result.score })
          : t('formFields.completenessMeter.belowThreshold', { score: result.score, threshold: COMPLETENESS_THRESHOLD })}
      </ScoreLabel>
      <MeterTrack>
        <MeterFill $pct={result.score} $ok={result.matchable} />
      </MeterTrack>
      {result.missing.length > 0 && (
        <MissingList>
          {result.missing.map((key) => (
            <MissingItem key={key}>{t(key)}</MissingItem>
          ))}
        </MissingList>
      )}
    </div>
  );
}
