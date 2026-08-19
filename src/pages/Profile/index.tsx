import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Content, PageHeader, PageTitle, PageSubtitle } from '../../components/PageShell';
import { CURRENT_USER } from '../../data/paho/mockSession';
import { BriefcaseIcon } from '../../components/icons';
import { useTranslation } from '../../i18n';
import {
  AccountCard,
  AvatarLg,
  AccountName,
  AccountDetail,
  LinkCard,
  LinkIcon,
  LinkTitle,
  LinkDescription,
  Chevron,
} from './styles';

// Dados da conta (identidade de login) — separados do perfil profissional,
// que é o formulário estruturado usado pelo matching do roster.
export function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Page>
      <Content>
        <PageHeader>
          <PageTitle>{t('profile.title')}</PageTitle>
          <PageSubtitle>{t('profile.subtitle')}</PageSubtitle>
        </PageHeader>

        <AccountCard>
          <AvatarLg>{CURRENT_USER.initials}</AvatarLg>
          <div>
            <AccountName>{CURRENT_USER.name}</AccountName>
            <AccountDetail>{CURRENT_USER.email}</AccountDetail>
            <AccountDetail>{CURRENT_USER.phone}</AccountDetail>
          </div>
        </AccountCard>

        <LinkCard type="button" onClick={() => navigate('/perfil-profissional')}>
          <LinkIcon><BriefcaseIcon /></LinkIcon>
          <div>
            <LinkTitle>{t('profile.professionalProfileTitle')}</LinkTitle>
            <LinkDescription>{t('profile.professionalProfileDescription')}</LinkDescription>
          </div>
          <Chevron>→</Chevron>
        </LinkCard>
      </Content>
    </Page>
  );
}
