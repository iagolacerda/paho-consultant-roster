import { useNavigate } from 'react-router-dom';
import { Page, Content, PageHeading } from '../../components/PageShell';
import { CURRENT_USER } from '../../data/paho/mockSession';
import { BriefcaseIcon, ProfileIcon, LogoutIcon } from '../../components/icons';
import { Button } from '../../components/Buttons';
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
  LogoutRow,
} from './styles';

export function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Page>
      <Content>
        <PageHeading icon={<ProfileIcon />} title={t('profile.title')} subtitle={t('profile.subtitle')} />

        <AccountCard type="button" onClick={() => navigate('/perfil/dados-pessoais')}>
          <AvatarLg>{CURRENT_USER.initials}</AvatarLg>
          <div>
            <AccountName>{CURRENT_USER.name}</AccountName>
            <AccountDetail>{CURRENT_USER.email}</AccountDetail>
          </div>
          <Chevron>→</Chevron>
        </AccountCard>

        <LinkCard type="button" onClick={() => navigate('/perfil-profissional')}>
          <LinkIcon><BriefcaseIcon /></LinkIcon>
          <div>
            <LinkTitle>{t('profile.professionalProfileTitle')}</LinkTitle>
            <LinkDescription>{t('profile.professionalProfileDescription')}</LinkDescription>
          </div>
          <Chevron>→</Chevron>
        </LinkCard>

        <LogoutRow>
          <Button type="button" $variant="danger" onClick={() => navigate('/login')}>
            <LogoutIcon />
            {t('navbar.logout')}
          </Button>
        </LogoutRow>
      </Content>
    </Page>
  );
}
