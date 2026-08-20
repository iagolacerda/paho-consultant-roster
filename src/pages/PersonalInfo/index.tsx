import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import { Page, Content, PageHeading } from '../../components/PageShell';
import { Button } from '../../components/Buttons';
import { FeedbackModal } from '../../components/FeedbackModal';
import { useModal } from '../../hooks/useModal';
import { useTranslation } from '../../i18n';
import { useIdentityForm } from './useIdentityForm';
import { IdentityForm } from './IdentityForm';
import { SaveRow } from './styles';

export function PersonalInfo() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const form = useIdentityForm();
  const saveModal = useModal();

  const onSubmit = form.handleSubmit(async () => {
    // Mock: sem persistência real ainda — só confirma visualmente o salvamento.
    await new Promise((resolve) => setTimeout(resolve, 400));
    saveModal.open(
      <FeedbackModal type="success" title={t('profile.savedTitle')} message={t('profile.savedMessage')} onClose={saveModal.close} />,
    );
  });

  return (
    <Page>
      <Content>
        <PageHeading
          onBack={() => navigate('/perfil')}
          backLabel={t('opportunityDetail.back')}
          title={t('personalInfo.title')}
          subtitle={t('personalInfo.subtitle')}
        />

        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <IdentityForm />
            <SaveRow>
              <Button type="submit" $variant="primary">{t('common.save')}</Button>
            </SaveRow>
          </form>
        </FormProvider>
      </Content>

      {saveModal.portal}
    </Page>
  );
}
