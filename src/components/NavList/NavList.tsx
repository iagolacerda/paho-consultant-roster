// React
import React from 'react';
// Components
import { useTranslation } from '../../i18n';
import { NAV_LINKS, NavLinkItem } from '../navLinks';
// Local
import { NavItem, NavIcon } from './styles';

interface NavListProps {
  items?: NavLinkItem[];
  onNavigate?: () => void;
}

export function NavList({ items = NAV_LINKS, onNavigate }: NavListProps) {
  const { t } = useTranslation();

  return (
    <>
      {items.map((item) => (
        <NavItem key={item.to} to={item.to} end={item.end} onClick={onNavigate}>
          <NavIcon>{item.icon}</NavIcon>
          <span>{t(item.labelKey)}</span>
        </NavItem>
      ))}
    </>
  );
}
