import React, { useEffect, useRef, useState } from 'react';
import { CURRENT_USER } from '../../data/paho/mockSession';
import { useTranslation } from '../../i18n';
import { LogoutIcon } from '../icons';
import { NavList } from '../NavList';
import { PROFILE_LINK } from '../navLinks';
import {
  Bar,
  Brand,
  BrandMark,
  BrandText,
  Spacer,
  LangSwitch,
  LangButton,
  UserArea,
  UserButton,
  Avatar,
  UserName,
  Chevron,
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from './styles';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (areaRef.current && !areaRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <Bar>
      <Brand>
        <BrandMark />
        <BrandText>{t('navbar.brand')}</BrandText>
      </Brand>
      <Spacer />
      <LangSwitch>
        <LangButton type="button" $active={language === 'pt'} onClick={() => setLanguage('pt')}>PT</LangButton>
        <LangButton type="button" $active={language === 'en'} onClick={() => setLanguage('en')}>EN</LangButton>
      </LangSwitch>
      <UserArea ref={areaRef}>
        <UserButton type="button" $open={open} onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>
          <Avatar>{CURRENT_USER.initials}</Avatar>
          <UserName>{CURRENT_USER.firstName}</UserName>
          <Chevron $open={open}>▾</Chevron>
        </UserButton>
        {open && (
          <Dropdown role="menu">
            <NavList items={[PROFILE_LINK]} onNavigate={() => setOpen(false)} />
            <DropdownDivider />
            <NavList onNavigate={() => setOpen(false)} />
            <DropdownDivider />
            <DropdownItem
              type="button"
              role="menuitem"
              $danger
              onClick={() => {
                setOpen(false);
                // Mock: sem autenticação real neste projeto ainda.
              }}
            >
              <LogoutIcon />
              {t('navbar.logout')}
            </DropdownItem>
          </Dropdown>
        )}
      </UserArea>
    </Bar>
  );
}
