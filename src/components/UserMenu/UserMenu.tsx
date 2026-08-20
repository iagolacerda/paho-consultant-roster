import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../Modal';
import { LanguageSwitch } from '../LanguageSwitch';
import { NavList } from '../NavList';
import { NavItem, NavIcon } from '../NavList/styles';
import { PROFILE_LINK } from '../navLinks';
import { CURRENT_USER } from '../../data/paho/mockSession';
import { useModal } from '../../hooks/useModal';
import { useTranslation } from '../../i18n';
import { LogoutIcon, MenuIcon } from '../icons';
import { UserButton, Avatar, UserName, DropdownItem, DropdownDivider, ProfileRow } from './styles';

// Só usado no mobile (ver Navbar.tsx) — no desktop a sidebar já mostra as
// informações do usuário e os links diretamente, sem precisar de menu.
// Abre um menu em tela cheia (não um dropdown ancorado) porque é onde mora
// a navegação principal inteira quando a sidebar não cabe.
export function UserMenu() {
  const modal = useModal();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const openMenu = () => {
    modal.open(
      <Modal title={CURRENT_USER.name} onClose={modal.close} position="right">
        <ProfileRow>
          <NavItem to={PROFILE_LINK.to} onClick={modal.close} style={{ width: 'auto', flex: 1, marginBottom: 0 }}>
            <NavIcon>{PROFILE_LINK.icon}</NavIcon>
            <span>{t(PROFILE_LINK.labelKey)}</span>
          </NavItem>
          <LanguageSwitch />
        </ProfileRow>
        <DropdownDivider />
        <NavList onNavigate={modal.close} />
        <DropdownDivider />
        <DropdownItem
          type="button"
          $danger
          onClick={() => {
            modal.close();
            navigate('/login');
          }}
        >
          <LogoutIcon />
          {t('navbar.logout')}
        </DropdownItem>
      </Modal>,
    );
  };

  return (
    <>
      <UserButton type="button" onClick={openMenu} aria-haspopup="menu">
        <Avatar>{CURRENT_USER.initials}</Avatar>
        <UserName>{CURRENT_USER.firstName}</UserName>
        <MenuIcon />
      </UserButton>
      {modal.portal}
    </>
  );
}
