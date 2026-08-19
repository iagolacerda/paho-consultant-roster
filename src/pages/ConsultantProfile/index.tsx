import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Page, Content, PageHeader, PageTitle, PageSubtitle } from '../../components/PageShell';
import { Button } from '../../components/Buttons';
import { useTranslation } from '../../i18n';
import { useConsultantProfileForm } from './useConsultantProfileForm';
import { ProfileStepper } from './ProfileStepper';
import { FooterBar, FooterSpacer, FooterSpacerBlock } from './styles';
import { IdentitySection } from './sections/IdentitySection';
import { ExpertiseSection } from './sections/ExpertiseSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { AvailabilitySection } from './sections/AvailabilitySection';
import { ComplianceSection } from './sections/ComplianceSection';
import { ReviewSection } from './sections/ReviewSection';

const SECTION_COMPONENTS: Record<string, React.ComponentType> = {
  identity: IdentitySection,
  expertise: ExpertiseSection,
  experience: ExperienceSection,
  availability: AvailabilitySection,
  compliance: ComplianceSection,
};

export function ConsultantProfile() {
  const { t } = useTranslation();
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
        <PageHeader>
          <PageTitle>{t('consultantProfile.title')}</PageTitle>
          <PageSubtitle>{t('consultantProfile.subtitle')}</PageSubtitle>
        </PageHeader>

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
