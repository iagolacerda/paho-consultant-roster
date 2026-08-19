import React from 'react';
import { useTranslation } from '../../i18n';
import { StepBar, StepButton, StepLabelButton, StepCircle, StepConnector, StepTitle, MobileStepLabel } from './styles';

export interface Step {
  key: string;
  label: string;
}

interface ProfileStepperProps {
  steps: readonly Step[];
  current: number;
  maxReached: number;
  onSelect: (index: number) => void;
}

export function ProfileStepper({ steps, current, maxReached, onSelect }: ProfileStepperProps) {
  const { t } = useTranslation();
  return (
    <>
      <StepBar role="tablist" aria-label={t('consultantProfile.stepsAriaLabel')} $columns={steps.length}>
        {steps.map((step, index) => {
          const done = index < maxReached;
          const now = index === current;
          const stepColumn = index * 2 + 1;
          return (
            <React.Fragment key={step.key}>
              <StepButton
                type="button"
                role="tab"
                aria-selected={now}
                onClick={() => onSelect(index)}
                style={{ gridColumn: stepColumn }}
              >
                <StepCircle $done={done} $now={now}>{done ? '✓' : index + 1}</StepCircle>
              </StepButton>
              {index < steps.length - 1 && (
                <StepConnector $done={done} style={{ gridColumn: stepColumn + 1 }} />
              )}
              <StepLabelButton type="button" onClick={() => onSelect(index)} style={{ gridColumn: stepColumn }}>
                <StepTitle $now={now}>{step.label}</StepTitle>
              </StepLabelButton>
            </React.Fragment>
          );
        })}
      </StepBar>
      {/* No mobile a etapa atual some da barra (só cabe o círculo) — aparece aqui embaixo. */}
      <MobileStepLabel>
        {t('consultantProfile.stepLabelMobile', { current: current + 1, total: steps.length, label: steps[current].label })}
      </MobileStepLabel>
    </>
  );
}
