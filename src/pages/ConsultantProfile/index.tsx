import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Page, Content, PageHeading } from '../../components/PageShell';
import { Button } from '../../components/Buttons';
import { useTranslation } from '../../i18n';
import { useConsultantProfileForm } from './hooks';
import {
  ProfileStepper,
  ExpertiseSection,
  ExperienceSection,
  AvailabilitySection,
  ComplianceSection,
  ReviewSection,
} from './components';
import { FooterBar, FooterSpacer, FooterSpacerBlock } from './styles';

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  expertise: ExpertiseSection,
  experience: ExperienceSection,
  availability: AvailabilitySection,
  compliance: ComplianceSection,
};

export function ConsultantProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    form,
    steps,
    stepIndex,
    maxReached,
    isLastStep,
    goToStep,
    next,
    back,
    submit,
    submitted,
    submitError,
  } = useConsultantProfileForm();

  const currentStep = steps[stepIndex];
  const CurrentSection = SECTION_COMPONENTS[currentStep.key];

  return (
    <Page>
      <Content>
        <PageHeading
          onBack={() => navigate(-1)}
          backLabel={t('opportunityDetail.back')}
          title={t('consultantProfile.title')}
          subtitle={t('consultantProfile.subtitle')}
        />

        <ProfileStepper steps={steps} current={stepIndex} maxReached={maxReached} onSelect={goToStep} />

        <FormProvider {...form}>
          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep.key === 'review' ? (
              <ReviewSection submitted={submitted} submitError={submitError} />
            ) : (
              CurrentSection && <CurrentSection />
            )}

            <FooterSpacerBlock />

            <FooterBar>
              {stepIndex > 0 && !submitted && (
                <Button type="button" $variant="ghost" onClick={back}>
                  {t('common.back')}
                </Button>
              )}
              <FooterSpacer />
              {!isLastStep && (
                <Button type="button" $variant="primary" onClick={next}>
                  {t('common.next')}
                </Button>
              )}
              {isLastStep && !submitted && (
                <Button type="button" $variant="primary" onClick={submit}>
                  {t('consultantProfile.submit')}
                </Button>
              )}
            </FooterBar>
          </form>
        </FormProvider>
      </Content>
    </Page>
  );
}
